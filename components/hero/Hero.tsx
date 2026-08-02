import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Hero3DClient } from "./Hero3DClient";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex h-svh min-h-[560px] flex-col justify-end overflow-hidden bg-ink text-white">
      <Hero3DClient />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/70 to-transparent"
        aria-hidden
      />

      <Container className="relative z-10 pb-20 pt-32 md:pb-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-aeromine-500">
          {t("meta")}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          {t("headline")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-on-ink">{t("sub")}</p>
        <p className="mt-10 text-xs text-muted-on-ink/70">{t("caption")}</p>
      </Container>

      <div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-muted-on-ink/60"
        aria-hidden
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
