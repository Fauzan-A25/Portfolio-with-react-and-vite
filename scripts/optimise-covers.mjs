/**
 * Shrinks the generated cover PNGs in place.
 *
 * Stitch exports at full quality, but the card renders at roughly 500x384 CSS
 * pixels — so a 1200px-wide source at ~850 KB is about eight times more bytes
 * than the layout can ever use. These are flat UI screenshots with few colours,
 * which palette-quantise extremely well.
 *
 *   node scripts/optimise-covers.mjs
 */

import sharp from 'sharp';
import { readdirSync, statSync, renameSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
const WIDTH = 1000; // 2x the widest the card is ever laid out at

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

let before = 0;
let after = 0;

for (const name of readdirSync(dir)) {
  if (!name.startsWith('cover-') || !name.endsWith('.png')) continue;

  const path = join(dir, name);
  const src = statSync(path).size;
  const tmp = `${path}.tmp`;

  await sharp(path)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .png({ palette: true, quality: 88, effort: 10 })
    .toFile(tmp);

  renameSync(tmp, path);

  const dst = statSync(path).size;
  before += src;
  after += dst;
  console.log(`  ${name.padEnd(28)} ${kb(src).padStart(8)} -> ${kb(dst).padStart(8)}`);
}

console.log(`\ntotal ${kb(before)} -> ${kb(after)}  (${(100 - (after / before) * 100).toFixed(0)}% smaller)`);
