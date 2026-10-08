// STORY — the flexible article template.
import { STORIES, storyBySlug } from '../../content/stories.mjs';
import { esc, kicker, figure, tech } from '../ui.mjs';
import { renderBlock } from '../blocks.mjs';
import { tease } from '../teasers.mjs';

export function storyBody(s) {
  const i = STORIES.findIndex((x) => x.slug === s.slug);
  const next = STORIES[(i + 1) % STORIES.length];
  const others = STORIES.filter((x) => x.slug !== s.slug && x.slug !== next.slug).slice(0, 2);

  const headMeta = `
  <div class="story-meta mono">
    <span>FEATURE ${s.no} / 06</span>
    <span>SYSTEM / ${esc(s.category)}</span>
    <span>READ / ${esc(s.read)}</span>
    <span>${esc(s.ref)}</span>
  </div>`;

  return `
<div class="progress" data-progress hidden></div>
<article class="story">
  <header class="story-head">
    <div class="wrap">
      ${headMeta}
      ${kicker(`FEATURE ${s.no}`, s.category)}
      <h1 class="story-title">${s.title.map((l) => esc(l)).join('<br>')}</h1>
      ${s.sub ? `<p class="story-sub">${esc(s.sub)}</p>` : ''}
      <p class="story-dek">${esc(s.dek)}</p>
      ${s.idline ? `<p class="story-id mono">${esc(s.idline)}</p>` : ''}
    </div>
  </header>
  <div class="wrap story-hero">${figure(s.hero.img, { caption: s.hero.caption, ratio: s.hero.ratio, eager: true, sizes: '(min-width: 900px) 70vw, 94vw' })}</div>
  <div class="wrap story-body">
    ${s.blocks.map(renderBlock).join('\n')}
  </div>
  <section class="story-close">
    <div class="wrap">
      <p class="close-k mono">END OF FEATURE ${s.no}</p>
      <p class="close-lines">${s.closing.map((l) => `<span>${esc(l)}</span>`).join('')}</p>
    </div>
  </section>
  <nav class="story-next" aria-label="Continue reading">
    <a class="next-link" href="/stories/${next.slug}/">
      <span class="next-k mono">NEXT STORY →</span>
      <span class="next-t">${next.title.map((l) => esc(l)).join(' ')}</span>
      <span class="next-d">${esc(next.dek)}</span>
    </a>
    <div class="next-others">
      <p class="next-k mono">FROM THE ARCHIVE</p>
      ${others.map((o) => `<a href="/stories/${o.slug}/"><span class="mono">${o.no}</span> ${o.title.map((l) => esc(l)).join(' ')}</a>`).join('')}
    </div>
  </nav>
</article>`;
}

export { storyBySlug };
