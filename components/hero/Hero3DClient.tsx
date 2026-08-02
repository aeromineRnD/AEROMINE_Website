"use client";

import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

// pointer-events-none: the hero is scenery, never a scroll trap. The page
// must scroll normally with the cursor anywhere over it.
export function Hero3DClient() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 bg-gradient-to-b from-teal/60 via-ink to-ink"
        aria-hidden
      />
      <Hero3D />
    </div>
  );
}
