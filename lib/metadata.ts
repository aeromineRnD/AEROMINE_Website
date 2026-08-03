import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

// Per-page metadata: localized title/description from the "metadata" messages
// namespace, plus correct per-path canonical and hreflang alternates.
// `path` is the locale-less route ("" for home, "/sectors", ...).
export async function pageMetadata(
  locale: string,
  path: string,
  key: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t(`${key}.title`);
  const description = t(`${key}.description`);
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
        "x-default": `/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}${path}`,
      siteName: "Aeromine",
      locale: locale === "el" ? "el_GR" : "en_US",
      type: "website",
      images: ["/opengraph-image.png"],
    },
  };
}
