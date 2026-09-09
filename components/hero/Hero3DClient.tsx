"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

// The hero shows a still render of the point cloud, and only becomes a live
// WebGL scene when someone asks for it.
//
// The cloud is 298k points. On a machine with a GPU that is cheap, but the
// canvas renders continuously, so the page never goes idle: on software
// rendering, which is what Lighthouse and any visitor without hardware
// acceleration gets, each frame costs about a second. That measured as 30s of
// total blocking time and a desktop performance score of 66, and it is real
// battery and fan noise for those visitors, not only a number.
//
// The still is generated from the same lato-points.bin by
// scripts/render-hero-still.py, with the same ramp, camera, fog and alpha, so
// activating the live view does not change what is on screen. Nothing about
// three.js is fetched until the button is pressed: next/dynamic only loads the
// chunk when the component renders.
export function Hero3DClient() {
  const [live, setLive] = useState(false);
  const t = useTranslations("home.hero");

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-gradient-to-b from-teal/60 via-ink to-ink"
        aria-hidden
      />

      {live ? (
        <div className="pointer-events-none absolute inset-0">
          <Hero3D />
        </div>
      ) : (
        <Image
          src="/images/hero-lato-cloud.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {!live && (
        <button
          type="button"
          onClick={() => setLive(true)}
          className="absolute bottom-6 right-5 z-20 inline-flex items-center gap-2 rounded-full border border-hairline-dark bg-ink/70 px-4 py-2 text-xs font-medium text-muted-on-ink backdrop-blur transition-colors hover:text-white md:right-8"
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden>
            <path d="M1 1v10l8-5-8-5z" fill="currentColor" />
          </svg>
          {t("live")}
        </button>
      )}
    </div>
  );
}
