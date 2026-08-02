"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => <HeroBackdrop />,
});

function HeroBackdrop() {
  return (
    <div
      className="absolute inset-0 bg-gradient-to-b from-teal via-ink to-ink"
      aria-hidden
    />
  );
}

export function Hero3DClient({ activateLabel }: { activateLabel: string }) {
  const [isTouch, setIsTouch] = useState<boolean | null>(null);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Desktop (or still unknown during first client render): load the scene.
  if (isTouch === false) {
    return <Hero3D fallback={<HeroBackdrop />} />;
  }

  if (isTouch === true && activated) {
    return <Hero3D fallback={<HeroBackdrop />} />;
  }

  return (
    <div className="absolute inset-0">
      <HeroBackdrop />
      {isTouch === true && (
        <button
          type="button"
          onClick={() => setActivated(true)}
          className="absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-aeromine-500 px-6 py-3 text-sm font-medium text-aeromine-500 transition-colors hover:bg-aeromine-500 hover:text-ink"
        >
          {activateLabel}
        </button>
      )}
    </div>
  );
}
