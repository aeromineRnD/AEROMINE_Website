"""Offline render of the hero point cloud, matching components/hero/Hero3D.tsx.

Same dequantisation, same elevation ramp, same camera, same linear fog, same
0.85 alpha. Output is transparent RGBA so it composites over the existing
gradient exactly as the live canvas did.
"""
import array, math, struct
from PIL import Image

BIN = "public/models/lato-points.bin"
BOUNDS_MIN = (-343.9, -241.38, -82.79)
BOUNDS_MAX = (337.0, 300.59, 35.31)
RAMP = ((0.0, 0x233F48), (0.45, 0x8C640C), (0.75, 0xE8B84B), (1.0, 0xFDF6C0))
FOG_HEX, FOG_NEAR, FOG_FAR = 0x1C2120, 500.0, 1400.0
EYE = (0.0, 330.0, 640.0)
FOV, OPACITY, POINT_SIZE = 45.0, 0.85, 1.6
W, H = 1600, 900

def s2l(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def l2s(c):
    c = max(0.0, min(1.0, c))
    return c * 12.92 if c <= 0.0031308 else 1.055 * (c ** (1 / 2.4)) - 0.055

def lin(hexv):
    return tuple(s2l(((hexv >> s) & 255) / 255.0) for s in (16, 8, 0))

RAMP_L = [(t, lin(h)) for t, h in RAMP]
FOG_L = lin(FOG_HEX)

def ramp(t):
    for i in range(1, len(RAMP_L)):
        t1, c1 = RAMP_L[i]
        if t <= t1:
            t0, c0 = RAMP_L[i - 1]
            k = (t - t0) / (t1 - t0) if t1 > t0 else 0.0
            return tuple(c0[j] + (c1[j] - c0[j]) * k for j in range(3))
    return RAMP_L[-1][1]

# Precompute the ramp so it is a lookup, not per-point maths.
LUT_N = 2048
LUT = [ramp(i / (LUT_N - 1)) for i in range(LUT_N)]

raw = open(BIN, "rb").read()
n = len(raw) // 6
q = array.array("h")
q.frombytes(raw)
rng = [BOUNDS_MAX[a] - BOUNDS_MIN[a] for a in range(3)]

# Camera basis: look at the origin, Y up, matching the r3f default target.
fx, fy, fz = (-EYE[0], -EYE[1], -EYE[2])
fl = math.sqrt(fx * fx + fy * fy + fz * fz)
fx, fy, fz = fx / fl, fy / fl, fz / fl
rx, ry, rz = fy * 0 - fz * 1, fz * 0 - fx * 0, fx * 1 - fy * 0
rl = math.sqrt(rx * rx + ry * ry + rz * rz)
rx, ry, rz = rx / rl, ry / rl, rz / rl
ux, uy, uz = ry * fz - rz * fy, rz * fx - rx * fz, rx * fy - ry * fx

tan_half = math.tan(math.radians(FOV) / 2)
aspect = W / H
half_h = H / 2

buf = array.array("f", bytes(4 * W * H * 4))

for i in range(n):
    o = i * 3
    tx = (q[o] + 32768) / 65535.0
    ty = (q[o + 1] + 32768) / 65535.0
    tz = (q[o + 2] + 32768) / 65535.0
    # Centre XY, keep Z as elevation, then rotate Z-up into Y-up: (x,y,z)->(x,z,-y)
    px = (tx - 0.5) * rng[0]
    py = tz * rng[2]
    pz = -((ty - 0.5) * rng[1])

    dx, dy, dz = px - EYE[0], py - EYE[1], pz - EYE[2]
    zc = dx * fx + dy * fy + dz * fz
    if zc <= 1.0:
        continue
    xc = dx * rx + dy * ry + dz * rz
    yc = dx * ux + dy * uy + dz * uz

    sx = (xc / (zc * tan_half * aspect) * 0.5 + 0.5) * W
    sy = (1.0 - (yc / (zc * tan_half) * 0.5 + 0.5)) * H
    if sx < 0 or sy < 0 or sx >= W - 1 or sy >= H - 1:
        continue

    cr, cg, cb = LUT[int(tz * (LUT_N - 1))]

    # three.js linear fog uses smoothstep between near and far.
    t = (zc - FOG_NEAR) / (FOG_FAR - FOG_NEAR)
    t = 0.0 if t < 0 else (1.0 if t > 1 else t)
    f = t * t * (3 - 2 * t)
    cr = cr + (FOG_L[0] - cr) * f
    cg = cg + (FOG_L[1] - cg) * f
    cb = cb + (FOG_L[2] - cb) * f

    # The framebuffer is sRGB-encoded, so blend after encoding.
    er, eg, eb = l2s(cr), l2s(cg), l2s(cb)

    # sizeAttenuation: gl_PointSize = size * (canvasHeight/2) / distance.
    ps = POINT_SIZE * half_h / zc
    cov = 1.0 if ps >= 1.0 else ps * ps

    ix, iy = int(sx), int(sy)
    wx, wy = sx - ix, sy - iy
    for ox, oy, wt in ((0, 0, (1 - wx) * (1 - wy)), (1, 0, wx * (1 - wy)),
                       (0, 1, (1 - wx) * wy), (1, 1, wx * wy)):
        a = OPACITY * wt * cov
        if a <= 0.001:
            continue
        k = ((iy + oy) * W + (ix + ox)) * 4
        inv = 1.0 - a
        buf[k] = er * a + buf[k] * inv
        buf[k + 1] = eg * a + buf[k + 1] * inv
        buf[k + 2] = eb * a + buf[k + 2] * inv
        buf[k + 3] = a + buf[k + 3] * inv

out = bytearray(W * H * 4)
for p in range(W * H):
    k = p * 4
    al = buf[k + 3]
    if al <= 0.0015:
        continue
    # Un-premultiply, since we blended straight onto a transparent buffer.
    out[k] = min(255, int(buf[k] / al * 255 + 0.5))
    out[k + 1] = min(255, int(buf[k + 1] / al * 255 + 0.5))
    out[k + 2] = min(255, int(buf[k + 2] / al * 255 + 0.5))
    out[k + 3] = min(255, int(al * 255 + 0.5))

img = Image.frombytes("RGBA", (W, H), bytes(out))
img.save("/tmp/claude-1000/-home-vasilis-Aeromine-Github-LINKEDIN-STRATEGY-Website/95d38596-0145-4ec2-972e-ef03d602acc0/scratchpad/hero.png")
print("rendered", n, "points ->", img.size)
