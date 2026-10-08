// TOPICS — the editorial taxonomy.
import { TOPICS } from '../../content/topics.mjs';
import { storyBySlug } from '../../content/stories.mjs';
import { TIMELINE } from '../../content/timeline.mjs';
import { esc, kicker } from '../ui.mjs';
import { tease } from '../teasers.mjs';

export const topicsBody = () => `
<section class="page-head">
  <div class="wrap">
    ${kicker('TAXONOMY', 'TOPICS / SIX LENSES')}
    <h1 class="ph-title">SIX WAYS<br>TO LOOK.</h1>
    <p class="ph-dek">The same history, read through different lenses: machines, learning, risk, culture, and the relationship itself.</p>
  </div>
</section>
<section class="topics-index">
  <div class="wrap">
    <ul class="topic-rows">
      ${TOPICS.map(
        (t, i) => `<li><a class="topic-row" href="/topics/${t.slug}/">
        <span class="tr-n mono">0${i + 1}</span>
        <span class="tr-t">${esc(t.title)}</span>
        <span class="tr-line">${esc(t.line)}</span>
        <span class="tr-c mono">${t.stories.length} ${t.stories.length === 1 ? 'STORY' : 'STORIES'}</span>
      </a></li>`
      ).join('')}
    </ul>
  </div>
</section>`;

export function topicBody(t, i) {
  const nodes = TIMELINE.filter((x) => t.timeline.includes(x.key));
  return `
<section class="page-head">
  <div class="wrap">
    ${kicker(`LENS 0${i + 1}`, 'TOPIC')}
    <h1 class="ph-title">${esc(t.title)}</h1>
    <p class="ph-dek">${esc(t.line)}</p>
  </div>
</section>
<section class="topic-body">
  <div class="wrap">
    <div class="teases">${t.stories.map((slug) => tease(storyBySlug(slug))).join('')}</div>
    <div class="topic-tl">
      <p class="sec-note mono">ON THE TIMELINE</p>
      <ul class="topic-nodes">
        ${nodes.map((n) => `<li><a href="/timeline/#${n.key}"><span class="mono">${esc(n.year)}</span> ${esc(n.title)}</a></li>`).join('')}
      </ul>
    </div>
  </div>
</section>`;
}
