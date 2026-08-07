# SEO / GEO Analysis — Portfolio

**Target:** `src/app` (Next.js 16.3 App Router)
**Date:** 2026-08-07 · revised same day after the JSON migration (§0)
**Framing:** Google's position is that optimizing for generative AI search *is*
SEO. Nothing below is a separate "GEO discipline" — it is SEO fundamentals
applied to surfaces that don't run JavaScript.

---

## GEO Readiness Score: 41 → 78 / 100

| Criterion | Weight | Before | After | Note |
|---|---|---|---|---|
| Technical accessibility | 20% | 2/20 | 19/20 | The whole audit hinged on this |
| Citability | 25% | 14/25 | 18/25 | Good facts, no question-shaped entry points |
| Structural readability | 20% | 12/20 | 15/20 | Clean headings; few tables/lists |
| Authority & brand signals | 20% | 6/20 | 15/20 | Schema + `sameAs` now present; off-site is still empty |
| Multi-modal | 15% | 7/15 | 11/15 | Images yes, video no |

---

## 0. Content moved from Google Sheets to a JSON file

The sheet is gone. `src/data/portfolio.json` is now the single source of truth,
imported directly at build time. Deleted: `utils/fetchFromSheets.js`,
`utils/mergePortfolioData.js`, `hooks/usePortfolioData.js`,
`data/portfolioData.js`, and the `NEXT_PUBLIC_SHEETS_API_URL` variable.

The live sheet was read one last time and frozen into the JSON, so nothing was
lost — all 23 projects, 8 certifications and 8 roles carried over, including
the rows that only existed remotely.

What this buys, in SEO terms:

| | Before | After |
|---|---|---|
| Page mode | ISR, revalidate 3600 | Fully static (`force-static`) |
| Build depends on | A third-party Apps Script being up | Nothing |
| Failure mode | Sheet down → bundled fallback, silently different content | None |
| Content drift | Schema built from sheet, fallback from JS file | One file feeds page, schema and llms.txt |

The sheet was also actively corrupting data: `personalInfo.gpa` was reaching
the page as `2025-08-02T17:00:00.000Z`, because Apps Script coerced the `3.8`
cell into a date. That value was being fed to the AI assistant as fact. It is
now `"3.8"`. This class of bug cannot recur in JSON.

**Editing from now on:** open `src/data/portfolio.json`, edit, commit, redeploy.

---

## 1. The finding that mattered: the page was blank to every AI crawler

Measured on the built output, before any change:

```
$ node -e "…strip tags from .next/server/app/index.html…"
bytes: 12023
visible text chars: 90
TEXT >>> > Loading Preparing portfolio… Loading content and projects.
headings: <h2>Preparing portfolio…</h2>
ld+json: false
```

**90 characters.** No `<h1>`. `PortfolioApp` was `'use client'`, every section was
`React.lazy`, and the data came from Google Sheets inside `useEffect`. Googlebot
renders JavaScript eventually; **GPTBot, ClaudeBot, PerplexityBot and
OAI-SearchBot do not**. To all of them the site was a loading spinner.

Everything else in this report — schema, llms.txt, keywords — would have been
decoration on an empty page.

### Fix

Data resolution moved off the client entirely:

- `src/lib/portfolio.js` — `getPortfolioData()` returns the imported JSON. No
  network call, so there is no failure path to degrade through.
- `src/app/page.jsx` — a server component, `force-static`. Passes `data` down.
- `src/components/PortfolioApp.jsx` — sections are static imports again. They
  are page content; lazy-loading them was what hid them.

After:

```
visible text chars: 6293   (939 words)
headings: h1 Fauzan Ahsanudin Alfikri
          h2 About · Skills & Expertise · Experience · Certifications ·
             Featured Projects · Get in touch
ld+json: true  → Person, WebSite, ProfilePage, ItemList
```

Verified in a real browser against `next start`: **0 console errors, 0 hydration
warnings**, all 7 sections present, all 17 images resolve, `data-reveal="hidden"`
count 0.

### Side effect worth knowing

The LoadingScreen can no longer appear. The page is static and the data is
imported, so there is nothing to wait for and nothing to fail. It stays in the
tree only as a guard against a malformed `portfolio.json`.

---

## 2. AI crawler access

`src/app/robots.js` → `/robots.txt`. Everything is allowed; only `/api/` is
closed, since the chat route has nothing indexable and costs a Gemini call.

Explicitly listed (an explicit `Allow` documents intent and survives someone
later adding a blanket `Disallow`):

| Crawler | Owner | Status |
|---|---|---|
| GPTBot, OAI-SearchBot, ChatGPT-User | OpenAI | Allowed |
| ClaudeBot, Claude-User, Claude-SearchBot, anthropic-ai | Anthropic | Allowed |
| PerplexityBot, Perplexity-User | Perplexity | Allowed |
| Google-Extended | Google (Gemini / AI Overviews grounding) | Allowed |
| Applebot-Extended, meta-externalagent, cohere-ai, CCBot | various | Allowed |

`Google-Extended` matters specifically: blocking it removes the page from Gemini
grounding without affecting classic Search rank.

---

## 3. Structured data

`src/lib/schema.js` builds one `@graph` from the same merged data the page
renders, so the schema cannot drift from what a reader sees.

```
Person       @id /#person   — 25 knowsAbout topics, 8 hasCredential,
                              8 hasOccupation, sameAs → GitHub/LinkedIn/Instagram,
                              alumniOf Telkom University, homeLocation Bandung
WebSite      @id /#website
ProfilePage  @id /#webpage  — mainEntity → Person, dateModified (build time)
ItemList     @id /#projects — 23 projects as SoftwareSourceCode/CreativeWork
                              with codeRepository, keywords, author → Person
```

`sameAs` is the load-bearing property. AI search resolves a portfolio to a
*person* entity; those three links are what tie this page to the GitHub and
LinkedIn profiles the models already have in their index.

One bug caught during verification: project `image` was emitting the Google
Drive **share** link (`/file/d/…/view`), which serves an HTML page, not an image.
Now routed through the same `getDirectImageUrl()` the cards use.

---

## 4. llms.txt

Served at `/llms.txt` (`src/app/llms.txt/route.js`), generated from live data —
26 KB covering summary, profile, skills, all 23 projects, experience and
certifications.

**Honest caveat:** Google has stated llms.txt is not a ranking or citation
signal, and server-log audits have not found the major AI crawlers requesting
it. It costs nothing and some smaller agents do read it, but the SSR HTML and
the JSON-LD graph are what actually do the work. Do not expect this file to move
anything on its own.

---

## 5. Metadata and share card

`src/app/layout.jsx`:

- `metadataBase` was hardcoded to `https://fauzan-a25.github.io` — the GitHub
  Pages deployment that no longer exists. Now resolved through
  `src/lib/site.js`: `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` →
  the old host as a last resort.
- Added `alternates.canonical`, `robots.googleBot` with `max-snippet: -1` and
  `max-image-preview: large` (these are what make a page eligible for rich
  results and AI Overview cards), `og:locale`, `og:site_name`, `og:type: profile`.
- Description rewritten so an answer engine can lift it verbatim — who, what,
  where, plus the two specific claims (Teaching Assistant; 3rd place ADIKARA
  2025) that make a sentence worth citing.

**Share card:** the OG image was `Fauzan.png` at **368×372** — below the
threshold, so X/LinkedIn/Slack downgrade it to a thumbnail. Replaced with
`src/app/opengraph-image.jsx`, a generated **1200×630** card in the site's own
dark palette (`next/og`, no new dependency, 48 KB PNG). Rendered and inspected.

`src/app/sitemap.js` → `/sitemap.xml`, one URL, `lastModified` = build time.

All endpoints verified over HTTP: `200` with correct content types.

---

## 6. Brand mark

There was no logo — the nav showed a 9px square and the string "FAA", and the
favicon was a different design again (a square plus the letters "FA" in
`system-ui`). Three surfaces, three unrelated marks.

`src/components/ui/Logo/Logo.jsx` now holds one geometric FA monogram in two
lockups:

- `LogoMark` — open, stroked, painted with `currentColor` so a single asset
  covers both themes. In the nav at 19px, next to the wordmark.
- `LogoPlate` — the same glyph on a filled plate, for surfaces whose background
  is not ours to control.

Construction: the F's middle arm and the A's crossbar share one line (y=16.6),
which is what fuses two initials into a single glyph; the A's apex overshoots
the F's cap line by ~1.2 units, because pointed shapes read as short when they
are mathematically level. Stroked at one weight so it holds at 16px — verified
by rendering at 16/20/24/32/64/128 in both themes.

Applied to every surface at once:

| Surface | Source | Result |
|---|---|---|
| Nav | `LogoMark` + wordmark | Mark + **"Fauzan Ahsanudin"**, not "FAA" |
| Favicon | `src/app/icon.svg` | `<link rel="icon">`, SVG, theme-independent |
| iOS home screen | `src/app/apple-icon.jsx` | 180×180 PNG, was missing entirely |
| Share card | `opengraph-image.jsx` | Mark now heads the 1200×630 card |

Two things worth noting. The wordmark changed from the initials `FAA` to the
full name: the nav is the one place the brand string appears above the fold on
every screen, and **"Fauzan Ahsanudin"** is what an answer engine resolves this
page to — `FAA` matches an aviation authority.

And `metadata.icons` was removed from `layout.jsx`. Declaring it overrides the
`app/` file convention wholesale, which is why `apple-icon.jsx` compiled, served
`200 image/png`, and still emitted no `<link>` tag. Both tags are present now:

```
<link rel="icon" href="/icon.svg?…" sizes="any" type="image/svg+xml"/>
<link rel="apple-touch-icon" href="/apple-icon?…" type="image/png" sizes="180x180"/>
```

---

## 7. Fixed: project descriptions now reach the HTML

**The finding.** The Projects section is a carousel: it rendered the *active*
slide's `<h3>` and description, and the other 22 existed in the DOM only as an
`aria-label` on a button. Titles were indexable; the prose that makes them
worth citing — *"89% accuracy across 3,276 samples"*, *"92% accuracy across
10,000+ applications"* — was not.

**The fix.** `src/components/sections/Projects/ProjectIndex.jsx` renders every
project below the stack, built on native `<details>`: full description,
a `Results` list from `highlights`, the stack, and both links. No JavaScript is
involved in getting the text into the document — the browser handles the
disclosure, plus keyboard access and find-in-page for free. It follows the same
category filter as the carousel, so the two never disagree.

This is **not** hidden text. It is user-facing content behind an ordinary
disclosure control, the same pattern as any FAQ accordion, and Google indexes
collapsed content at full weight. Nothing in it was written for crawlers that a
reader would not also want — 23 projects in a card stack was poor browsing UX
independently of any of this.

Measured before and after, on the built output:

| | Before | After |
|---|---|---|
| Project descriptions in visible HTML | 1 / 23 | **23 / 23** |
| `highlights` (the citable claims) in HTML | 0 / 23 | **23 / 23** |
| `shortDescription` in HTML | 0 / 23 | **23 / 23** |
| Visible words on the page | 946 | **5,028** |
| Heading structure | h1:1 h2:6 h3:1 | h1:1 h2:6 h3:2 **h4:23 h5:23** |
| HTML size | 198 KB | 257 KB |

The heading row matters as much as the word count: the page went from three
heading levels to five, giving an extractor 46 new labelled anchors where it
previously had a flat wall. That also closes the "only one `<h3>`" note below.

Two data typos surfaced once the durations became visible — `"1 months"` and
`"1 weeks"`, both sheet-era — and are corrected in `portfolio.json`.

Verified in a real browser against `next start`: 0 console errors, 0 hydration
warnings, no horizontal overflow at 390px, correct in both themes, and the
filter keeps stack and index in sync (Computer Vision → 2 cards, 2 entries).

### Smaller open items found in the same pass

- **16 of 17 `<img>` have `alt=""`.** Correct for the card-stack thumbnails
  (the wrapping button carries `aria-label`, so alt text would double-announce),
  but it means Google Images has nothing to index for any project or
  certificate. A descriptive `alt` on the certificate images specifically would
  be a free win.
- **No `width`/`height` on any `<img>`.** Every image is unsized, so each one is
  a CLS contribution as it loads. Cheapest Core Web Vitals fix available here.
- ~~**One `<h3>` on the whole page.**~~ Closed by §7 — the index adds 23 `h4`
  and 23 `h5`, so the page now runs h1→h5.

---

## Top 5 highest-impact remaining changes

Items 1 and 4 are now done; 2, 3 and 5 need work outside the codebase.

1. ~~**Set `NEXT_PUBLIC_SITE_URL`.**~~ **Done.** The production domain is
   `https://portfolio.fauzanahsan.my.id` (verified live, `200`). It is set in
   `.env.local` and is now also the hardcoded fallback in `src/lib/site.js`, so
   a build that forgets the variable still emits correct URLs rather than
   poisoning them. Canonical, `og:url`, `og:image`, all four schema `@id`s, the
   sitemap and robots.txt were re-verified against the new origin.

   The old `https://fauzan-a25.github.io` was returning **404** at the root, so
   every canonical tag was pointing at a dead URL — which tells Google the real
   page is a duplicate of something that does not exist. It survives in the
   data in exactly one place, as the `demoUrl` of the GenZ dashboard, and that
   URL is fine: GitHub Pages project sites serve without a user root page
   (checked, `200`).
2. **Build off-site brand mentions.** Ahrefs' 75,000-brand study found brand
   mentions correlate with AI citations ~3× more strongly than backlinks
   (YouTube ≈ 0.737, Domain Rating ≈ 0.266). A portfolio with zero presence on
   Reddit, YouTube or Wikipedia has nothing for an LLM to corroborate. Writing up
   one project (the CSRNet crowd counting or the COPPA risk model) as a post on
   r/MachineLearning or r/datascience, or a short walkthrough video, is worth
   more than any further on-page change here.
3. **Add question-shaped headings and a self-contained answer block.** ~44% of
   AI citations come from the first 30% of a page, and the optimal citable
   passage is 134–167 words. The About section currently opens with a
   third-person bio paragraph. An `<h2>` phrased as a question — *"What does
   Fauzan work on?"* — followed by a 150-word self-contained answer would give
   an extractor a clean block to lift.
4. ~~**Add a projects comparison table.**~~ **Done** — see §7. The full project
   index carries `title`, `shortDescription`, `category`, `year`, `role`,
   `duration`, the full description, `highlights` and `technologies` for all 23
   projects, in the HTML.
5. **Keep `dateModified` moving.** Content under 3 months old is ~3× more likely
   to be cited; pages stale 6+ months lose eligibility. Right now `dateModified`
   is the build timestamp, so a redeploy refreshes it — but that is a technical
   date, not a content date. Editing `portfolio.json` quarterly (a new project,
   a new certification) is what actually earns the freshness signal.

---

## Smaller notes

- **Mixed content language.** `<html lang="en">` and `inLanguage: 'en'`, but a
  good share of the body — experience descriptions, certificate notes — is
  Indonesian. Not wrong enough to break anything, and English is the right
  primary given the audience, but be aware the declaration is approximate. If
  you want to be exact, wrap the Indonesian blocks in `lang="id"`.
- **Where the citable facts already are.** The project descriptions are the
  strongest asset on the page: *"89% accuracy across 3,276 samples"*, *"92%
  accuracy across 10,000+ applications"*. Specific, attributed numbers are
  exactly what gets quoted. Keep writing them that way.
- **`/api/chat` is `Disallow`ed** in robots.txt. Intentional — it is a POST
  endpoint with no indexable content and a per-request model cost.
- **`stats` has two entries, not three.** The sheet's `Stats` rows overrode the
  bundled three, dropping "25 tracked skills"; the freeze preserved what was
  actually rendering. Both surviving entries also still carry `icon` and
  `color` fields (`bi-code-slash`, `#00a8e8`) left over from the Bootstrap-icon
  era, which nothing reads. Worth a tidy while editing the JSON — and "15+
  projects" understates a 23-project list.

---

## Verification commands

```bash
npm run build
npx next start -p 3311

curl -s localhost:3311/robots.txt
curl -s localhost:3311/sitemap.xml
curl -s localhost:3311/llms.txt | head -40
curl -sI localhost:3311/opengraph-image        # image/png, 1200x630
curl -sI localhost:3311/apple-icon             # image/png, 180x180
curl -sI localhost:3311/icon.svg               # image/svg+xml

# How much of the content actually reaches a text extractor:
node -e "const h=require('fs').readFileSync('.next/server/app/index.html','utf8');
const t=h.split('<body')[1].replace(/<script[\s\S]*?<\/script>/g,' ')
 .replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const d=require('./src/data/portfolio.json');
console.log('descriptions in HTML:',
  d.projects.filter(p=>t.includes((p.description||'').slice(0,60))).length,
  '/', d.projects.length);"

# What a JS-less crawler sees:
node -e "const h=require('fs').readFileSync('.next/server/app/index.html','utf8');
const b=h.split('<body')[1].replace(/<script[\s\S]*?<\/script>/g,' ')
 .replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
console.log(b.length, 'chars');"
```
