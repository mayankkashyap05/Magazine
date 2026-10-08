// media.mjs — process art-directed source plates into responsive, optimized derivatives.
// Source of truth lives in media-src/ (gitignored). Derivatives are committed in src/assets/img/.
import sharp from 'sharp';
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'media-src';
const OUT = 'src/assets/img';

const WIDTHS = [640, 1024, 1536];

const SOURCES = [
  'hero-timeline',
  'eniac-room',
  'vacuum-tube',
  'eniac-programmers',
  'bca-launchpad',
  'cybersecurity',
  'youth-ai',
  'gaming-brain',
  'silicon-detail',
  'terminal-lab',
  'analytical-engine',
  'network',
];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const jobs = [];
for (const name of SOURCES) {
  const src = path.join(SRC, `${name}.png`);
  let meta;
  try {
    meta = await sharp(src).metadata();
  } catch {
    console.warn(`skip ${name}: no source`);
    continue;
  }
  for (const w of WIDTHS) {
    if (w > meta.width) continue;
    jobs.push(
      sharp(src)
        .resize({ width: w })
        .webp({ quality: 74, effort: 5 })
        .toFile(path.join(OUT, `${name}-${w}.webp`))
    );
    jobs.push(
      sharp(src)
        .resize({ width: w })
        .jpeg({ quality: 72, mozjpeg: false, progressive: true })
        .toFile(path.join(OUT, `${name}-${w}.jpg`))
    );
  }
}

// Open Graph plate: 1200x630 crop of the lead image.
jobs.push(
  sharp(path.join(SRC, 'hero-timeline.png'))
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 78, progressive: true })
    .toFile(path.join(OUT, 'og.jpg'))
);

await Promise.all(jobs);

// Manifest of available widths + intrinsic sizes, consumed by the build.
const manifest = {};
for (const name of SOURCES) {
  let meta;
  try {
    meta = await sharp(path.join(SRC, `${name}.png`)).metadata();
  } catch {
    continue;
  }
  manifest[name] = {
    w: meta.width,
    h: meta.height,
    widths: WIDTHS.filter((w) => w <= meta.width),
  };
}
await import('node:fs/promises').then((f) =>
  f.writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2))
);
console.log(`media: wrote ${jobs.length} derivatives to ${OUT}`);
