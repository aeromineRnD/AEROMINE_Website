// deliveredForClient encodes WEBSITE_CONTEXT.md §13: sectors without a paying
// client must never be presented as track record. The page heading stays
// "Where we work" for all of them.
// Demo labels are product names and stay English in both locales.
export type SectorDemo = { label: string; href: string; external?: boolean };

export const sectors: {
  key: string;
  deliveredForClient: boolean;
  demos: SectorDemo[];
}[] = [
  {
    key: "construction",
    deliveredForClient: true,
    demos: [{ label: "AeroVIEW OS", href: "/aeroview-os" }],
  },
  {
    key: "quarries",
    deliveredForClient: true,
    demos: [
      {
        label: "Lato quarry",
        href: "https://aeromine-3d-lato.vercel.app/",
        external: true,
      },
      {
        label: "Open pit",
        href: "https://aeromine-3d-open-pit.vercel.app/",
        external: true,
      },
    ],
  },
  { key: "heritage", deliveredForClient: true, demos: [] },
  {
    key: "realEstate",
    deliveredForClient: true,
    demos: [
      {
        label: "Real estate viewer",
        href: "https://aeromine-3d-real-estate.vercel.app/",
        external: true,
      },
    ],
  },
  {
    key: "wind",
    deliveredForClient: false,
    demos: [
      {
        label: "Wind turbines",
        href: "https://aeromine-3d-wind-turbines.vercel.app/",
        external: true,
      },
    ],
  },
  {
    key: "agriculture",
    deliveredForClient: false,
    demos: [
      {
        label: "Olive farm",
        href: "https://aeromine-3-d-olive-trees-farm.vercel.app/",
        external: true,
      },
    ],
  },
  {
    key: "indoor",
    deliveredForClient: false,
    demos: [
      {
        label: "Mall map",
        href: "https://aeromine-3d-mall-map.vercel.app/",
        external: true,
      },
      {
        label: "Open office",
        href: "https://aeromine-3d-open-office.vercel.app/",
        external: true,
      },
    ],
  },
];

export type SectorKey = (typeof sectors)[number]["key"];
