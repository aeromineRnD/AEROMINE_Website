import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, webSiteSchema } from "@/components/seo/JsonLd";
import { Hero } from "@/components/hero/Hero";

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
  SectorsTeaser,
  WorkTeaser,
  AeroviewTeaser,
  FastSection,
  HowSection,
  CtaSection,
} from "@/components/home/sections";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
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
      <SectorsTeaser />
      <WorkTeaser />
      <AeroviewTeaser />
      <FastSection />
      <HowSection />
      <CtaSection />
    </main>
  );
}
