// The live 3D viewers, each its own deployment we own and can update on its own.
//
// They are embedded, NOT self-hosted here: the published models run 40-90 MB
// apiece (open_pit.gltf alone is 45 MB of geometry plus a 44 MB texture), which
// would sink this site's load budget. Every deployment below was checked to send
// no X-Frame-Options and no CSP frame-ancestors, so an iframe works.
//
// deliveredForClient mirrors lib/sectors.ts and WEBSITE_CONTEXT.md §13: a model
// built to prove the pipeline must never be presented as a client's site. The
// gallery labels each card accordingly.
export type LiveModel = {
  key: string;
  href: string;
  poster?: string;
  deliveredForClient: boolean;
};

export const liveModels: LiveModel[] = [
  {
    key: "openPit",
    href: "https://aeromine-3d-open-pit.vercel.app/",
    poster: "/images/twin_open_pit.png",
    deliveredForClient: true,
  },
  {
    key: "lato",
    href: "https://aeromine-3d-lato.vercel.app/",
    deliveredForClient: true,
  },
  {
    key: "realEstate",
    href: "https://aeromine-3d-real-estate.vercel.app/",
    deliveredForClient: true,
  },
  {
    key: "windTurbines",
    href: "https://aeromine-3d-wind-turbines.vercel.app/",
    deliveredForClient: false,
  },
  {
    key: "oliveFarm",
    href: "https://aeromine-3-d-olive-trees-farm.vercel.app/",
    deliveredForClient: false,
  },
  {
    key: "mallMap",
    href: "https://aeromine-3d-mall-map.vercel.app/",
    deliveredForClient: false,
  },
  {
    key: "openOffice",
    href: "https://aeromine-3d-open-office.vercel.app/",
    deliveredForClient: false,
  },
];

// The one case study that has a published viewer behind it.
export const featuredModel = liveModels[0];
