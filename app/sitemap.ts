import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { serviceRoutes } from "@/lib/metadata";

const paths = [
  "",
  "/services",
  "/sectors",
  "/work",
  "/aeroview-os",
  "/faq",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const shared = routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
          ),
          "x-default": `${SITE_URL}/${routing.defaultLocale}${path}`,
        },
      },
    }))
  );

  // Service slugs are localised, so each locale gets its own URL and the
  // alternates map to the other locale's slug rather than a prefix swap.
  const serviceEntries = routing.locales.flatMap((locale) =>
    serviceRoutes.map(({ paths: localised }) => ({
      url: `${SITE_URL}${localised[locale]}`,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}${localised[l]}`])
          ),
          "x-default": `${SITE_URL}${localised[routing.defaultLocale]}`,
        },
      },
    }))
  );

  return [...shared, ...serviceEntries];
}
