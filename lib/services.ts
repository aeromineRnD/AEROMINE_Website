import type { Locale } from "@/i18n/routing";

// The service layer the SEO audit asked for: until now every service was buried
// inside a sector, so nothing on the site ranked for what people actually type
// ("αποτύπωση με drone", "υπολογισμός όγκου drone", "ορθοφωτοχάρτης").
//
// Slugs are localised per locale, so the Greek URL carries Greek keywords. That
// is why these pages do NOT use the next-intl Link: its href is locale-less and
// would emit one slug for both languages. Build hrefs with servicePath().
//
// `sectors` keys must exist in lib/sectors.ts. They link the service to where it
// gets applied without making any track-record claim about the sector.
export type Service = {
  key: string;
  slug: Record<Locale, string>;
  sectors: string[];
};

export const services: Service[] = [
  {
    key: "droneMapping",
    slug: {
      en: "drone-mapping-photogrammetry",
      el: "apotyposi-drone-fotogrammetria",
    },
    sectors: ["construction", "quarries", "agriculture"],
  },
  {
    key: "modelling3d",
    slug: {
      en: "3d-modelling-digital-twins",
      el: "trisdiastati-apotyposi-digital-twins",
    },
    sectors: ["construction", "heritage", "realEstate"],
  },
  {
    key: "orthophotoDtm",
    slug: {
      en: "orthophoto-dtm-contours",
      el: "orthofotochartis-dtm-isoypseis",
    },
    sectors: ["quarries", "agriculture", "construction"],
  },
  {
    key: "volumes",
    slug: {
      en: "area-volume-calculations",
      el: "ypologismos-ogkon-emvadon",
    },
    sectors: ["quarries", "construction", "agriculture"],
  },
  {
    key: "interior360",
    slug: {
      en: "360-interior-documentation",
      el: "apotyposi-esoterikon-choron-360",
    },
    sectors: ["realEstate", "indoor", "heritage"],
  },
  {
    key: "inspection",
    slug: {
      en: "aerial-inspection-site-documentation",
      el: "enaeria-epitheorisi-tekmiriosi",
    },
    sectors: ["wind", "construction", "heritage"],
  },
];

export function servicePath(locale: Locale, service: Service) {
  return `/${locale}/services/${service.slug[locale]}`;
}

export function findService(locale: Locale, slug: string) {
  return services.find((s) => s.slug[locale] === slug);
}
