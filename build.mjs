// build.mjs — static-first build. Content in /content, presentation in /templates.
// Output: dist/ — plain HTML/CSS/JS, deployable to any static host.
import { mkdir, writeFile, cp, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { setManifest } from './templates/ui.mjs';
import { page } from './templates/layout.mjs';
import { homeBody } from './templates/pages/home.mjs';
import { issueBody } from './templates/pages/issue.mjs';
import { storyBody } from './templates/pages/story.mjs';
import { timelineBody } from './templates/pages/timeline.mjs';
import { topicsBody, topicBody } from './templates/pages/topics.mjs';
import { archiveBody } from './templates/pages/archive.mjs';
import { colophonBody } from './templates/pages/colophon.mjs';
import { notfoundBody } from './templates/pages/notfound.mjs';
import { STORIES } from './content/stories.mjs';
import { TOPICS } from './content/topics.mjs';
import { SITE } from './content/site.mjs';


/* --- a small, conservative CSS minifier ------------------------------------
   String-, url()- and calc()-safe: it strips comments and collapses whitespace
   around structural characters only, so calc(a - b) keeps its required spaces. */
function minifyCss(css) {
  let out = '';
  let i = 0;
  const n = css.length;
  while (i < n) {
    const ch = css[i];
    if (ch === '/' && css[i + 1] === '*') {
      i += 2;
      while (i < n && !(css[i] === '*' && css[i + 1] === '/')) i++;
      i += 2;
      continue;
    }
    if (ch === '"' || ch === "'") {
      const quote = ch;
      out += ch;
      i++;
      while (i < n && css[i] !== quote) {
        if (css[i] === '\\') {
          out += css[i] + (css[i + 1] ?? '');
          i += 2;
          continue;
        }
        out += css[i++];
      }
      out += css[i] ?? '';
      i++;
      continue;
    }
    out += ch;
    i++;
  }
  return out
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};:,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
  // Note: whitespace inside parentheses is left alone on purpose — calc()
  // requires spaces around + and -, so the minifier never touches them.
}

const DIST = 'dist';
const manifest = JSON.parse(await readFile('src/assets/img/manifest.json', 'utf8'));
setManifest(manifest);

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

const PAGES = [];

PAGES.push(['index.html', page({
  title: 'ENIAC — The Machines That Changed How We Think',
  desc: 'ENIAC is a digital magazine about computing, artificial intelligence, security and digital life — from a counting board in Mesopotamia to a model that writes back.',
  url: 'https://eniac.example/',
  body: homeBody(),
  current: ['/'],
})]);

PAGES.push(['issue/index.html', page({
  title: 'This Issue — ENIAC Vol. 01, Issue 001',
  desc: 'The contents of Issue 001: six features, one timeline of fifteen marks, and the editor’s note on why this magazine is named after a thirty-ton machine.',
  url: 'https://eniac.example/issue/',
  body: issueBody(),
  current: ['/issue/'],
})]);

for (const s of STORIES) {
  PAGES.push([`stories/${s.slug}/index.html`, page({
    title: `${s.title.join(' ')} — ENIAC`,
    desc: s.dek,
    url: `https://eniac.example/stories/${s.slug}/`,
    body: storyBody(s),
    current: [s.section.href],
    bodyClass: 'story-page',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: s.title.join(' '),
      description: s.dek,
      articleSection: s.section.label,
      isPartOf: { '@type': 'PublicationIssue', issueNumber: '001', name: 'ENIAC — Vol. 01, Issue 001' },
      publisher: { '@type': 'Organization', name: 'ENIAC' },
      datePublished: '2026',
    },
  })]);
}

PAGES.push(['timeline/index.html', page({
  title: 'The Acceleration — Timeline — ENIAC',
  desc: 'Fifteen milestones from c. 3000 BC to today, plotted on a true scale and a logarithmic scale: the compression of the last century made visible.',
  url: 'https://eniac.example/timeline/',
  body: timelineBody(),
  current: ['/timeline/'],
  bodyClass: 'timeline-page',
})]);

PAGES.push(['topics/index.html', page({
  title: 'Sections — ENIAC',
  desc: 'Five lenses on the same history: Technology, AI, Cyber, Culture and People.',
  url: 'https://eniac.example/topics/',
  body: topicsBody(),
  current: ['/topics/'],
})]);

for (let i = 0; i < TOPICS.length; i++) {
  const t = TOPICS[i];
  PAGES.push([`topics/${t.slug}/index.html`, page({
    title: `${t.title} — ENIAC`,
    desc: t.line,
    url: `https://eniac.example/topics/${t.slug}/`,
    body: topicBody(t, i),
    current: [`/topics/${t.slug}/`],
  })]);
}

PAGES.push(['archive/index.html', page({
  title: 'Archive — ENIAC Volume 01',
  desc: 'The catalogue of Volume 01: issues, features, sections and plates, with page references.',
  url: 'https://eniac.example/archive/',
  body: archiveBody(),
  current: ['/archive/'],
})]);

PAGES.push(['colophon/index.html', page({
  title: 'Colophon — Sources & Specifications — ENIAC',
  desc: 'Every figure printed in Issue 001, with its reference: ENIAC’s 1946 specification, the ENIAC Six, the transistor, the 4004, the web, deep learning and generative AI.',
  url: 'https://eniac.example/colophon/',
  body: colophonBody(),
})]);

PAGES.push(['404.html', page({
  title: 'Page not found — ENIAC',
  desc: 'The requested page could not be located in Volume 01.',
  url: 'https://eniac.example/404.html',
  body: notfoundBody(),
})]);

for (const [file, html] of PAGES) {
  const dest = path.join(DIST, file);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, html);
}

// static assets
await cp('src/assets/img', path.join(DIST, 'img'), { recursive: true });
await mkdir(path.join(DIST, 'assets'), { recursive: true });
const rawCss = await readFile('src/assets/style.css', 'utf8');
const banner = `/* ENIAC — editorial design system. VOL. 01 / ISSUE 001. Built ${new Date().toISOString().slice(0, 10)}. */\n`;
await writeFile(path.join(DIST, 'assets/style.css'), banner + minifyCss(rawCss));
await cp('src/assets/main.js', path.join(DIST, 'assets/main.js'));
await cp('src/assets/favicon.svg', path.join(DIST, 'favicon.svg'));
await writeFile(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: https://eniac.example/sitemap.xml\n`);

// sitemap
const urls = PAGES.map(([file]) => `https://eniac.example/${file.replace(/index\.html$/, '').replace(/404\.html$/, '')}`);
await writeFile(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u}</loc></url>`)
    .join('\n')}\n</urlset>\n`
);

// feed — the issue, in reading order
const items = STORIES.map((s) => `    <item>
      <title>${s.title.join(' ')}</title>
      <link>https://eniac.example/stories/${s.slug}/</link>
      <guid>https://eniac.example/stories/${s.slug}/</guid>
      <category>${s.section.label}</category>
      <description>${s.dek}</description>
    </item>`).join('\n');

await writeFile(path.join(DIST, 'feed.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>ENIAC — ${SITE.volume}, ${SITE.issue}</title>
    <link>https://eniac.example/</link>
    <description>${SITE.statement}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`);

const { statSync } = await import('node:fs');
const kb = (p) => `${(statSync(p).size / 1024).toFixed(1)} KB`;
console.log(`build: ${PAGES.length} pages → ${DIST}/`);
console.log(`  css  ${kb(path.join(DIST, 'assets/style.css'))} (from ${kb('src/assets/style.css')} source)`);
console.log(`  js   ${kb(path.join(DIST, 'assets/main.js'))} · no runtime dependencies`);
