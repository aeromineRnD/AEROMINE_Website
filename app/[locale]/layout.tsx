import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { JsonLd, organizationSchema } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Analytics } from "@/components/analytics/Analytics";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "greek"],
  weight: ["400", "500", "700"],
  variable: "--font-manrope",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEl = locale === "el";
  const defaultTitle = isEl
    ? "Aeromine · Digital twins από πραγματικούς χώρους"
    : "Aeromine · Measurable digital twins of real places";
  const description = isEl
    ? "Αποτύπωση με drone, φωτογραμμετρία και digital twins στον browser. Αθήνα."
    : "Drone capture, photogrammetry and browser-based digital twins. Athens, Greece.";
  // No `alternates` here: a layout-level canonical is inherited by every
  // route and would point all subpages at the homepage. Each page sets its
  // own via lib/metadata.ts pageMetadata().
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: defaultTitle, template: "%s · Aeromine" },
    description,
    openGraph: {
      title: defaultTitle,
      description,
      siteName: "Aeromine",
      locale: isEl ? "el_GR" : "en_US",
      type: "website",
      images: ["/opengraph-image.png"],
    },
    twitter: { card: "summary_large_image" },
    // Search Console verification, when the property is claimed by meta tag
    // rather than by DNS. Absent env var emits no tag at all.
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
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
        <JsonLd data={organizationSchema} />
        <Analytics />
        <NextIntlClientProvider>
          <MotionProvider>
            <Header />
            {children}
            <Footer />
            <ConsentBanner />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
