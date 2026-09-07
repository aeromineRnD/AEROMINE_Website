import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, webSiteSchema } from "@/components/seo/JsonLd";
import { Hero } from "@/components/hero/Hero";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "", "home");
}
import {
  ProblemSection,
  EngineSection,
  DifferentiatorSection,
  ServicesTeaser,
  SectorsTeaser,
  WorkTeaser,
  FeaturedModelSection,
  AeroviewTeaser,
  FastSection,
  HowSection,
  CtaSection,
} from "@/components/home/sections";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd data={webSiteSchema} />
      <Hero />
      <ProblemSection />
      <EngineSection />
      <DifferentiatorSection />
      <ServicesTeaser locale={locale} />
      <SectorsTeaser />
      <WorkTeaser />
      <FeaturedModelSection />
      <AeroviewTeaser />
      <FastSection />
      <HowSection />
      <CtaSection />
    </main>
  );
}
