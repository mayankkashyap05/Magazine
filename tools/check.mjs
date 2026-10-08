// check.mjs — static QA for the built issue.
// Verifies: internal links & anchors, asset references, headings and alt text,
// meta tags, HTML tag balance, CSS parse health, and class coverage between the
// stylesheet and the rendered markup. Exits non-zero on any problem.
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';
const files = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (e.name.endsWith('.html')) files.push(p);
  }
}
await walk(DIST);

const exists = async (p) => {
  try {
    const s = await stat(p);
    if (s.isDirectory()) await stat(path.join(p, 'index.html'));
    return true;
  } catch {
    return false;
  }
};

let problems = 0;
const report = (file, msg) => {
  problems++;
  console.log(`✗ ${file}: ${msg}`);
};
const warn = (msg) => console.log(`· ${msg}`);

/* ---------------------------------------------------------------- CSS health */
const css = await readFile(path.join(DIST, 'assets/style.css'), 'utf8');

// brace balance
let depth = 0;
let line = 1;
let firstUnbalanced = null;
for (const ch of css) {
  if (ch === '\n') line++;
  if (ch === '{') depth++;
  if (ch === '}') {
    depth--;
    if (depth < 0 && firstUnbalanced === null) firstUnbalanced = line;
  }
}
if (depth !== 0 || firstUnbalanced) report('style.css', `unbalanced braces (end depth ${depth}${firstUnbalanced ? `, stray } on line ${firstUnbalanced}` : ''})`);

// declarations that look unfinished
for (const m of css.matchAll(/[a-z-]+\s*:\s*;/g)) report('style.css', `empty declaration near "${m[0]}"`);

// classes defined in the stylesheet
const defined = new Set();
for (const m of css.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) defined.add(m[1]);

/* ------------------------------------------------------- HTML structure pass */
const used = new Set();
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr', 'path', 'circle', 'line', 'rect', 'text', 'g', 'marker', 'use', 'stop', 'polygon', 'polyline', 'ellipse', 'tspan']);

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const body = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');

  // 1. links
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(href) || href.startsWith('#')) {
      if (href.startsWith('#') && href.length > 1 && !html.includes(`id="${href.slice(1)}"`)) {
        report(file, `missing local anchor ${href}`);
      }
      continue;
    }
    const [p, hash] = href.split('#');
    if (!(await exists(path.join(DIST, p.replace(/^\//, ''))))) {
      report(file, `broken link ${href}`);
    } else if (hash) {
      const target = path.join(DIST, p.replace(/^\//, ''), p.endsWith('/') ? 'index.html' : '');
      const th = await readFile(target, 'utf8');
      if (!th.includes(`id="${hash}"`)) report(file, `missing anchor #${hash} in ${href}`);
    }
  }

  // 2. assets
  for (const m of html.matchAll(/(?:src|srcset)="([^"]+)"/g)) {
    for (const ref of m[1].split(',').map((s) => s.trim().split(' ')[0])) {
      if (!ref || /^(https?:|data:)/.test(ref)) continue;
      if (!(await exists(path.join(DIST, ref.replace(/^\//, ''))))) report(file, `missing asset ${ref}`);
    }
  }

  // 3. headings
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) report(file, `h1 count = ${h1}`);
  const order = [...html.matchAll(/<h([1-4])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < order.length; i++) {
    if (order[i] - order[i - 1] > 1) {
      report(file, `heading jump h${order[i - 1]} → h${order[i]}`);
      break;
    }
  }

  // 4. images
  for (const m of html.matchAll(/<img(?![^>]*\salt=)[^>]*>/g)) report(file, 'img without alt');
  for (const m of html.matchAll(/<img(?![^>]*\swidth=)[^>]*>/g)) report(file, 'img without width (layout shift risk)');
  for (const m of html.matchAll(/<img[^>]*alt=""/g)) report(file, 'img with empty alt');

  // 5. document head
  if (!/<title>/.test(html)) report(file, 'no title');
  if (!/name="description"/.test(html)) report(file, 'no meta description');
  if (!/name="viewport"/.test(html)) report(file, 'no viewport');
  if (!/lang="en"/.test(html)) report(file, 'no lang attribute');

  // 6. tag balance
  const stack = [];
  for (const m of body.matchAll(/<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>/g)) {
    const [, close, tagRaw, attrs, selfClose] = m;
    const tag = tagRaw.toLowerCase();
    if (tag === 'svg' && !close) stack.push(tag);
    else if (VOID.has(tag) || selfClose === '/' || attrs.endsWith('/')) continue;
    else if (!close) stack.push(tag);
    else {
      const open = stack.pop();
      if (open !== tag) {
        report(file, `tag mismatch: expected </${open}> but found </${tag}>`);
        break;
      }
    }
  }
  if (stack.length) report(file, `unclosed tags: ${stack.slice(-4).join(', ')}`);

  // 7. duplicate ids
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) report(file, `duplicate id(s): ${[...new Set(dupes)].join(', ')}`);

  // 8. ARIA and label references must resolve to real ids
  const idSet = new Set(ids);
  for (const attr of ['aria-labelledby', 'aria-describedby', 'aria-controls', 'for']) {
    for (const m of html.matchAll(new RegExp(`${attr}="([^"]+)"`, 'g'))) {
      for (const ref of m[1].split(/\s+/)) {
        if (ref && !idSet.has(ref)) report(file, `${attr} points at missing id "${ref}"`);
      }
    }
  }

  // 8b. interactive elements need an accessible name
  for (const m of html.matchAll(/<button([^>]*)>([\s\S]*?)<\/button>/g)) {
    const [, attrs, inner] = m;
    const text = inner.replace(/<[^>]+>/g, '').trim();
    if (!text && !/aria-label=/.test(attrs)) report(file, 'button without an accessible name');
  }

  // 8c. lazy-loaded images must have intrinsic size (checked above) and every
  // picture should offer a webp source
  for (const m of html.matchAll(/<picture[^>]*>([\s\S]*?)<\/picture>/g)) {
    if (!m[1].includes('image/webp')) report(file, 'picture without a webp source');
  }

  // 9. classes used, for coverage
  for (const m of html.matchAll(/class="([^"]+)"/g)) m[1].split(/\s+/).filter(Boolean).forEach((c) => used.add(c));

  // 10. inline style escape hatch — flag any that should live in the stylesheet
  const inline = [...html.matchAll(/style="([^"]*)"/g)].map((m) => m[1]);
  inline.forEach((s) => {
    // data-driven geometry (bar widths, axis offsets) belongs inline; layout does not
    if (!/^(width:|left:|transform:|--)/.test(s)) warn(`${file}: inline style "${s}"`);
  });
}

/* --------------------------------------------------------- class coverage */
/* Classes that exist as structural hooks, state flags or component variants with
   no styles of their own. Listing them keeps the report honest. */
const HOOKS = new Set([
  'ar-list', 'band-game', 'band-lead', 'band-runway', 'band-text', 'band-youth', 'blk-chain', 'blk-edge',
  'blk-exhibits', 'blk-fig', 'blk-ladder', 'blk-list', 'blk-loop', 'blk-pair', 'blk-protocol', 'blk-roster',
  'blk-rows', 'blk-tlindex', 'col-aside', 'col-main', 'colophon-page', 'cy-body', 'cy-fig', 'fig-bleed',
  'foot-col-id', 'game-diagram', 'game-text', 'lrow-body', 'menu-foot-r', 'no-js', 'note-body', 'page-head-tl',
  'runway', 'runway-line-item', 'story', 'story-page', 'teases-home', 'timeline-page', 'topic-plates',
  'topic-tl', 'topics-index', 'ts-lab', 'ts-lab-r', 'youth-fig', 'prose', 'gallery', 'marks', 'mark',
  'mark-v', 'mark-u', 'mark-n', 'reveal', 'reveal-d1', 'reveal-d2', 'is-in', 'is-on', 'js',
]);

const usedList = [...used].sort();
const missing = usedList.filter((c) => !defined.has(c) && !HOOKS.has(c));
if (missing.length) {
  console.log(`\nclasses used in markup but not defined in the stylesheet (${missing.length}):`);
  console.log('  ' + missing.join(', '));
} else {
  console.log(`coverage: all ${usedList.length} classes in use are defined in style.css`);
}

const unusedDefined = [...defined].filter((c) => !used.has(c));
const skipPrefixes = ['ratio-', 'g-', 'tone-', 'lay-', 'reveal', 'js', 'no-js', 'is-', 'pace-', 'wm-', 'st-', 'kicker-', 'loop-', 'ax-', 'ch-', 'rw-', 'ld-', 'sb-', 'ts-', 'tl-', 'pl-', 'tn-', 'ir-', 'ar-', 'ci-', 'cm-', 'foot-', 'final-', 'menu-', 'mh-', 'note-', 'band-', 'hero-', 'fig-', 'spec-', 'lrow-', 'prow-', 'roster-', 'pair-', 'runway-', 'edge-', 'protocol-', 'exhibit-', 'src-', 'ns-', 'other-', 'miniref-', 'tease-', 'six-', 'cy-', 'yp-', 'youth-', 'game-', 'ha-', 'pull-', 'st', 'acc-', 'im-'];
const unused = unusedDefined.filter((c) => !HOOKS.has(c) && !skipPrefixes.some((p) => c.startsWith(p)));
if (unused.length) warn(`defined but not seen in markup (${unused.length}): ${unused.join(', ')}`);

console.log(
  problems === 0
    ? `check: ${files.length} pages, 0 problems`
    : `check: ${problems} problems across ${files.length} pages`
);
process.exit(problems ? 1 : 0);
