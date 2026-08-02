import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Hero } from "@/components/hero/Hero";
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
