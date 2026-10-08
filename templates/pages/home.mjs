// HOME — the editorial front page.
import { SITE } from '../../content/site.mjs';
import { STORIES, storyBySlug } from '../../content/stories.mjs';
import { TIMELINE } from '../../content/timeline.mjs';
import { esc, kicker, figure, picture, stat, tech } from '../ui.mjs';
import { tease } from '../teasers.mjs';

function cover() {
  const index = STORIES.map(
    (s) => `<li><a href="/stories/${s.slug}/"><span class="ci-no mono">${s.no}</span><span class="ci-t">${s.title.map(esc).join(' ')}</span><span class="ci-ref mono">${s.ref}</span></a></li>`
  ).join('');
  return `<section class="cover">
  <div class="wrap">
    <div class="cover-top mono">
      <span>SYSTEM / EDITORIAL</span>
      <span>COMPUTING · AI · HUMAN INNOVATION</span>
      <span>${SITE.volume} / ${SITE.issue}</span>
    </div>
    <h1 class="cover-title">FROM COUNTING<br>TO CREATING.</h1>
    <div class="cover-split">
      <p class="cover-statement">${SITE.statement}</p>
      <div class="cover-index">
        <p class="ci-h mono">IN THIS ISSUE</p>
        <ol>${index}</ol>
      </div>
    </div>
  </div>
</section>`;
}

function lead() {
  const s = storyBySlug('from-computer-to-ai');
  return `<section class="lead">
  <div class="wrap lead-grid">
    <div class="lead-text">
      ${kicker('FEATURE 01', 'LEAD STORY / HISTORY → INTELLIGENCE')}
      <h2 class="lead-title">FROM<br>COMPUTER<br>TO AI</h2>
      <p class="lead-dek">${esc(s.dek)}</p>
      <p class="lead-cta mono"><a href="/stories/from-computer-to-ai/">READ THE FEATURE</a> <span aria-hidden="true">→</span></p>
      <p class="lead-read mono">READ / ${s.read}</p>
    </div>
    ${figure(s.hero.img, { caption: s.hero.caption, eager: true, sizes: '(min-width: 900px) 55vw, 94vw' })}
  </div>
</section>`;
}

function strip() {
  const items = TIMELINE.map(
    (t) => `<li><a href="/timeline/#${t.key}"><span class="strip-y mono">${esc(t.year)}</span><span class="strip-t">${esc(t.title)}</span></a></li>`
  ).join('');
  return `<section class="strip">
  <div class="wrap strip-head">
    ${kicker('§', 'SEQUENCE')}
    <h2 class="strip-title">THE ACCELERATION</h2>
    <a class="strip-link mono" href="/timeline/">FULL TIMELINE <span aria-hidden="true">→</span></a>
  </div>
  <div class="strip-scroll">
    <ol>${items}</ol>
  </div>
</section>`;
}

function eniac() {
  const s = storyBySlug('eniac');
  return `<section class="eniac-band">
  <div class="wrap eniac-grid">
    <div class="eniac-text">
      ${kicker('FEATURE 02', 'THE FOUNDATIONAL MACHINE / 1946')}
      <h2 class="eniac-title">ENIAC</h2>
      <p class="eniac-sub">THE GIANT THAT STARTED THE DIGITAL AGE</p>
      <p class="eniac-dek">Before smartphones, laptops and AI, there was a 30-ton machine that filled a room.</p>
      <p class="lead-cta mono"><a href="/stories/eniac/">READ THE FEATURE</a> <span aria-hidden="true">→</span></p>
    </div>
    <figure class="eniac-fig">
      ${picture('eniac-room', { sizes: '(min-width: 900px) 50vw, 94vw' })}
      <figcaption class="mono">FIG. 01 — THE MACHINE ROOM. 1946.</figcaption>
    </figure>
    <div class="eniac-stats">
      ${stat({ v: '30', u: 'TONS', note: 'THE WEIGHT OF THE MACHINE.' })}
      ${stat({ v: '17,468', u: 'VACUUM TUBES', note: 'ITS GLOWING HEART.' })}
      ${stat({ v: '~1,800', u: 'SQ. FT.', note: 'AN ENTIRE HALL.' })}
      ${stat({ v: '5,000', u: 'ADDITIONS / SEC', note: 'EXTRAORDINARY FOR ITS ERA.' })}
    </div>
  </div>
</section>`;
}

function humanTech() {
  const slugs = ['bca-launchpad', 'cybersecurity', 'young-generation-ai', 'brain-games'];
  return `<section class="humantech">
  <div class="wrap">
    ${kicker('§', 'HUMAN + TECHNOLOGY / THE CONTEMPORARY STORIES')}
    <h2 class="ht-title">THE MACHINE MEETS THE PERSON</h2>
    <div class="teases">
      ${slugs.map((k) => tease(storyBySlug(k))).join('')}
    </div>
  </div>
</section>`;
}

function statementBand() {
  return `<section class="band-statement">
  <div class="wrap">
    <p class="bs-line bs-1">THE FUTURE IS NOT<br>COMPUTER <em>VS.</em> HUMAN.</p>
    <p class="bs-line bs-2">IT IS COMPUTER <span class="plus">+</span> HUMAN.</p>
  </div>
</section>`;
}

function archiveTease() {
  const rows = STORIES.slice(0, 3)
    .map(
      (s) => `<li><span class="ar-no mono">${s.no}</span><a href="/stories/${s.slug}/">${s.title.map(esc).join(' ')}</a><span class="ar-cat mono">${s.category}</span><span class="ar-ref mono">${s.ref}</span></li>`
    )
    .join('');
  return `<section class="archive-tease">
  <div class="wrap">
    ${kicker('§', 'ARCHIVE / INDEX')}
    <ul class="ar-rows">${rows}</ul>
    <a class="strip-link mono" href="/archive/">OPEN THE ARCHIVE <span aria-hidden="true">→</span></a>
  </div>
</section>`;
}

export const homeBody = () =>
  [cover(), lead(), strip(), eniac(), humanTech(), statementBand(), archiveTease()].join('\n');
