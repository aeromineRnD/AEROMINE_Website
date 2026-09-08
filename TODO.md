# Open items

Things the September 2026 feedback round could not finish in code. Each is
blocked on a decision or on material from outside the repo, not on engineering
time. Written down so they do not get lost between here and launch.

---

## 1. Turn GA4 on: two things left

**Status:** banner built and wired. **Blocked on:** a Vercel setting, and a
policy page.

Decided 2026-09-08: consent banner plus full GA4, rather than cookieless
analytics. `ConsentBanner` asks once, remembers the answer, and grants
`analytics_storage` only on accept. `ad_*` stay denied permanently, since we
run no advertising.

**a. Set `NEXT_PUBLIC_GA_ID` in Vercel and redeploy.** The banner and the tag
both stay hidden until this exists. It is a `NEXT_PUBLIC_` value, so it is
inlined at build time: adding the variable is not enough on its own, the
project has to build again afterwards.

**b. A privacy or cookie policy page.** The banner explains in one sentence
what the cookie does, which is honest but thin. The normal companion is a short
page describing what is collected and how to withdraw consent, linked from the
banner and the footer. Not written, because it is a legal document and should
not be invented: worth twenty minutes from whoever handles the company's terms.

Once someone has answered, the banner never returns. Clearing it for testing:
`localStorage.removeItem('aeromine-consent')`.

---

## 2. 301 redirects from the old Wix site

**Status:** not started. **Blocked on:** access to the Wix admin.

The site now lives at `www.aeromine.gr` on Vercel. `aeromine.info` is the old
Wix site on separate hosting and is due to be taken down. Whatever search
history and backlinks that domain has are lost unless its URLs are redirected
to their nearest equivalent here.

**This cannot be done from this repo.** A `next.config.ts` redirect only runs
for requests that reach Vercel, and a request for `aeromine.info` never does.
The 301s have to be configured on the Wix side by whoever has that login.

Before the old site is switched off:

- Map each old URL to its closest new one (`/services/...`, `/sectors`, `/work`,
  `/aeroview-os`, `/contact`, `/faq`)
- Set them as permanent 301s, pointing at `https://www.aeromine.gr/el/...`
- Submit the new sitemap in Search Console afterwards

---

## 3. Assets and figures we do not have yet

**Status:** slots exist in the code and render nothing while empty.
**Blocked on:** material from the founders.

**AeroVIEW OS screenshots: three done, two to re-shoot.** The dashboard, the
project list and the 3D phase view are live. Two more are needed.

*Stage progress.* The supplied shot cannot be published: the ladder is
impossible. Final Inspection, Painting, External Works and Fixtures all read
100% while Plumbing sits at 20% and Insulation at 10%. Nobody paints before
plastering, and any engineer looking at our site spots it in two seconds. Set a
coherent mid-build ladder before re-shooting, for example:

    Foundation 100 · Structural Frame 100 · Roofing 80 · Masonry 60
    Plumbing 40 · Electrical 35 · Insulation 10 · everything below 0

That also gives the chart the shape it should have: solid green at the top,
part-filled through the middle, empty at the bottom. Same shot needs the update
feed cleaned, it currently credits `Stavros Papadopoulos` three times, and the
milestone literally named "final / bla bla bal" removed.

*360° walkthrough.* The supplied one is watermarked **3DLabz Animation Studio /
www.3dlabz.com**. It cannot go on aeromine.gr: publishing another studio's
work on our own marketing site presents it as ours. Needs a 360 from one of our
own captures. This is still the only one of the three things we sell that has
no picture anywhere on the site.

*Small fixes worth making in the same pass:* the project is called
`Vila "Viena"`, which should be `Villa`; "Kifisia Residence" shows 100% while
still tagged In Progress; and the dashboard's "Recent Activity" panel is empty,
so a couple of entries there would make the shot fuller.

**Real project figures.** `messages/*.json` carries a `facts` array per case
study. Only the parcel is filled, with its scale and datum, because those are on
the drawing. The other three are empty arrays and render no chips at all.

WEBSITE_CONTEXT.md §13 forbids estimating these, so they stay empty until
Ioannis supplies sourced numbers: area captured, GSD, DTM resolution, contour
interval. The "1,100 stremmata · 5 cm orthophoto · 10 cm DTM · 1 m contours"
figure quoted in the SEO audit looks real and is worth confirming. Adding them
is a JSON edit, no code change.

**Poster images for the model gallery.** Six of the seven viewers in
`lib/models.ts` have no poster, so their cards show a plain dark panel with a
load button. It works, but one screenshot per viewer would lift the gallery a
lot.

---

## Not doing

Recorded so nobody reopens them without new information. Full reasoning is in
the commit messages and in WEBSITE_CONTEXT.md.

- **AeroVIEW as "part of selected Aeromine projects".** It is sold to engineers
  who do not need a drone. That framing removes its actual buyer (§3).
- **The audit's proposed H1.** Keyword-stuffed; the search terms are covered by
  the service pages instead.
- **The rest of the audit's language table.** Corporate neutral. Only "custom is
  cheap" had a real problem and it is fixed.
- **A blog / Insights section.** Right topics, wrong moment. Three posts and
  then silence is worse than no blog. Revisit if someone commits to writing.
- **Regenerating the copy with AI.** It is lifted from the signed-off company
  deck so the site and the sales meeting say the same thing.
