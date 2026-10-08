// check.mjs — static QA: internal links, asset refs, headings, alt text, anchors.
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

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const dir = path.dirname(file);

  // internal links
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) continue;
    const [p, hash] = href.split('#');
    const target = p === '' ? file : path.join(DIST, p.replace(/^\//, ''), p.endsWith('/') ? 'index.html' : '');
    if (!(await exists(path.join(DIST, p.replace(/^\//, ''))))) {
      report(file, `broken link ${href}`);
    } else if (hash) {
      // anchor must exist in the target page
      const tp = path.join(DIST, p.replace(/^\//, ''), p.endsWith('/') ? 'index.html' : '');
      const th = await readFile(tp, 'utf8');
      if (!th.includes(`id="${hash}"`)) report(file, `missing anchor #${hash} in ${href}`);
    }
  }

  // assets
  for (const m of html.matchAll(/(?:src|srcset)="([^"]+)"/g)) {
    for (let ref of m[1].split(',').map((s) => s.trim().split(' ')[0])) {
      if (ref.startsWith('http')) continue;
      const p = path.join(DIST, ref.replace(/^\//, ''));
      if (!(await exists(p))) report(file, `missing asset ${ref}`);
    }
  }

  // one h1
  const h1 = (html.match(/<h1/g) || []).length;
  if (h1 !== 1) report(file, `h1 count = ${h1}`);

  // imgs need alt
  for (const m of html.matchAll(/<img(?![^>]*alt=)[^>]*>/g)) report(file, `img without alt`);

  // title & meta description
  if (!/<title>/.test(html)) report(file, 'no title');
  if (!/name="description"/.test(html)) report(file, 'no meta description');
}

console.log(problems === 0 ? `check: ${files.length} pages, 0 problems` : `check: ${problems} problems in ${files.length} pages`);
process.exit(problems ? 1 : 0);
