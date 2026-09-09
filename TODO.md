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

## 2. Point aeromine.info at the new site

**Status:** planned for the weekend of 2026-09-12/13. **Blocked on:** a domain
transfer, and on Ioannis, who receives the auth code.

The site is `www.aeromine.gr` on Vercel. `aeromine.info` still serves the old
Wix site, and it holds the branded search traffic, the LinkedIn slug
`linkedin.com/company/aeromine-info`, business cards and email signatures. It
must never lapse.

⚠️ **Setting redirects inside Wix does not work.** Tested 2026-09-09: Wix's URL
Redirect Manager only redirects within the same site, and entering an external
target silently strips the host, so `https://www.aeromine.gr/el/services` saves
as `/el/services` and 404s. The earlier note in this file saying "configure the
301s on the Wix side" was wrong.

The plan instead: transfer `aeromine.info` from Wix to Papaki, where
`aeromine.gr` already lives, point its DNS at Vercel, and add it to this project
as a redirect to `www.aeromine.gr`. The full order of operations, including the
one irreversible mistake to avoid (cancelling the Wix plan too early), is
recorded outside the repo with the domain and registrar details.

**What lands in this repo, afterwards.** Old Wix paths mostly resolve on their
own, because the next-intl middleware adds the locale prefix: `/`, `/services`,
`/contact` and `/faq` all reach a 200 without any mapping. Only `/models`,
`/portfolio`, `/blog`, `/post/*` (27 posts), `/forum`, `/groups`, `/members` and
`/properties` 404. Those are worth roughly six `next.config.ts` rules, but only
once `.info` actually resolves to Vercel: until then such a rule can never fire.

Submit the sitemap in Search Console once the redirect is live.

---

## 3. Assets and figures we do not have yet

**Status:** slots exist in the code and render nothing while empty.
**Blocked on:** material from the founders.

**AeroVIEW OS screenshots: done, except the 360.** Four are published: the
client dashboard, the Kato Tithorea drone capture as a phase, the stage
progress panel and the interior model view. The client project list was
dropped as a near-duplicate of the dashboard; the file is in git history if
anyone wants it back.

*360° walkthrough.* Still nothing. The first attempt was watermarked by another
studio (3DLabz) and could not be used; the second turned out to be a
photogrammetry model rather than a 360 tour, and is now published as the drone
capture shot. A real 360 from one of our own captures is still missing, and it
is the only one of the three things we sell with no picture anywhere on the
site.

*Small fixes worth making in the same pass:* `Vila "Viena"` should be `Villa`;
`Katw Tithorea` should be `Kato`, and that project runs 23 to 24 August 2026,
a one-day build; "Kifisia Residence" shows 100% while still tagged In Progress;
and the dashboard's "Recent Activity" panel is empty.

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

## 4. "Request a demo" on the AeroVIEW page

**Status:** never built. **Blocked on:** nothing. This one is just outstanding.

Nikos asked for it in the original feedback and it was in the plan; it got lost
between the other commits. The AeroVIEW page still ends with a plain "Talk to
us" going to `/contact`.

No new infrastructure needed. `app/api/contact/route.ts` already sends to
`jbrintakis@aeromine.org` through Resend; the demo form reuses it with its own
subject (`AeroVIEW OS demo request: <name>`) so it is separable in the inbox,
the visitor as `reply_to`, and the same honeypot and validation.

There is no sandbox account, so the button opens the form, never a fake login.

Related, and worth doing before any of this matters: the Resend sender is still
`onboarding@resend.dev`, their sandbox domain. It needs a verified
`aeromine.gr` sender or both contact and demo mail risk going to spam.

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
