import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

const paths = ["", "/sectors", "/work", "/aeroview-os", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
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
}
