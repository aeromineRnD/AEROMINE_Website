import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { services, servicePath, type Service } from "@/lib/services";

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

// Service pages need their own builder: the slug differs per locale, so the
// hreflang alternates cannot be derived by swapping a prefix on one path.
export async function serviceMetadata(
  locale: Locale,
  service: Service
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });
  const title = t(`items.${service.key}.metaTitle`);
  const description = t(`items.${service.key}.metaDescription`);
  const path = servicePath(locale, service);
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, servicePath(l, service)])
        ),
        "x-default": servicePath(routing.defaultLocale, service),
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Aeromine",
      locale: locale === "el" ? "el_GR" : "en_US",
      type: "website",
      images: ["/opengraph-image.png"],
    },
  };
}

// Every service path in every locale, for the sitemap.
export const serviceRoutes = services.map((service) => ({
  service,
  paths: Object.fromEntries(
    routing.locales.map((l) => [l, servicePath(l, service)])
  ) as Record<Locale, string>,
}));
