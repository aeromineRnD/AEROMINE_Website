# Aeromine — aeromine.info

Marketing site for Aeromine: drone capture, photogrammetry, and browser-based
digital twins. Athens, Greece.

## Stack

- Next.js 15 (App Router) · TypeScript · Tailwind CSS 3.4
- next-intl — bilingual routes, Greek (`/el`, default) and English (`/en`)
- React Three Fiber — the landing hero renders a real Aeromine photogrammetry
  capture as a 298k-point elevation-ramped point cloud (1.8MB quantized binary,
  non-interactive, auto-rotating)
- Framer Motion — scroll reveals

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
