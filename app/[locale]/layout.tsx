import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "greek"],
  weight: ["400", "500", "700"],
  variable: "--font-manrope",
});

const SITE_URL = "https://aeromine.info";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEl = locale === "el";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: isEl
        ? "Aeromine · Digital twins από πραγματικούς χώρους"
        : "Aeromine · Measurable digital twins of real places",
      template: "%s · Aeromine",
    },
    description: isEl
      ? "Λήψη με drone, photogrammetry και digital twins στον browser. Αθήνα."
      : "Drone capture, photogrammetry and browser-based digital twins. Athens, Greece.",
    alternates: {
      canonical: `/${locale}`,
      languages: { el: "/el", en: "/en", "x-default": "/el" },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${manrope.variable} font-sans`}>
        <NextIntlClientProvider>
          <MotionProvider>
            <Header />
            {children}
            <Footer />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
