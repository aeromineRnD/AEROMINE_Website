// The oaka_* filenames are historical; the site is Alsos Veikou Theater,
// NOT the Panathenaic Stadium (WEBSITE_CONTEXT.md §6). Captions come from
// messages/*.json; only filenames live here.
export const caseStudies = [
  {
    key: "veikou",
    images: ["/images/oaka_ortho.png", "/images/model_oaka_metashape.png"],
  },
  {
    key: "quarry",
    images: ["/images/twin_open_pit.png", "/images/quarry_pointcloud.png"],
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
