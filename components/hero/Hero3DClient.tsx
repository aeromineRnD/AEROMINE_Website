"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

// The point cloud is 1.8 MB of geometry on top of the three.js runtime, and it
// is scenery: the hero reads exactly the same without it, over the gradient
// alone. So nobody pays for it who did not ask.
//
// Skipped outright on reduced motion, on Save-Data, and on narrow screens,
// where it is mostly phones on mobile data and the cloud is barely legible
// anyway. Otherwise it waits for the browser to go idle, so it never competes
// with the hero headline for the first paint. `dynamic` only fetches the chunk
// when the component actually renders, so a skip costs zero bytes.
function useScenery() {
  const [wanted, setWanted] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (reduced || saveData || window.innerWidth < 768) return;

    const idle = window.requestIdleCallback;
    if (idle) {
      const id = idle(() => setWanted(true), { timeout: 3000 });
      return () => window.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setWanted(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  return wanted;
}

// pointer-events-none: the hero is scenery, never a scroll trap. The page
// must scroll normally with the cursor anywhere over it.
export function Hero3DClient() {
  const scenery = useScenery();

  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 bg-gradient-to-b from-teal/60 via-ink to-ink"
        aria-hidden
      />
      {scenery && <Hero3D />}
    </div>
  );
}
