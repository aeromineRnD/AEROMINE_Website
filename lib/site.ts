// Single source of truth for the canonical origin and company facts.
// Consumed by metadata, sitemap, robots, llms.txt and JSON-LD — change here only.
export const SITE_URL = "https://aeromine.info";

export const COMPANY = {
  name: "Aeromine",
  legalName: "Aeromine IKE",
  foundingDate: "2023",
  email: "jbrintakis@aeromine.org",
  phone: "+30 698 137 5791",
  address: {
    streetAddress: "Polytexneiou 6",
    addressLocality: "Athens",
    postalCode: "10433",
    addressCountry: "GR",
  },
  founders: ["Ioannis Brintakis", "Vasilis Kokotakis", "Nikos Karatosidis"],
  linkedin: "https://www.linkedin.com/company/aeromine-info",
  github: "https://github.com/aeromineRnD",
} as const;
