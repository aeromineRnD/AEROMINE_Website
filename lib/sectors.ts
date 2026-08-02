// deliveredForClient encodes WEBSITE_CONTEXT.md §13: sectors without a paying
// client must never be presented as track record. The page heading stays
// "Where we work" for all of them; the flag only drives the demo badge.
export const sectors = [
  { key: "construction", deliveredForClient: true },
  { key: "quarries", deliveredForClient: true },
  { key: "heritage", deliveredForClient: true },
  { key: "realEstate", deliveredForClient: true },
  { key: "wind", deliveredForClient: false },
  { key: "agriculture", deliveredForClient: false },
  { key: "indoor", deliveredForClient: false },
] as const;

export type SectorKey = (typeof sectors)[number]["key"];
