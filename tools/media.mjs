// media.mjs — art-directed plates → responsive, optimized derivatives.
//
// Source of truth: media-src/<name>.png (or .jpg). Originals are large and
// gitignored; the processed derivatives in src/assets/img/ are committed, so a
// fresh clone builds and deploys without the originals.
//
// For plates whose master is not present (contributor-supplied sets), the
// pipeline reuses the committed derivatives and simply refreshes the manifest.
import sharp from 'sharp';
import { mkdir, rm, writeFile, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'media-src';
const OUT = 'src/assets/img';
const WIDTHS = [640, 1024, 1536];

const SOURCES = [
  'hero-timeline',
  'abacus-detail',
  'punched-cards',
  'eniac-room',
  'eniac-programmers',
  'vacuum-tube',
  'silicon-detail',
  'terminal-lab',
  'data-hall',
  'bca-launchpad',
  'cybersecurity',
  'youth-ai',
  'youth-night',
  'gaming-brain',
  'controller-plate',
];

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

await mkdir(OUT, { recursive: true });

let written = 0;
const manifest = {};

for (const name of SOURCES) {
  const candidates = [`${name}.png`, `${name}.jpg`, `${name}.jpeg`].map((f) => path.join(SRC, f));
  const master = (await Promise.all(candidates.map(async (c) => ((await exists(c)) ? c : null)))).find(Boolean);

  if (master) {
    const meta = await sharp(master).metadata();
    const widths = WIDTHS.filter((w) => w <= meta.width);
    for (const w of widths) {
      await sharp(master).resize({ width: w }).webp({ quality: 76, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.webp`));
      await sharp(master).resize({ width: w }).jpeg({ quality: 76, progressive: true, mozjpeg: false }).toFile(path.join(OUT, `${name}-${w}.jpg`));
      written += 2;
    }
  } else {
    console.log(`kept ${name}: committed derivatives only`);
  }

  // Manifest records the widths that actually exist, and the intrinsic size of
  // the largest derivative — which is what the build uses as the <img> fallback.
  const found = [];
  for (const w of WIDTHS) {
    if (await exists(path.join(OUT, `${name}-${w}.jpg`))) found.push(w);
  }
  if (!found.length) {
    console.warn(`skip ${name}: no master and no derivatives`);
    continue;
  }
  const largest = found[found.length - 1];
  const m = await sharp(path.join(OUT, `${name}-${largest}.jpg`)).metadata();
  manifest[name] = { w: m.width, h: m.height, widths: found };
}

// Open Graph plate.
const ogMaster = (await exists(path.join(SRC, 'hero-timeline.png'))) ? path.join(SRC, 'hero-timeline.png') : null;
if (ogMaster) {
  await sharp(ogMaster).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80, progressive: true }).toFile(path.join(OUT, 'og.jpg'));
  written++;
}

await writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`media: ${written} derivatives written, ${Object.keys(manifest).length} plates in manifest → ${OUT}`);
