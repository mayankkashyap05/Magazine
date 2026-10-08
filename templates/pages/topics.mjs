// SECTIONS — the five lenses, and each lens on its own page.
import { TOPICS } from '../../content/topics.mjs';
import { storyBySlug } from '../../content/stories.mjs';
import { TIMELINE } from '../../content/timeline.mjs';
import { esc, kicker, picture, divider, arrow } from '../ui.mjs';
import { tease } from '../teasers.mjs';

export const topicsBody = () => `<section class="page-head">
  <div class="wrap">
    ${kicker('TAXONOMY', 'SECTIONS / FIVE LENSES')}
    <h1 class="ph-title">FIVE WAYS<br>TO READ THE<br>SAME HISTORY.</h1>
    <p class="ph-dek">Nothing in this issue belongs to only one section. The machine is a technology story, a people story and a culture story at once.</p>
  </div>
</section>
<section class="topics-index">
  <div class="wrap">
    <ol class="topic-rows">
      ${TOPICS.map(
        (t, i) => `<li><a class="topic-row" href="/topics/${t.slug}/">
        <span class="tr-n mono">${String(i + 1).padStart(2, '0')}</span>
        <span class="tr-t">${esc(t.title)}</span>
        <span class="tr-line">${esc(t.line)}</span>
        <span class="tr-c mono">${t.stories.length} ${t.stories.length === 1 ? 'FEATURE' : 'FEATURES'}</span>
        <span class="tr-go" aria-hidden="true">${arrow}</span>
      </a></li>`
      ).join('')}
    </ol>
  </div>
</section>`;

export function topicBody(t, i) {
  const nodes = TIMELINE.filter((x) => t.timeline.includes(x.key));
  const stories = t.stories.map((s) => storyBySlug(s));
  return `<section class="page-head">
  <div class="wrap">
    ${kicker(`SECTION ${String(i + 1).padStart(2, '0')}`, `${t.title} / TOPIC`)}
    <h1 class="ph-title">${esc(t.title)}</h1>
    <p class="ph-dek">${esc(t.line)}</p>
  </div>
</section>
<section class="topic-body">
  <div class="wrap">
    <p class="mono contents-h">FEATURES IN THIS SECTION</p>
    <div class="teases">${stories.map((s) => tease(s)).join('')}</div>
  </div>
  <div class="wrap topic-lower">
    <div class="topic-tl">
      ${divider('ON THE TIMELINE')}
      <ul class="topic-nodes">
        ${nodes
          .map(
            (n) => `<li><a href="/timeline/#${n.key}">
          <span class="tn-year mono">${esc(n.year)}</span>
          <span class="tn-title">${esc(n.title)}</span>
          <span class="tn-tag mono">${esc(n.tag)}</span></a></li>`
          )
          .join('')}
      </ul>
    </div>
    <div class="topic-plates">
      ${divider('PLATES')}
      <div class="plate-grid">
        ${t.plates.map((p) => `<figure class="plate-thumb">${picture(p, { sizes: '(min-width: 900px) 20vw, 44vw', cls: 'plate-pic' })}</figure>`).join('')}
      </div>
    </div>
  </div>
</section>`;
}
