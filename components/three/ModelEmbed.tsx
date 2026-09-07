"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";

// Click-to-load only. The viewers behind these URLs carry 40-90 MB of geometry
// and texture, so nothing is fetched until the visitor asks for it. The frame
// keeps a fixed aspect ratio in both states, so loading causes no layout shift.
export function ModelEmbed({
  href,
  title,
  poster,
  className,
}: {
  href: string;
  title: string;
  poster?: string;
  className?: string;
}) {
  const t = useTranslations("models");
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={clsx(
        "relative aspect-[16/10] overflow-hidden rounded-lg border border-hairline-dark bg-ink",
        className
      )}
    >
      {loaded ? (
        <iframe
          src={href}
          title={title}
          loading="lazy"
          allow="fullscreen; xr-spatial-tracking"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
        >
          {poster && (
            <Image
              src={poster}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-40 transition-opacity duration-300 group-hover:opacity-55"
            />
          )}
          <span className="relative z-10 inline-flex items-center gap-2.5 rounded bg-aeromine-500 px-5 py-3 font-bold text-ink transition-colors group-hover:bg-aeromine-400">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
              <path d="M2 1.5v13l11-6.5L2 1.5z" fill="currentColor" />
            </svg>
            {t("load")}
          </span>
          <span className="relative z-10 text-sm text-muted-on-ink">
            {t("hint")}
          </span>
        </button>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title}: ${t("openNewTab")}`}
        title={t("openNewTab")}
        className="absolute right-3 top-3 z-20 rounded bg-ink/70 px-2.5 py-1.5 text-sm text-muted-on-ink backdrop-blur transition-colors hover:text-white"
      >
        <span aria-hidden>↗</span>
      </a>
    </div>
  );
}
