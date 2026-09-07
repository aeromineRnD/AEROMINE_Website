// Single source of truth for the canonical origin and company facts.
// Consumed by metadata, sitemap, robots, llms.txt and JSON-LD — change here only.
//
// www, not the apex: aeromine.gr 308-redirects to www.aeromine.gr, so www is
// the address that actually serves. No trailing slash, consumers concatenate
// paths onto this directly.
//
// NOT aeromine.info. That domain is the old Wix site on separate hosting and is
// being taken down; pointing canonicals at it would tell every crawler to index
// a page that is about to die.
export const SITE_URL = "https://www.aeromine.gr";

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
