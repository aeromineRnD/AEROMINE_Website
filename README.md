# Aeromine — www.aeromine.gr

Marketing site for Aeromine: drone capture, photogrammetry, and browser-based
digital twins. Athens, Greece.

## Stack

- Next.js 15 (App Router) · TypeScript · Tailwind CSS 3.4
- next-intl — bilingual routes, Greek (`/el`, default) and English (`/en`)
- React Three Fiber — the landing hero is a real Aeromine photogrammetry
  capture, 298k points, elevation-ramped (1.8MB quantized binary)
- Framer Motion — scroll reveals

## The hero point cloud

The hero shows a **still** by default and loads three.js only when the visitor
presses "rotate it live". That is deliberate: the canvas renders continuously,
so the page never goes idle, and on software rendering each frame costs about a
second. Auto-running it scored 66 on desktop PageSpeed with 30s of total
blocking time, against 99 with it gated.

The still is not a screenshot. Regenerate it whenever the cloud, the camera or
the colour ramp changes:

```bash
python3 scripts/render-hero-still.py   # writes the still; needs Pillow
```

It projects `public/models/lato-points.bin` through the same camera, ramp,
smoothstep fog and 0.85 alpha as `components/hero/Hero3D.tsx`, so the still and
the live view look identical.

## Develop

```bash
npm install
npm run dev
```

## Contact form

The form posts to `/api/contact`, which sends via Resend. Set `RESEND_API_KEY`
(see `.env.example`); without it the endpoint returns 503 and the UI shows the
fallback email address.

## Content rules

All copy decisions, brand tokens, and claim boundaries are documented in
`WEBSITE_CONTEXT.md`. Read it before editing marketing copy. In particular:
sector track-record claims are encoded in `lib/sectors.ts`, and gold is never
used as text on light backgrounds.
