/**
 * Generates a cover image for every project in portfolio.json whose `image`
 * points at /images/cover-*.svg.
 *
 * These stand in for the screenshots that projects 1-7 have. Rather than
 * dropping in stock art, each cover is built from the project's own metadata —
 * category, year, title, first three technologies — over a motif chosen by
 * category, so the stack reads as one system instead of a grab bag.
 *
 * Deterministic: the same slug always yields the same file, so re-running this
 * never churns the diff.
 *
 *   node scripts/generate-project-covers.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const W = 1000;
const H = 750;
const PAD = 72;

/** Muted accents — saturated enough to separate categories, quiet enough to sit
 *  beside the site's near-monochrome palette. */
const THEME = {
  'Machine Learning': { hue: '#5fb59a', motif: 'network' },
  'Data Science': { hue: '#6f9de8', motif: 'scatter' },
  'Computer Vision': { hue: '#b785d6', motif: 'vision' },
  'Data Visualization': { hue: '#dfa35c', motif: 'charts' },
  'Web Development': { hue: '#67b2d4', motif: 'browser' },
  'Mobile Development': { hue: '#6cc78d', motif: 'phone' },
  Tools: { hue: '#d4836c', motif: 'terminal' },
  Academic: { hue: '#9a9cb2', motif: 'notebook' },
};
const FALLBACK = { hue: '#9a9cb2', motif: 'notebook' };

const SANS = "'Instrument Sans','Segoe UI',system-ui,-apple-system,sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,'Cascadia Code',Consolas,monospace";

/** mulberry32 — small, seeded, good enough to jitter a motif reproducibly. */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const seedOf = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const n = (v) => Math.round(v * 100) / 100;

/**
 * Greedy wrap using an estimated advance width. SVG has no text measurement,
 * so this errs narrow: a line that wraps early looks fine, one that overflows
 * the card does not.
 */
function wrap(text, size, maxWidth, maxLines) {
  const per = size * 0.54;
  const lines = [];
  let line = '';

  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length * per > maxWidth && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines - 1) break;
    } else {
      line = next;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

/* ---------------------------------------------------------------- motifs --
   Each returns a fragment drawn in the accent hue at low opacity, occupying
   the upper-right of the card where no text lands. */

const motifs = {
  // Scatter with a fitted trend line — regression, the everyday shape of DS.
  scatter(r, hue) {
    const x0 = 560;
    const y0 = 150;
    const w = 370;
    const h = 300;
    let pts = '';
    for (let i = 0; i < 34; i++) {
      const t = r();
      const x = x0 + t * w;
      const y = y0 + h - (t * h * 0.72 + (r() - 0.5) * h * 0.42) - h * 0.12;
      pts += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(3 + r() * 3.5)}" fill="${hue}" opacity="${n(0.22 + r() * 0.4)}"/>`;
    }
    return `${pts}<line x1="${x0}" y1="${y0 + h - 40}" x2="${x0 + w}" y2="${y0 + 46}" stroke="${hue}" stroke-width="2" opacity=".5"/>`;
  },

  // Layered nodes and edges — a feed-forward net seen edge-on.
  network(r, hue) {
    const cols = [600, 730, 860];
    const counts = [4, 5, 3];
    const nodes = cols.map((x, c) =>
      Array.from({ length: counts[c] }, (_, i) => ({
        x,
        y: 170 + (i + 0.5) * (280 / counts[c]) + (r() - 0.5) * 14,
      })),
    );
    let out = '';
    for (let c = 0; c < nodes.length - 1; c++) {
      for (const a of nodes[c]) {
        for (const b of nodes[c + 1]) {
          out += `<line x1="${n(a.x)}" y1="${n(a.y)}" x2="${n(b.x)}" y2="${n(b.y)}" stroke="${hue}" stroke-width="1" opacity="${n(0.08 + r() * 0.16)}"/>`;
        }
      }
    }
    for (const layer of nodes) {
      for (const p of layer) {
        out += `<circle cx="${n(p.x)}" cy="${n(p.y)}" r="7" fill="#0f1011" stroke="${hue}" stroke-width="1.8" opacity=".72"/>`;
      }
    }
    return out;
  },

  // Detection boxes with corner brackets — what a CV model draws on a frame.
  vision(r, hue) {
    const frame = `<rect x="570" y="150" width="370" height="290" rx="10" fill="none" stroke="${hue}" stroke-width="1.4" opacity=".28"/>`;
    let boxes = '';
    for (let i = 0; i < 4; i++) {
      const w = 70 + r() * 90;
      const h = 70 + r() * 90;
      const x = 590 + r() * (330 - w);
      const y = 168 + r() * (254 - h);
      const b = Math.min(w, h) * 0.28;
      const o = n(0.34 + r() * 0.34);
      boxes +=
        `<g opacity="${o}" stroke="${hue}" stroke-width="2.2" fill="none" stroke-linecap="square">` +
        `<path d="M${n(x)} ${n(y + b)}V${n(y)}h${n(b)}"/>` +
        `<path d="M${n(x + w - b)} ${n(y)}h${n(b)}v${n(b)}"/>` +
        `<path d="M${n(x + w)} ${n(y + h - b)}V${n(y + h)}h-${n(b)}"/>` +
        `<path d="M${n(x + b)} ${n(y + h)}h-${n(b)}v-${n(b)}"/>` +
        `</g>`;
    }
    return frame + boxes;
  },

  // Columns plus a trend overlay — a dashboard reduced to its silhouette.
  charts(r, hue) {
    const base = 440;
    let bars = '';
    let path = '';
    for (let i = 0; i < 9; i++) {
      const x = 580 + i * 40;
      const h = 40 + r() * 210;
      bars += `<rect x="${x}" y="${n(base - h)}" width="24" height="${n(h)}" rx="3" fill="${hue}" opacity="${n(0.2 + r() * 0.38)}"/>`;
      path += `${i ? 'L' : 'M'}${x + 12} ${n(base - h - 26)}`;
    }
    return `${bars}<path d="${path}" fill="none" stroke="${hue}" stroke-width="2.4" opacity=".62" stroke-linejoin="round"/>`;
  },

  // Browser chrome over a content grid.
  browser(r, hue) {
    let blocks = '';
    const rows = [
      [596, 236, 150],
      [596, 274, 96],
      [596, 312, 132],
      [756, 236, 170],
      [756, 292, 118],
      [596, 356, 310],
    ];
    for (const [x, y, w] of rows) {
      blocks += `<rect x="${x}" y="${y}" width="${w}" height="14" rx="7" fill="${hue}" opacity="${n(0.2 + r() * 0.3)}"/>`;
    }
    return (
      `<rect x="578" y="152" width="352" height="290" rx="14" fill="none" stroke="${hue}" stroke-width="1.6" opacity=".4"/>` +
      `<line x1="578" y1="200" x2="930" y2="200" stroke="${hue}" stroke-width="1.6" opacity=".4"/>` +
      `<circle cx="602" cy="176" r="5" fill="${hue}" opacity=".55"/>` +
      `<circle cx="620" cy="176" r="5" fill="${hue}" opacity=".38"/>` +
      `<circle cx="638" cy="176" r="5" fill="${hue}" opacity=".26"/>` +
      `<rect x="664" y="168" width="200" height="16" rx="8" fill="${hue}" opacity=".16"/>` +
      blocks
    );
  },

  // Phone outline with a list of rows.
  phone(r, hue) {
    let rows = '';
    for (let i = 0; i < 5; i++) {
      rows +=
        `<rect x="710" y="${232 + i * 42}" width="${n(76 + r() * 78)}" height="12" rx="6" fill="${hue}" opacity="${n(0.22 + r() * 0.32)}"/>` +
        `<circle cx="${694}" cy="${238 + i * 42}" r="9" fill="none" stroke="${hue}" stroke-width="1.6" opacity=".4"/>`;
    }
    return (
      `<rect x="666" y="140" width="216" height="320" rx="26" fill="none" stroke="${hue}" stroke-width="1.8" opacity=".45"/>` +
      `<rect x="744" y="156" width="60" height="8" rx="4" fill="${hue}" opacity=".4"/>` +
      `<rect x="690" y="186" width="168" height="24" rx="6" fill="${hue}" opacity=".14"/>` +
      rows
    );
  },

  // Terminal window mid-session.
  terminal(r, hue) {
    let lines = '';
    for (let i = 0; i < 6; i++) {
      const y = 232 + i * 34;
      lines +=
        `<text x="600" y="${y}" font-family="${MONO}" font-size="17" fill="${hue}" opacity=".5">$</text>` +
        `<rect x="620" y="${y - 12}" width="${n(90 + r() * 200)}" height="12" rx="6" fill="${hue}" opacity="${n(0.16 + r() * 0.3)}"/>`;
    }
    return (
      `<rect x="578" y="152" width="352" height="290" rx="14" fill="none" stroke="${hue}" stroke-width="1.6" opacity=".4"/>` +
      `<line x1="578" y1="196" x2="930" y2="196" stroke="${hue}" stroke-width="1.6" opacity=".4"/>` +
      `<circle cx="602" cy="174" r="5" fill="${hue}" opacity=".5"/>` +
      `<circle cx="620" cy="174" r="5" fill="${hue}" opacity=".34"/>` +
      lines +
      `<rect x="620" y="${232 + 6 * 34 - 12}" width="14" height="14" fill="${hue}" opacity=".6"/>`
    );
  },

  // Stacked notebook cells, the shape of every assignment in this list.
  notebook(r, hue) {
    let cells = '';
    for (let i = 0; i < 4; i++) {
      const y = 160 + i * 74;
      const h = 54;
      cells +=
        `<rect x="596" y="${y}" width="334" height="${h}" rx="8" fill="${hue}" opacity="${n(0.05 + r() * 0.05)}" stroke="${hue}" stroke-width="1.2" stroke-opacity=".28"/>` +
        `<text x="612" y="${y + 33}" font-family="${MONO}" font-size="14" fill="${hue}" opacity=".5">[${i + 1}]</text>` +
        `<rect x="654" y="${y + 15}" width="${n(80 + r() * 180)}" height="10" rx="5" fill="${hue}" opacity="${n(0.2 + r() * 0.28)}"/>` +
        `<rect x="654" y="${y + 33}" width="${n(50 + r() * 120)}" height="10" rx="5" fill="${hue}" opacity="${n(0.12 + r() * 0.2)}"/>`;
    }
    return cells;
  },
};

function cover(project) {
  const { hue, motif } = THEME[project.category] || FALLBACK;
  const r = rng(seedOf(project.slug));
  const id = project.slug.replace(/[^a-z0-9]/gi, '');

  const titleSize = project.title.length > 34 ? 50 : 58;
  const titleLines = wrap(project.title, titleSize, W - PAD * 2, 3);
  const lead = titleSize * 1.16;
  // Anchor the title block to the bottom so cards with 1, 2 or 3 lines all
  // share the same baseline for the tech row beneath them.
  const titleTop = H - PAD - 62 - (titleLines.length - 1) * lead;

  const tech = (project.technologies || []).slice(0, 3).join('  ·  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(project.title)}">
  <defs>
    <linearGradient id="bg${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#141517"/>
      <stop offset="1" stop-color="#0b0b0c"/>
    </linearGradient>
    <radialGradient id="glow${id}" cx="0.78" cy="0.26" r="0.62">
      <stop offset="0" stop-color="${hue}" stop-opacity=".16"/>
      <stop offset="1" stop-color="${hue}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid${id}" width="50" height="50" patternUnits="userSpaceOnUse">
      <path d="M50 0H0V50" fill="none" stroke="#ffffff" stroke-opacity=".035" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg${id})"/>
  <rect width="${W}" height="${H}" fill="url(#grid${id})"/>
  <rect width="${W}" height="${H}" fill="url(#glow${id})"/>

  <g>${motifs[motif](r, hue)}</g>

  <text x="${PAD}" y="${PAD + 6}" font-family="${MONO}" font-size="19" letter-spacing="3.4" fill="${hue}" opacity=".92">${esc(project.category.toUpperCase())}</text>
  <text x="${W - PAD}" y="${PAD + 6}" text-anchor="end" font-family="${MONO}" font-size="19" letter-spacing="1.6" fill="#8a8b8f">${esc(project.year)}</text>
  <line x1="${PAD}" y1="${PAD + 30}" x2="${W - PAD}" y2="${PAD + 30}" stroke="#ffffff" stroke-opacity=".1" stroke-width="1"/>

  <rect x="${PAD}" y="${n(titleTop - titleSize * 0.78 - 18)}" width="46" height="3" fill="${hue}"/>
${titleLines
  .map(
    (l, i) =>
      `  <text x="${PAD}" y="${n(titleTop + i * lead)}" font-family="${SANS}" font-size="${titleSize}" font-weight="600" fill="#f3f3f4" letter-spacing="-.6">${esc(l)}</text>`,
  )
  .join('\n')}

  <text x="${PAD}" y="${H - PAD + 4}" font-family="${MONO}" font-size="19" letter-spacing=".6" fill="#8a8b8f">${esc(tech)}</text>
</svg>
`;
}

const portfolioPath = join(root, 'src/data/portfolio.json');
const portfolio = JSON.parse(readFileSync(portfolioPath, 'utf8'));

let written = 0;
for (const project of portfolio.projects) {
  const image = project.image || '';
  // Only ever regenerate our own SVGs. Once an entry is repointed at a real
  // screenshot or a generated .png, this script must leave it alone.
  if (!image.startsWith('/images/cover-') || !image.endsWith('.svg')) continue;

  writeFileSync(join(root, 'public', image), cover(project), 'utf8');
  console.log(`  ${image}  ${project.category}`);
  written++;
}

console.log(`\n${written} cover${written === 1 ? '' : 's'} written.`);
