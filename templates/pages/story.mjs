// STORY — the flexible feature template. Layout follows the story, not the reverse.
import { STORIES, storyBySlug } from '../../content/stories.mjs';
import { esc, kicker, picture, arrow, divider } from '../ui.mjs';
import { renderBlocks } from '../blocks.mjs';
import { miniRef } from '../teasers.mjs';

function heroAside(a) {
  if (!a) return '';
  if (a.kind === 'statement') {
    return `<div class="hero-aside hero-aside-st">
    ${a.title ? `<p class="ha-h mono">${esc(a.title)}</p>` : ''}
    <p class="ha-statement">${a.lines.map((l) => `<span>${esc(l)}</span>`).join('')}</p>
  </div>`;
  }
  if (a.kind === 'facts') {
    return `<div class="hero-aside">
    ${a.title ? `<p class="ha-h mono">${esc(a.title)}</p>` : ''}
    <dl class="ha-facts">${a.items
      .map((i) => `<div><dt class="mono">${esc(i.v)}</dt><dd>${esc(i.u)}</dd></div>`)
      .join('')}</dl>
  </div>`;
  }
  return `<div class="hero-aside">
    ${a.title ? `<p class="ha-h mono">${esc(a.title)}</p>` : ''}
    <ol class="ha-list">${a.items
      .map((i, n) => `<li><span class="mono">${String(n + 1).padStart(2, '0')}</span>${esc(i)}</li>`)
      .join('')}</ol>
    ${a.note ? `<p class="ha-note mono">${esc(a.note)}</p>` : ''}
  </div>`;
}

function hero(s) {
  const h = s.hero;
  const caption = `<figcaption><span class="fig-cap">${esc(h.caption ?? '')}</span><span class="fig-credit">${esc(s.meta.plate)}</span></figcaption>`;

  if (h.layout === 'bleed') {
    return `<div class="story-hero story-hero-bleed">
    <figure class="fig fig-bleed ratio-${h.ratio.replace('/', '-')}">
      <div class="fig-media" data-parallax>${picture(h.img, { sizes: '100vw', eager: true })}</div>
      ${caption}
    </figure>
  </div>`;
  }

  const splitClass = h.layout === 'split-right' ? 'hero-split hero-split-rev' : 'hero-split';
  return `<div class="wrap story-hero ${splitClass}">
    <figure class="fig fig-hero ratio-${h.ratio.replace('/', '-')}">
      <div class="fig-media" data-parallax>${picture(h.img, { sizes: '(min-width: 1040px) 52vw, 94vw', eager: true })}</div>
      ${caption}
    </figure>
    ${heroAside(h.aside)}
  </div>`;
}

export function storyBody(s) {
  const i = STORIES.findIndex((x) => x.slug === s.slug);
  const next = STORIES[(i + 1) % STORIES.length];
  const others = STORIES.filter((x) => x.slug !== s.slug && x.slug !== next.slug);

  const head = `<header class="story-head">
    <div class="wrap">
      <div class="story-top mono">
        <span>FEATURE ${esc(s.no)} / 06</span>
        <span class="story-top-c">${esc(s.section.label)} — ${esc(s.runtime.toUpperCase())}</span>
        <span>${esc(s.meta.ref)} · ${esc(s.meta.read)}</span>
      </div>
      <h1 class="story-title">${s.title.map((l) => `<span>${esc(l)}</span>`).join('')}</h1>
      ${s.sub ? `<p class="story-sub">${esc(s.sub)}</p>` : ''}
      <div class="story-head-foot">
        <p class="story-dek">${esc(s.dek)}</p>
        <p class="story-ident mono">${esc(s.ident ?? `${s.section.label} — ISSUE 001 / ${s.meta.ref}`)}</p>
      </div>
    </div>
  </header>`;

  const close = `<section class="story-close">
    <div class="wrap">
      ${divider(`END OF FEATURE ${s.no}`)}
      <p class="close-lines">${s.closing.map((l) => `<span>${esc(l)}</span>`).join('')}</p>
    </div>
  </section>`;

  const nav = `<nav class="story-nav" aria-label="Continue reading">
    <div class="wrap">
      <a class="next-story" href="/stories/${next.slug}/">
        <span class="ns-k mono">NEXT — FEATURE ${esc(next.no)}</span>
        <span class="ns-t">${next.title.map(esc).join(' ')}</span>
        <span class="ns-d">${esc(next.dek)}</span>
      </a>
      <div class="other-stories">
        <p class="mono other-h">ALSO IN ISSUE 001</p>
        ${others.map(miniRef).join('')}
      </div>
    </div>
  </nav>`;

  const sources = s.sources?.length
    ? `<section class="story-sources"><div class="wrap">
      <p class="mono src-h">SOURCES FOR THIS FEATURE</p>
      <ul class="src-list">${s.sources
        .map((id) => `<li><a class="mono" href="/colophon/#${id}">${esc(id.toUpperCase())}</a></li>`)
        .join('')}</ul>
      <p class="src-note mono">FULL REFERENCES IN THE <a href="/colophon/">COLOPHON</a>.</p>
    </div></section>`
    : '';

  return `<div class="progress" data-progress aria-hidden="true" hidden></div>
<article class="story">
  ${head}
  ${hero(s)}
  <div class="wrap story-flow">
    ${renderBlocks(s.blocks)}
  </div>
  ${close}
  ${sources}
  ${nav}
</article>`;
}

export { storyBySlug };
