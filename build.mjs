// build.mjs — static-first build. Content in /content, presentation in /templates.
// Output: dist/ — plain HTML/CSS/JS deployable to any static host.
import { mkdir, writeFile, cp, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { setManifest } from './templates/ui.mjs';
import { page } from './templates/layout.mjs';
import { homeBody } from './templates/pages/home.mjs';
import { storiesBody } from './templates/pages/stories.mjs';
import { storyBody } from './templates/pages/story.mjs';
import { timelineBody } from './templates/pages/timeline.mjs';
import { topicsBody, topicBody } from './templates/pages/topics.mjs';
import { archiveBody } from './templates/pages/archive.mjs';
import { aboutBody } from './templates/pages/about.mjs';
import { notfoundBody } from './templates/pages/notfound.mjs';
import { STORIES } from './content/stories.mjs';
import { TOPICS } from './content/topics.mjs';

const DIST = 'dist';
const manifest = JSON.parse(await readFile('src/assets/img/manifest.json', 'utf8'));
setManifest(manifest);

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

const PAGES = [];

PAGES.push(['index.html', page({
  title: 'BYTE/HUMAN — Computing, AI & Human Innovation',
  desc: 'A retro-minimal editorial magazine about where computing came from, what it has become, and what humans are becoming alongside it.',
  path: '/', body: homeBody(), current: '/',
})]);

PAGES.push(['stories/index.html', page({
  title: 'Stories — BYTE/HUMAN',
  desc: 'Six features: from the abacus to AI, ENIAC, education, cybersecurity, youth and AI, and the gaming brain.',
  path: '/stories/', body: storiesBody(), current: '/stories/',
})]);

for (const s of STORIES) {
  PAGES.push([`stories/${s.slug}/index.html`, page({
    title: `${s.title.join(' ')} — BYTE/HUMAN`,
    desc: s.dek,
    path: `/stories/${s.slug}/`, body: storyBody(s), current: '/stories/',
  })]);
}

PAGES.push(['timeline/index.html', page({
  title: 'Timeline — The Acceleration — BYTE/HUMAN',
  desc: 'From the counting board to the learning machine: 5,000 years of computing in one column. The shrinking gaps are the story.',
  path: '/timeline/', body: timelineBody(), current: '/timeline/',
})]);

PAGES.push(['topics/index.html', page({
  title: 'Topics — BYTE/HUMAN',
  desc: 'Six lenses: computing, AI, education, cybersecurity, culture, human + technology.',
  path: '/topics/', body: topicsBody(), current: '/topics/',
})]);

for (let i = 0; i < TOPICS.length; i++) {
  const t = TOPICS[i];
  PAGES.push([`topics/${t.slug}/index.html`, page({
    title: `${t.title} — Topics — BYTE/HUMAN`,
    desc: t.line,
    path: `/topics/${t.slug}/`, body: topicBody(t, i), current: '/topics/',
  })]);
}

PAGES.push(['archive/index.html', page({
  title: 'Archive — BYTE/HUMAN',
  desc: 'The index of Volume 01: stories, categories, page references and plates.',
  path: '/archive/', body: archiveBody(), current: '/archive/',
})]);

PAGES.push(['about/index.html', page({
  title: 'About — BYTE/HUMAN',
  desc: 'Computing is more than machines. It is a history of human curiosity, problem-solving and invention.',
  path: '/about/', body: aboutBody(), current: '/about/',
})]);

PAGES.push(['404.html', page({
  title: '404 — BYTE/HUMAN',
  desc: 'The requested page could not be located.',
  path: '/404.html', body: notfoundBody(),
})]);

for (const [file, html] of PAGES) {
  const dest = path.join(DIST, file);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, html);
}

await cp('src/assets/img', path.join(DIST, 'img'), { recursive: true });
await mkdir(path.join(DIST, 'assets'), { recursive: true });
await cp('src/assets/style.css', path.join(DIST, 'assets/style.css'));
await cp('src/assets/main.js', path.join(DIST, 'assets/main.js'));
await cp('src/assets/favicon.svg', path.join(DIST, 'favicon.svg'));
await writeFile(path.join(DIST, 'robots.txt'), 'User-agent: *\nAllow: /\n');

console.log(`build: ${PAGES.length} pages → ${DIST}/`);
