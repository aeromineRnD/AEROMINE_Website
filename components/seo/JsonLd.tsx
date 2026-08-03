import { COMPANY, SITE_URL } from "@/lib/site";

// Server-rendered schema.org JSON-LD. All facts come from lib/site.ts or the
// visible page copy — never invent claims here.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", ...data }),
      }}
    />
  );
}

export const organizationSchema = {
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo_gold.png`,
  foundingDate: COMPANY.foundingDate,
  email: COMPANY.email,
  telephone: COMPANY.phone,
  address: {
    "@type": "PostalAddress",
    ...COMPANY.address,
  },
  founder: COMPANY.founders.map((name) => ({ "@type": "Person", name })),
  sameAs: [COMPANY.linkedin, COMPANY.github],
  areaServed: { "@type": "Country", name: "Greece" },
  knowsAbout: [
    "drone capture",
    "photogrammetry",
    "digital twins",
    "point clouds",
    "360 virtual tours",
    "construction progress tracking",
  ],
};

export const webSiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: COMPANY.name,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["el", "en"],
};

export const softwareSchema = {
  "@type": "SoftwareApplication",
  name: "AeroVIEW OS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web browser",
  url: `${SITE_URL}/el/aeroview-os`,
  author: { "@id": `${SITE_URL}/#organization` },
  description:
    "Construction progress-tracking platform: clients log in and see stage-by-stage progress, media updates, milestones, materials, and drone captures as phases with 3D models and 360 tours, in the browser.",
  inLanguage: ["el", "en"],
};

export function servicesSchema(names: string[]) {
  return {
    "@type": "ItemList",
    itemListElement: names.map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Greece" },
      },
    })),
  };
}

export function faqSchema(qas: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: qas.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
