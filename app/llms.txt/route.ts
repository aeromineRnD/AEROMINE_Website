import { COMPANY, SITE_URL } from "@/lib/site";
import { services, servicePath } from "@/lib/services";
import el from "@/messages/el.json";

// Greek is the primary language here, so the service list quotes the Greek
// names and the Greek URLs. Names come from the messages file rather than
// being retyped, so this cannot drift from what the pages actually say.
const serviceLines = services
  .map((s) => {
    const item = el.services.items[s.key as keyof typeof el.services.items];
    return `- [${item.name}](${SITE_URL}${servicePath("el", s)})`;
  })
  .join("\n");

// llms.txt: a plain-markdown site summary for LLM crawlers and AI search
// engines (llmstxt.org convention). Facts only; keep consistent with the
// honesty rules in WEBSITE_CONTEXT.md — named client work vs in-house demos.
const body = `# Aeromine

> Aeromine is a drone capture and digital twin company in Athens, Greece
> (founded ${COMPANY.foundingDate}). We fly drone and 360° captures of real
> places, process them with photogrammetry, and deliver measurable digital
> twins that open in any web browser, no specialist software required.
> Based in Athens, working all over Greece, with projects in the EU and
> beyond welcome.

Primary language: Greek. [Greek site](${SITE_URL}/el) · [English site](${SITE_URL}/en).

## What we do

One pipeline, three steps, for every kind of site:

1. Capture: RTK drone flights for exteriors and terrain, 360° camera for
   interiors. Planned overlap and ground control points make results measurable.
2. Model: photogrammetric processing to point cloud and textured mesh; digital
   terrain models, contours, areas and volumes; exports to Revit, Civil 3D,
   AutoCAD, .dwg.
3. Twin: the model opens in the browser with information layered on top
   (keypoints, notes, measurements). Repeat flights add a timeline instead of
   replacing the model.

Everything is in-house: the flights, the photogrammetry processing, and the
3D viewers themselves (built with React and Three.js).

## Services

${serviceLines}

All services: [Services](${SITE_URL}/el/services)

## Sectors

Construction and residential, quarries and extraction, heritage and
archaeology, real estate, wind and energy assets, agriculture and land,
large indoor spaces. Details: [Sectors](${SITE_URL}/el/sectors)

## Delivered work (case studies)

- Alsos Veikou Theater, Athens: full photogrammetric capture; orthophoto,
  textured mesh, point cloud.
- Open-pit quarry: browser twin with keypoints; stockpile volumes and terrain
  modelling. A 12.1 m span measured on the model was verified against a
  physical scale bar.
- Monastery complex: point-cloud elevations delivered as .dwg into the
  restoration team's existing CAD workflow.
- Land parcel: 1:200 survey diagram in WGS 84 with measured area, from a
  single drone flight.

Details: [Work](${SITE_URL}/el/work)

## AeroVIEW OS

Our own construction progress-tracking platform. Construction companies give
each client a login; the client sees stage-by-stage progress percentages,
media updates, milestones and materials, and each drone capture as a phase
with 3D models and 360° tours, all in the browser. Stages are modular: a full
build or a small renovation. Bilingual Greek/English.
Details: [AeroVIEW OS](${SITE_URL}/el/aeroview-os)

## Live in-house 3D demos

- [Lato quarry viewer](https://aeromine-3d-lato.vercel.app/)
- [Open pit stockpiles](https://aeromine-3d-open-pit.vercel.app/)
- [Real estate viewer](https://aeromine-3d-real-estate.vercel.app/)
- [Wind turbines](https://aeromine-3d-wind-turbines.vercel.app/)
- [Olive farm](https://aeromine-3-d-olive-trees-farm.vercel.app/)
- [Mall map](https://aeromine-3d-mall-map.vercel.app/)
- [Open office facility map](https://aeromine-3d-open-office.vercel.app/)

## Contact

- Email: ${COMPANY.email}
- Phone: ${COMPANY.phone}
- Address: ${COMPANY.address.streetAddress}, ${COMPANY.address.addressLocality} ${COMPANY.address.postalCode}, Greece
- [LinkedIn](${COMPANY.linkedin})
- [GitHub](${COMPANY.github})
- [FAQ](${SITE_URL}/el/faq)
`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export const dynamic = "force-static";
