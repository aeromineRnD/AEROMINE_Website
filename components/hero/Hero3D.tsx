"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Quantized point cloud extracted from the Lato photogrammetry capture
// (see WEBSITE_CONTEXT for provenance). Int16 xyz triplets, dequantized
// against the bounds below. Elevation axis in the file is Z.
const POINTS_URL = "/models/lato-points.bin";
const BOUNDS_MIN = [-343.9, -241.38, -82.79] as const;
const BOUNDS_MAX = [337.0, 300.59, 35.31] as const;

// Elevation ramp: teal lows through brand gold to pale gold peaks.
const RAMP = [
  [0.0, 0x233f48],
  [0.45, 0x8c640c],
  [0.75, 0xe8b84b],
  [1.0, 0xfdf6c0],
] as const;

function rampColor(t: number, out: THREE.Color) {
  for (let i = 1; i < RAMP.length; i++) {
    if (t <= RAMP[i][0]) {
      const [t0, c0] = RAMP[i - 1];
      const [t1, c1] = RAMP[i];
      out.setHex(c0).lerp(new THREE.Color(c1), (t - t0) / (t1 - t0));
      return;
    }
  }
  out.setHex(RAMP[RAMP.length - 1][1]);
}

function buildGeometry(buffer: ArrayBuffer) {
  const q = new Int16Array(buffer);
  const n = q.length / 3;
  const positions = new Float32Array(q.length);
  const colors = new Float32Array(q.length);
  const color = new THREE.Color();
  const range = [0, 1, 2].map((a) => BOUNDS_MAX[a] - BOUNDS_MIN[a]);

  for (let i = 0; i < n; i++) {
    const o = i * 3;
    const tx = (q[o] + 32768) / 65535;
    const ty = (q[o + 1] + 32768) / 65535;
    const tz = (q[o + 2] + 32768) / 65535;
    // Center XY around origin; keep Z (elevation) offset from its minimum.
    positions[o] = (tx - 0.5) * range[0];
    positions[o + 1] = (ty - 0.5) * range[1];
    positions[o + 2] = tz * range[2];
    rampColor(tz, color);
    colors[o] = color.r;
    colors[o + 1] = color.g;
    colors[o + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function PointCloud({ geometry }: { geometry: THREE.BufferGeometry }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={group}>
      {/* File is Z-up; rotate into Y-up. */}
      <points geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
        <pointsMaterial
          vertexColors
          size={1.6}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function Hero3D() {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(POINTS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.arrayBuffer();
      })
      .then((buffer) => {
        if (!cancelled) setGeometry(buildGeometry(buffer));
      })
      .catch(() => {
        // Loading failure leaves the gradient backdrop; nothing to do.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!geometry) return null;

  return (
    <Canvas
      camera={{ position: [0, 330, 640], fov: 45 }}
      dpr={[1, 1.8]}
      className="!absolute inset-0"
    >
      <fog attach="fog" args={["#1C2120", 500, 1400]} />
      <PointCloud geometry={geometry} />
    </Canvas>
  );
}
