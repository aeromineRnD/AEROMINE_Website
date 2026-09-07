// The oaka_* filenames are historical; the site is Alsos Veikou Theater,
// NOT the Panathenaic Stadium (WEBSITE_CONTEXT.md §6). Captions come from
// messages/*.json; only filenames live here.
//
// `demo` is the published browser twin for that project, where one exists. Only
// the quarry has one today; the other three are shown as imagery until their
// viewers are published. See lib/models.ts for the full set.
export const caseStudies = [
  {
    key: "veikou",
    images: ["/images/oaka_ortho.png", "/images/model_oaka_metashape.png"],
  },
  {
    key: "quarry",
    images: ["/images/twin_open_pit.png", "/images/quarry_pointcloud.png"],
    demo: "https://aeromine-3d-open-pit.vercel.app/",
  },
  {
    key: "monastery",
    images: ["/images/monastery_elevation.png", "/images/monastery_views.png"],
  },
  {
    key: "parcel",
    images: ["/images/parcel_survey.png"],
  },
] as const;

export type CaseStudyKey = (typeof caseStudies)[number]["key"];
