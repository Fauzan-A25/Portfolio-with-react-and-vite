# SEO / GEO Analysis — Portfolio

**Target:** `src/app` (Next.js 16.3 App Router)
**Date:** 2026-08-07
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

Data resolution moved to the server:

- `src/lib/portfolio.js` — `getPortfolioData()` fetches the sheets server-side
  with `next: { revalidate: 3600 }`, merges with the bundled copy, and **never
  throws**; a slow or dead Apps Script degrades to local data.
- `src/utils/mergePortfolioData.js` — the merge logic, extracted so the server
  loader and the client hook produce byte-identical data (no hydration drift).
- `src/app/page.jsx` — now an `async` server component. Passes `initialData`
  down; ISR at 1 hour.
- `src/hooks/usePortfolioData.js` — passes `initialData` straight through when
  present. No second fetch, no loading flash.
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

The LoadingScreen is now effectively dead on the happy path — the server sends a
finished page, so there is nothing to wait for. It stays in the tree as the
fallback for a render with no server data. This is a straight upgrade (content
appears immediately instead of after a round-trip), but it does mean you will
rarely see that screen again.

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

All four endpoints verified over HTTP: `200` with correct content types.

---

## Top 5 highest-impact remaining changes

These are the ones I could not make from the codebase.

1. **Set `NEXT_PUBLIC_SITE_URL` before you deploy.** Right now every canonical
   URL, every `og:url`, every schema `@id`, the sitemap and robots.txt all point
   at `https://fauzan-a25.github.io`. If the live site is a Vercel domain,
   everything above is pointing at the wrong place and the canonical tag alone
   can suppress the real page. This is the single highest-priority item in this
   document.
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
4. **Add a projects comparison table.** Twenty-three projects currently exist
   only as a card stack. A table (project · domain · stack · result) is the
   single most extractable structure for an AI answer, and the data is already
   there — `title`, `category`, `technologies`, and the accuracy figures in the
   descriptions.
5. **Keep `dateModified` moving.** Content under 3 months old is ~3× more likely
   to be cited; pages stale 6+ months lose eligibility. Right now `dateModified`
   is the build timestamp, so a redeploy refreshes it — but that is a technical
   date, not a content date. Updating the sheet quarterly (a new project, a new
   certification) is what actually earns the freshness signal.

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
- **Sheet still missing 3 certification rows** (COMPFEST 16, COMPFEST 17, GELAR
  RASA 2024). They render from the bundled fallback and appear in the schema, so
  nothing is lost — but the sheet is not the full picture.

---

## Verification commands

```bash
npm run build
npx next start -p 3311

curl -s localhost:3311/robots.txt
curl -s localhost:3311/sitemap.xml
curl -s localhost:3311/llms.txt | head -40
curl -sI localhost:3311/opengraph-image        # image/png, 1200x630

# What a JS-less crawler sees:
node -e "const h=require('fs').readFileSync('.next/server/app/index.html','utf8');
const b=h.split('<body')[1].replace(/<script[\s\S]*?<\/script>/g,' ')
 .replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
console.log(b.length, 'chars');"
```
