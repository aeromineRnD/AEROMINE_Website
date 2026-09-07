# Aeromine website: build context

Everything a coding agent needs to build the new **www.aeromine.gr**. Self-contained: nothing here
depends on a conversation you were not part of.

**Build decisions already made:** one site, with AeroVIEW OS as a product section (not a separate
domain) · bilingual Greek + English · Next.js + Tailwind, matching the AeroVIEW OS stack so tokens
and i18n carry over.

**Read section 13 before writing any marketing copy.** It records what Aeromine may and may not
claim in public. Several sectors on the site are capability, not track record, and the wording is
deliberate.

---

## 1. What Aeromine is

A Greek **IKE** (private limited company), founded **2023**, based in **Athens**, three founders.

> Aeromine captures sites with drones and 360° cameras, processes them into survey-grade 3D, and
> delivers them as digital twins that open in a browser. We fly it, we process it, and we build the
> viewer it lands in.

Two things get sold:

| | Buyer | What they pay for |
|---|---|---|
| **Capture services** | Site owners, contractors, surveyors, quarry operators, restoration teams | A flight and a deliverable: orthophoto, point cloud, mesh, terrain model, volumes, plans, browser twin |
| **AeroVIEW OS** | **Engineers and construction firms** | A SaaS subscription, €49 to €199/month, to keep their own clients informed |

**The founders**

| Name | Role | Does |
|---|---|---|
| Ioannis Brintakis | Founder · Mineral Resources Engineer, M.Sc. | Flight planning, photogrammetry, survey deliverables. Signs the topographic work. |
| Vasilis Kokotakis | Software Engineer | Builds AeroVIEW OS and the 3D viewers. Python, JavaScript, React, Three.js. |
| Nikos Karatosidis | Innovation & Technology PM | Scoping, delivery, client onboarding. |

*(The company deck currently has no team slide. Whether the website has one is open.)*

---

## 2. The positioning argument

This is the spine. It works as the site's information architecture, in this order.

**a. The problem.** Most site data dies in a folder. A survey flight produces gigabytes of truth
about a site, then it gets exported, zipped, emailed once, and never opened again. Three reasons:

- **The file needs a specialist.** Point clouds and meshes open in software the client, the site
  manager and the investor do not have and will not install.
- **It is a snapshot, not a record.** One flight, one moment. Nothing links this month's reality to
  last month's.
- **The knowledge stays with one person.** Measurements, volumes and notes live in someone's
  project folder.

> A model nobody can open is not documentation. It is storage.

**b. One engine: capture, model, twin.** The same three steps run over every site. Only the subject
changes.

| Step | What happens |
|---|---|
| **Capture** | RTK drone flights for exteriors and terrain · 360° camera for interiors and walkthroughs · planned overlap and ground control, so it is measurable |
| **Model** | Photogrammetric processing to point cloud and textured mesh · digital terrain models, contours, areas and volumes · exports engineers already use: Revit, Civil 3D, AutoCAD, .dwg |
| **Twin** | Opens in a browser: no download, no plugin, no licence · information layers on top of geometry: keypoints, notes, measurements · re-fly it and the twin gains a timeline instead of a replacement |

**c. So breadth is a conclusion, not a claim.** Because it is one pipeline, the sector does not
change what Aeromine does. This matters: a flat list of seven industries reads as a capability
dump. Presented as the *output* of one engine, the same list reads as leverage.

**d. And we ship our own software.** Most drone firms stop at the file and hand you to someone else
for the software. Aeromine has no handover, which is why a bespoke viewer is a normal request
rather than a project. This is the differentiator a competitor cannot copy in a quarter, and it is
provable at `github.com/aeromineRnD` rather than merely asserted.

> If the twin you need does not exist yet, we build it rather than quote for it.

**A 3D model is geometry. A digital twin is geometry that knows things.** Useful comparison block:

| 3D model | Digital twin |
|---|---|
| Shape and texture | Shape, texture, and an information layer on top |
| Opens in specialist software | Opens in any browser, on any device |
| One moment in time | Every capture kept, so change is visible |
| Read it, and that is all | Measure it, annotate it, share it, track against it |

---

## 3. Two products, two buyers

**The single most important thing to get right on this site:**

> **AeroVIEW OS is sold to engineers, and its buyer does not need a drone.**

Its job is closing the distance between the engineer and their client. An engineer can use it with
nothing but **photos, videos and PDFs**. Drone capture, 3D models and 360° tours are an upgrade,
not a requirement.

This was originally got wrong in the company deck, where AeroVIEW was framed as the top tier of a
drone service ("every drone flight becomes a phase"). That framing excludes the actual buyer. Do
not reintroduce it. The approved line is:

> Our own platform, built in-house. It closes the distance between the engineer and the client.
> Upload what you already have, photos, videos or PDFs, and your client sees the project progress
> in a browser. Drone captures, 3D models and 360° tours are an upgrade, not a requirement.

Practically, for the site: the AeroVIEW section must stand on its own and convert a visitor who
will never buy a flight. Cross-sell the capture services as an add-on, not a prerequisite.

---

## 4. Approved copy, ready to lift

Every line below is from the finished company deck and has been read and signed off. Reusing it
keeps the site and the sales meeting in one voice. Full source:
`Aeromine_Github/LINKEDIN STRATEGY/Aeromine_Services/deck/content.py`.

**Hero**

- Headline: *We turn real places into measurable digital twins.*
- Sub: *Drone capture · 360° interiors · photogrammetry · browser-based digital twins*
- Meta: *Athens, Greece · Founded 2023*

**Section headlines**

| Section | Headline |
|---|---|
| Problem | Most site data dies in a folder. |
| About | A drone company that ships its own software. |
| How it works | One engine: capture, model, twin. |
| Differentiator | A 3D model is geometry. A digital twin is geometry that knows things. |
| Sectors | One pipeline. Any kind of site. |
| Work | Four sites, one pipeline. |
| AeroVIEW OS | The project your client can actually log into. |
| Why we are fast | We own every step, so custom is cheap. |

**Why we are fast, three columns**

- **We fly it.** In-house RTK drone operations and 360° capture. No subcontracted pilot, no
  scheduling chain.
- **We process it.** Agisoft Metashape, DJI Terra, Pix4D, Blender. The processing decisions are
  made by the people who planned the flight.
- **We build the viewer.** React, Three.js, React Three Fiber. AeroVIEW OS, a 3D mall map and
  standalone model viewers. All ours, all built in-house.

**How we work, four steps**

1. **Scoping call.** You describe the site and what you need to prove or measure. We tell you what
   is flyable and what is not.
2. **Flight.** One visit. Drone exterior, 360° interior where it is needed, ground control where
   accuracy demands it.
3. **Processing & delivery.** Point cloud, mesh, terrain model, volumes and plans, in the formats
   your engineers already open.
4. **The twin goes live.** Your deliverable opens in a browser. Re-fly whenever you need, and the
   timeline builds itself.

**Service tiers.** Pick the depth; the capture is the same.

| Tier | Name | Includes |
|---|---|---|
| Capture | Documentation | High-resolution aerial photos and video · orthophoto of the site · 360° interior walkthrough · delivered as files you own |
| Model | Survey-grade 3D | Everything above · point cloud and textured 3D mesh · digital terrain model, contours, areas, volumes · Revit / Civil 3D / AutoCAD / .dwg exports |
| Twin | AeroVIEW OS | Everything above · browser twin with keypoints and information layers · a phase per update, with progress per stage · client logins, milestones and updates |

**Partner-facing copy** (if the site has a partnerships page). Aeromine is the capture-and-twin
layer *under* another firm's service, not a competitor for their client:

- **Surveyors & civil engineers.** Aerial capture, terrain models and volumes feeding straight into
  your Civil 3D or AutoCAD workflow.
- **Architects & construction firms.** As-built capture, progress documentation, and a
  client-facing twin you present under your own relationship.
- **Software & proptech teams.** A 3D pipeline and browser viewer you would otherwise have to hire
  a graphics engineer to build.

Four collaboration shapes: white-label capture · joint delivery · custom viewer / R&D · AeroVIEW OS
partnership (resell or bundle).

**CTAs that tested well in the deck:** *"Send us one site."* (clients) and *"Bring us a job you
turned down."* (partners).

---

## 5. Sectors

Seven markets, each naming its **deliverable** rather than an adjective. Read section 13 before
labelling this list.

| Sector | Deliverable |
|---|---|
| Construction & residential | Progress captures per phase, stage percentages, client-facing twin |
| Quarries & extraction | Stockpile and cut/fill volumes, digital terrain models, contours |
| Heritage & archaeology | Documentation-grade models, elevations, .dwg for restoration teams |
| Real estate | 360° interiors and exterior twin for listings and remote buyers |
| Wind & energy assets | Tower and site inspection capture |
| Agriculture & land | Parcel boundaries, measured areas, terrain models |
| Large indoor spaces | Mall and facility 3D mapping, with an indoor wayfinding viewer |

---

## 6. Case studies

Four real projects, cleared to name.

| Project | Type | What was delivered | Image |
|---|---|---|---|
| **Alsos Veikou Theater** | Theatre · full 3D capture | Full photogrammetric capture and processing of the open-air theatre: orthophoto, textured mesh and point cloud. | `oaka_ortho.png`, `model_oaka_metashape.png` |
| **Open-pit quarry** | Extraction · volumes | Site captured and published as a browser twin with keypoints, supporting stockpile volumes and terrain modelling. | `twin_open_pit.png`, `quarry_pointcloud.png` |
| **Monastery complex** | Heritage · documentation | Point-cloud elevations of a historic complex, delivered as .dwg for the restoration team's existing CAD workflow. | `monastery_elevation.png`, `monastery_views.png` |
| **Residential land parcel** | Survey · real estate | 1:200 topographic plan in WGS 84 with measured parcel area, produced from a single drone flight. | `parcel_survey.png` |

⚠️ **The theatre is Alsos Veikou, not the Panathenaic Stadium.** An earlier draft of the deck
misidentified it. The asset filenames still say `oaka_*` for historical reasons; the filename is
wrong, the caption is right.

---

## 7. AeroVIEW OS product reference

**Live:** https://aeromine-project-tracking-platform.vercel.app
**Repo:** `~/Aeromine_Github/AEROMINE_Project_Tracking_Platform/aeromine-siteview`
*(The folder is still named from the old "Aeromine SiteView" branding. The product is AeroVIEW OS
and `package.json` says `aeroview-os`.)*

### The job it does

A construction company gives its clients a live window into their own build. The buyer of the
*house* is often abroad, frequently Greek diaspora, and has paid a large sum for something they
cannot visit. What they get today is a phone call and a WhatsApp photo when they ask. AeroVIEW
replaces that with a login.

**The seller's pitch is trust, not project management.** The engineer is not buying a Gantt chart.
They are buying fewer anxious phone calls, and a differentiator when pitching against a competitor
who offers nothing.

### The model

- An **admin** (the construction company) owns many **Projects**.
- Each Project is assigned to many **clients** through a join table. A client sees only what they
  are assigned.
- The distinctive unit is the **Phase**: one capture at one moment in time, carrying a 3D model, a
  360° tour, photos, and a frozen snapshot of every stage's progress on that date. Adding a phase
  never rewrites what last month's phase showed.

**Three roles:** `ADMIN` (the paying customer) · `CLIENT` (read-only except sending a message and
requesting a 3D walkthrough) · `SUPER_ADMIN` (Aeromine, partially implemented).

**13 preset stages**, seeded on project creation so there is no setup. Bilingual out of the box:

| # | English | Greek |
|---|---|---|
| 1 | Foundation | Θεμελίωση |
| 2 | Structural Frame | Φέρων Οργανισμός |
| 3 | Roofing | Στέγη |
| 4 | Masonry / Walls | Τοιχοποιία |
| 5 | Plumbing Rough-in | Υδραυλικές Εργασίες |
| 6 | Electrical Rough-in | Ηλεκτρολογικές |
| 7 | Insulation | Μόνωση |
| 8 | Plastering | Σοβάδες |
| 9 | Tiling / Flooring | Πλακάκια / Δάπεδα |
| 10 | Fixtures & Fittings | Εξοπλισμός |
| 11 | Painting / Finishing | Βαφή / Φινίρισμα |
| 12 | External Works | Περιβάλλων Χώρος |
| 13 | Final Inspection | Τελική Επιθεώρηση |

### Feature copy for the site

- **Every update becomes a phase.** Photos, a video, a PDF or a drone capture: whatever you upload
  sits beside the last one with its date, so the client sees a timeline instead of a replaced file.
- **Progress, stage by stage.** Foundation, roofing, plumbing, external works, final inspection,
  each carrying a live percentage.
- **Dates the client can see.** Start date, target date and overall completion, in the open.

### What it does NOT do

State these plainly if a prospect asks; do not let the site imply otherwise.

- No document management beyond files attached to updates and material invoices
- No scheduling or dependencies. Stages have an order, not a critical path. **Not a Gantt tool.**
- No cost tracking. Materials record quantity and an invoice URL, not budget vs actual.
- No subcontractor accounts. The roles are company, buyer, platform.
- No email. Every notification is in-app only.
- No mobile app. Responsive web, no PWA install, no push.
- No self-service password management for clients.

The first four are deliberate scope decisions: competing with construction ERP is not the play. The
last three are gaps.

### Pricing

| Plan | Monthly | Annual | Projects |
|---|---|---|---|
| Starter | €49 | €490 | up to 5 |
| Growth | €99 | €990 | up to 15 |
| Professional | €199 | €1,990 | unlimited |

Annual is two months free and is the default on the pricing page. 30-day free trial, no card.
VAT 24% on top for Greek customers; 0% for EU customers outside Greece under reverse charge.

**The metered unit is projects, not users or storage.** That maps to how a construction firm thinks
about its own capacity, and it means adding homebuyer accounts is free.

🚨 **Billing is not implemented.** No subscription field, no Stripe, no project-count enforcement,
no paywall. Every account currently has unlimited everything. **Do not scaffold a checkout that
cannot take money.** Either link pricing to a contact form / trial signup, or ship the page with a
"start free trial" CTA that creates an unmetered account. Break-even is roughly 10 Growth
customers, so this is the gating item for revenue.

One unresolved tension worth knowing: the ideal customer runs about 5 active projects, which prices
them at Starter (up to 5), but the business model assumes they buy Growth (up to 15). Either the
tier boundaries move or €49 is the realistic default.

### Stack

Next.js 14 App Router + TypeScript · Tailwind + shadcn/ui (Radix) · PostgreSQL on Neon (Frankfurt) +
Prisma 5 · NextAuth v4 Credentials + bcryptjs, JWT sessions · Vercel Blob for files, client-direct
upload · React Three Fiber + drei for GLTF · Panoee / YouTube 360 in a sandboxed iframe · Recharts ·
SWR · zustand · vitest + Playwright · Vercel, auto-deploy on push to `main`.

---

## 8. Brand system

### Colour

**Use the existing `aeromine` ramp.** It is already defined in
`aeromine-siteview/tailwind.config.ts` and is the closest thing to a canonical brand palette. Copy
it verbatim into the new project:

```ts
aeromine: {
  50:  "#fefce8",
  100: "#fdf6c0",
  200: "#fbec82",
  300: "#f7da3e",
  400: "#f0c835",
  500: "#e8b84b",
  600: "#d4a017",
  700: "#b08010",
  800: "#8c640c",
  900: "#6b4c0a",
  950: "#3d2b05",
},
```

⚠️ **Three different golds are in circulation.** The company deck uses `#F2C744`, the LinkedIn
visual playbook specifies `#E8B84B`, and the app uses `#d4a017` as its primary. The ramp above
reconciles them: `aeromine-500` *is* the playbook's `#E8B84B`, and `aeromine-600` is the app's
primary. The deck's `#F2C744` sits between `300` and `400` and is the outlier. Adopt the ramp; do
not invent a fourth gold. Aligning the deck to `aeromine-500` is a small pending job.

**Neutrals**, from the company deck (`deck/theme.py`):

| Role | Hex |
|---|---|
| Ink, primary dark background | `#1C2120` |
| Teal, secondary dark and accent text on light | `#233F48` |
| Paper, light background | `#F5F7F9` |
| Muted, secondary text on light | `#5B666B` |
| Muted on ink, secondary text on dark | `#A8B2B6` |
| Hairline, borders on light | `#DDE3E7` |
| Hairline dark, borders on dark | `#353C3B` |

🚨 **The gold-on-white trap.** Gold on white is about **1.7:1** and fails badly. On light
backgrounds gold is a **fill** colour only: chips, rules, buttons, icon backgrounds. Accent **text**
on light backgrounds must be teal `#233F48` (about 11:1). Gold text is fine on ink `#1C2120` (about
9:1). The deck was built and then rebuilt to fix exactly this; do not undo it.

A related trap that cost time on the deck: **hyperlink colour**. A run-level hyperlink gets
recoloured by the renderer's theme link colour even when it carries an explicit fill. In CSS this
is the equivalent of forgetting `a { color: inherit }` on a dark footer. Check link colour on dark
sections explicitly.

### Logo

`deck/assets/logo_ink.png`, `logo_white.png`, `logo_gold.png`: the drone-propeller mark with
"AEROMINE" inside it. **The logo already contains the wordmark.** Do not set "AEROMINE" in type
beside it; that reads as the name twice. There is no SVG. Getting one vectorised is worth doing
before the site ships, since the PNG is 321×320 and will not scale for a hero or a retina header.

### Type

The deck is set entirely in **Arial**, chosen for guaranteed availability in PowerPoint on any
machine. **That constraint does not apply to a website.** Pick a proper typeface. Keep the deck's
discipline instead: one or two families, a small locked size scale, weight and size doing the work
rather than colour and decoration. Greek glyph coverage is required, which rules out a lot of
display faces. Inter, Manrope and Barlow all cover Greek well.

---

## 9. Copy rules

1. **No em-dashes.** Anywhere. Use a colon, a comma, or two sentences. This is a standing house
   rule.
2. **No invented metrics.** See section 13.
3. **Keep trade-English terms in Greek copy.** *drone, 3D, 360°, browser, digital twin,
   photogrammetry* stay in English. That is how the Greek trade actually speaks; translating them
   sounds unnatural and signals an outsider.
4. **One language per view.** Never stack Greek and English in the same block of copy.
5. **Message headings, not labels.** A heading should be a sentence with a verb that states the
   takeaway. "One pipeline. Any kind of site." beats "Our Sectors". The old deck had five slides
   titled "AeroMine Services" and it is the main reason it read as a capability dump.
6. Voice: plain, concrete, slightly blunt. Name the deliverable rather than describing a benefit.
   Volunteer the limitation before the prospect finds it.

---

## 10. Bilingual approach

Greek is the lead-gen language: the Greek construction buyer decides in Greek, and Greek signals
local credibility a foreign SaaS cannot fake. English must stay available for partners, the
diaspora buyers the product is built around, and international traffic.

**Reuse the existing system rather than adding a dependency.** AeroVIEW OS has a working
hand-rolled setup:

- `aeromine-siteview/lib/i18n/translations.ts`: about 330 keys, `Locale = "en" | "el"`
- `aeromine-siteview/lib/i18n/LanguageContext.tsx`

Copy the pattern, and **lift the product vocabulary verbatim** so the marketing site and the app use
the same Greek words. Otherwise the site sells "Στάδια" and the app shows something else:

| Key | Greek |
|---|---|
| `stageProgress` | Πρόοδος Σταδίων |
| `phaseName` | Όνομα φάσης |
| `milestones` | Ορόσημα |
| `progress` | Πρόοδος |
| `projectStatus` | Κατάσταση Έργου |
| `updates` | Ενημερώσεις |
| `tourWalkthrough` | 360° Περιήγηση |
| `overallCompletion` | Συνολική Ολοκλήρωση |
| `droneCapture` | Λήψη drone: {date} |
| `completed` / `inProgress` | Ολοκληρωμένα / Σε Εξέλιξη |

For a marketing site, prefer real localised routes (`/el/...`, `/en/...`) over a client-side
context, so Greek pages are indexable. Set `hreflang` accordingly.

---

## 11. Asset inventory

All in `Aeromine_Github/LINKEDIN STRATEGY/Aeromine_Services/deck/assets/`. Originals, uncropped, in
`assets/src/`. All are already cleaned, cropped and colour-flattened for presentation.

**Field and model imagery, safe to publish**

| File | Shows |
|---|---|
| `oaka_ortho.png` | Alsos Veikou Theater, top-down orthophoto. The strongest single image in the set; used as the deck cover. |
| `model_oaka_metashape.png` | The theatre as a textured 3D model in Agisoft Metashape. Excellent "this is real photogrammetry" proof. |
| `twin_open_pit.png` | The branded "AEROMINE OPEN PIT" browser twin with keypoints. The best evidence of the twin product. |
| `quarry_pointcloud.png` | Quarry site point cloud, perspective view |
| `dtm_contours.png` | Digital terrain model with contour lines, colour-ramped elevation |
| `monastery_elevation.png` | Point-cloud elevations of the monastery, with a `.dwg` badge |
| `monastery_views.png` | Three model views of the monastery |
| `parcel_survey.png` | 1:200 topographic plan, WGS 84, with measured parcel boundary |
| `measure_accuracy.png` | A 12.1 m span measured off the model, checked against a physical scale bar. Concrete accuracy proof. |
| `two_times_one_model.png` | Same building at two different times. Carries its own yellow marketing caption, so it clashes with a clean design. Recrop or skip. |

**AeroVIEW OS screenshots**

| File | Shows |
|---|---|
| `av_phasebar.png` | Phase selector strip with capture title and date |
| `av_stages.png` | Per-stage progress chart |
| `av_completion.png` | Overall completion bar with start and target dates |
| `av_kpis.png` | Dashboard KPI tiles |
| `av_donut.png` | Project status donut |
| `av_milestones.png` | Milestones panel |

🚨 **The raw screenshots in `assets/src/` contain seeded demo data**: projects named `test`,
`test2`, `This is the final e2e test`, and a fake user `Stavros Papadopoulos`. The `av_*.png` crops
above were positioned specifically to exclude it. **If you take new screenshots, clean the seed data
first.** Also note `av_kpis.png` and `av_donut.png` show demo *counts* (7 projects, 6 in progress),
which imply a portfolio size Aeromine does not have. The deck deliberately dropped both for that
reason.

**Logos:** `logo_ink.png`, `logo_white.png`, `logo_gold.png` (see section 8).

**Portraits:** `team_brintakis.png`, `team_kokotakis.png`, `team_karatosidis.png`. All three
normalised to identical 600×600 circular crops on transparent background.

**Not yet available and worth commissioning:** a logo SVG · a short 3D-walkthrough video, described
in the LinkedIn strategy as "the single most important asset" and still unrecorded · any photo of
the team actually flying a drone.

---

## 12. What is on the current site

`aeromine.info` today, for reference on what to keep and what to drop.

**Platform:** Wix. **Language:** English only. **Nav:** Home · Services · 3D Models · Portfolio ·
Contact · FAQ · Blog · More.

**Three services listed:** drone inspection & aerial imagery ("high-quality drone inspection
services for a variety of industries"), 3D modeling ("detailed 3D models of virtually anything.
From construction sites to archaeological sites"), and area & volume calculation.

**Carries over:**

- Address: Polytexneiou 6, Athens, 10433
- Phone: +30 6981375791
- Social: LinkedIn (Ioannis Brintakis), YouTube `@johnbrintakis4424`, Instagram `@aeromine_`,
  Facebook profile `61552224999360`
- A contact form

**Does not carry over:**

- 🚨 The public contact email is **`johnbrintakis@hotmail.com`**. Use **`jbrintakis@aeromine.org`**.
  A hotmail address on a B2B engineering site undercuts everything else on the page.
- English-only structure
- **No mention of AeroVIEW OS anywhere.** The product does not exist on the current site.
- No pricing
- No named case studies. The generic service descriptions predate all four projects in section 6.
- The social accounts are personal-branded (`johnbrintakis4424`), not company-branded. Worth
  deciding whether to link them at all.

**LinkedIn company page** (`linkedin.com/company/aeromine-info`), for consistency of description:
tagline *"Drone-based 3D modeling & Digital Twin solutions"*, industry Engineering Services, size
2 to 10 employees, HQ Athens, founded 2023, about 337 followers, specialties Drone / 3D Models /
Digital Twin.

**GitHub org** (`github.com/aeromineRnD`): bio *"Drone Intelligence for Engineering &
Construction"*, Athens. Public repos include `AEROMINE_3D-Viewer`, `AEROMINE_3D-MALL-MAP`,
`AEROMINE_3D-Viewer-App-Cube`, `AEROMINE_3D-Viewer-App-Logo`,
`AEROMINE_3D-Viewer-App-Evacuation-Mini-House`. Useful as live proof of the "we build our own
viewers" claim, and several are embeddable demos.

---

## 13. The honesty ledger

**Read this before writing marketing copy.** These distinctions were decided deliberately and the
site must hold the same line the deck does.

### Sectors: what is client work and what is capability

| Delivered for paying clients | Built and demonstrated, no paying client yet |
|---|---|
| Construction & residential | Wind & energy assets |
| Quarries & extraction | Agriculture & land |
| Heritage & archaeology | Large indoor spaces (the 3D mall map is R&D) |
| Real estate | |

The company deck presents all seven under the heading **"Where we work"**, specifically *not*
"Delivered for clients", so that nothing on the page claims a customer that does not exist. **Keep
that wording, or an equivalent that makes no track-record claim.** The failure mode is a prospect
asking "who was the wind farm client?" in the second meeting.

Framed correctly, the demos are an asset rather than a liability: they exist *because* the pipeline
is the same and the tooling is in-house. That is the speed argument made concrete.

### Numbers that may be stated

| Claim | Source |
|---|---|
| Founded 2023, Athens, Greece, IKE, three founders | LinkedIn company page |
| **0.01 m** stated accuracy on volumes and dimensions | Aeromine's own GitHub org bio |
| **15+** public open-source repositories | Checkable at `github.com/aeromineRnD` |
| **15+** private repositories built for paying clients | Founder-stated, not publicly verifiable |
| Software used: Agisoft Metashape, DJI Terra, Pix4D, Blender | GitHub org |
| Export formats: Revit, Civil 3D, AutoCAD, .dwg, GLTF, OBJ, LAS, E57 | Deck capability reference |

### Numbers that must NOT appear

Hectares flown · number of projects completed · number of clients · time-saved percentages · ROI or
cost-saving figures · any testimonial that has not been given.

If a number is needed for a page to work, get it from the founders rather than estimating it. The
deck was built to this rule and it is why every figure on it survives a follow-up question.

### Contact details

| | |
|---|---|
| Email | `jbrintakis@aeromine.org` |
| Phone | `+30 698 137 5791` |
| Address | Polytexneiou 6, Athens, 10433 |
| Web | `www.aeromine.gr` |
| Code | `github.com/aeromineRnD` |

---

## 14. Open questions for the build

1. **Pricing page vs billing.** AeroVIEW has no Stripe integration and no paywall. Does the pricing
   page take a card, start an unmetered trial, or open a contact form? Decide before building it.
2. **AeroVIEW demo.** A public sandbox account, a recorded walkthrough, or a booked call? A sandbox
   means cleaning the seeded demo data and rotating the credentials in `DEMO_CREDENTIALS.md`, which
   currently point at the production database.
3. **Social links.** The YouTube and Instagram accounts are personal-branded and may be stale. Link
   them, rebrand them, or omit them.
4. **Team page.** The deck dropped its team slide, which leaves no human presence anywhere. For a
   three-person firm selling trust, a website is a better place for faces than a deck is.
5. **Blog.** The current Wix site has one. Worth keeping only if someone will write; an abandoned
   blog dated two years ago is worse than none. Note that the LinkedIn strategy already produces a
   steady stream of Greek content that could be repurposed.
6. **Logo SVG.** Needed before launch. Only a 321×320 PNG exists.
7. **Deck and site alignment.** Once the site ships, the company deck should adopt `aeromine-500`
   so the gold matches everywhere.

---

## Where the source material lives

| Path | Contains |
|---|---|
| `Aeromine_Github/LINKEDIN STRATEGY/Aeromine_Services/Aeromine_Presentation_EN.pptx` | The finished company deck, 19 slides |
| `Aeromine_Github/LINKEDIN STRATEGY/Aeromine_Services/deck/content.py` | All deck copy, the single source for approved wording |
| `Aeromine_Github/LINKEDIN STRATEGY/Aeromine_Services/deck/theme.py` | Deck palette, type scale, the contrast rules |
| `Aeromine_Github/LINKEDIN STRATEGY/Aeromine_Services/deck/assets/` | All prepared imagery |
| `Aeromine_Github/LINKEDIN STRATEGY/LINKEDIN_GTM_STRATEGY.md` | Audience analysis, language decision, positioning angles |
| `Aeromine_Github/AEROMINE_Project_Tracking_Platform/aeromine-siteview/` | AeroVIEW OS source, Tailwind tokens, i18n |
| `Obsidian/AEROVIEW/AeroVIEW OS/` | Product docs: roles, pricing, data model, roadmap, known issues |
