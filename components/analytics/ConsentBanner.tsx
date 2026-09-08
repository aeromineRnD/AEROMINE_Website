"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { CONSENT_KEY } from "./Analytics";

// Only rendered when there is a tag to consent to. With no GA id there is no
// cookie, so asking would be theatre.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Choice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function store(choice: Choice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Private modes throw on write. The choice still applies to this page
    // view; we simply cannot remember it, and the banner returns next visit.
  }
}

export function ConsentBanner() {
  // Starts hidden and is only shown from an effect. Rendering it during SSR
  // would mean serving the banner to someone who already answered, then
  // ripping it away on hydration.
  const [visible, setVisible] = useState(false);
  const t = useTranslations("consent");

  useEffect(() => {
    if (!GA_ID) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {
      // Unreadable storage is treated as "not asked yet".
    }
    if (stored !== "granted" && stored !== "denied") setVisible(true);
  }, []);

  if (!visible) return null;

  function choose(choice: Choice) {
    store(choice);
    if (choice === "granted") {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    }
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label={t("label")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline-dark bg-ink/95 backdrop-blur"
    >
      <Container className="flex flex-col gap-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-on-ink">
          {t("body")}
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded bg-aeromine-500 px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-aeromine-400"
          >
            {t("accept")}
          </button>
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded border border-hairline-dark px-5 py-2.5 text-sm font-medium text-muted-on-ink transition-colors hover:text-white"
          >
            {t("decline")}
          </button>
        </div>
      </Container>
    </div>
  );
}
