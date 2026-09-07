# Open items

Three things the September 2026 feedback round could not finish in code. Each is
blocked on a decision or on material from outside the repo, not on engineering
time. Written down so they do not get lost between here and launch.

---

## 1. Consent banner: GA4 currently records nothing

**Status:** shipped, deliberately inert. **Blocked on:** a decision.

`components/analytics/Analytics.tsx` sets Consent Mode v2 to `denied` for all
four storage types. There is no consent banner on the site, so nothing ever
flips it to granted and GA4 collects no data at all.

This is not an oversight. A Greek company cannot drop an analytics cookie on an
EU visitor without asking first, and adding a banner is a visible, site-wide
change that is a founders' decision rather than an engineering one.

Three ways out:

| Option | Cost | Result |
|---|---|---|
| Add a consent banner | Small UI job | GA4 works fully after consent. Clean legally. |
| Swap to Vercel Analytics | Small config job | Cookieless, no banner needed, but no Google reports |
| Leave it denied | Nothing | Search Console still works; GA4 stays empty |

Flipping it on later is one `gtag('consent','update',...)` call.

Note: `NEXT_PUBLIC_GA_ID` is inlined at build time, so setting it in Vercel
needs a redeploy, not just an environment variable.

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

**Clean AeroVIEW OS screenshots.** The current crops show progress bars at or
near 100%, which reads as staged. Nikos asked for bars at realistic values with
specific insights visible. The seed data has to be cleaned first: the raw
screenshots contain projects named `test`, `test2`, `This is the final e2e test`
and a fake user `Stavros Papadopoulos` (WEBSITE_CONTEXT.md §11). Replace the
four files in `public/images/av_*.png`.

**360° stills or a short video.** Nothing on the site currently shows the 360°
product, which is one of the three things we sell.

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
