// THE ISSUE — the contents page and editor's note, kept apart from the homepage.
import { SITE } from '../../content/site.mjs';
import { STORIES } from '../../content/stories.mjs';
import { TIMELINE } from '../../content/timeline.mjs';
import { esc, kicker, divider, arrow } from '../ui.mjs';
import { tease } from '../teasers.mjs';

export const issueBody = () => `<section class="page-head">
  <div class="wrap">
    ${kicker('CONTENTS', `${SITE.volume} — ${SITE.issue} / ${SITE.year}`)}
    <h1 class="ph-title">THIS ISSUE.</h1>
    <p class="ph-dek">${esc(SITE.statement)}</p>
    <dl class="ph-facts mono">
      <div><dt>SIX</dt><dd>FEATURES</dd></div>
      <div><dt>${TIMELINE.length}</dt><dd>TIMELINE MARKS</dd></div>
      <div><dt>${TIMELINE.filter((t) => t.img).length}</dt><dd>PLATES IN SEQUENCE</dd></div>
      <div><dt>ONE</dt><dd>QUESTION</dd></div>
    </dl>
  </div>
</section>

<section class="issue-contents">
  <div class="wrap">
    <p class="mono contents-h">CONTENTS — IN ORDER OF READING</p>
    <div class="teases">${STORIES.map((s) => tease(s)).join('')}</div>
  </div>
</section>

<section class="note note-page">
  <div class="wrap note-grid">
    <div class="note-aside">
      ${kicker('§', SITE.editorial.label)}
      <p class="note-file mono">${esc(SITE.editorial.file)}</p>
      <p class="note-sign mono">${esc(SITE.editorial.sign)}</p>
    </div>
    <div class="note-body">
      <h2 class="note-title">${esc(SITE.editorial.title)}</h2>
      <div class="note-cols">
        ${SITE.editorial.paras.map((p) => `<p class="note-p">${esc(p)}</p>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="issue-tail">
  <div class="wrap">
    ${divider('IN THIS VOLUME')}
    <div class="tail-grid">
      <div>
        <h3 class="tail-h">THE ACCELERATION</h3>
        <p class="tail-p">Fifteen marks between a counting board and a model that writes back — plotted on two scales so the compression of the last century is visible.</p>
        <p class="band-link mono"><a class="link-arrow" href="/timeline/">OPEN THE TIMELINE ${arrow}</a></p>
      </div>
      <div>
        <h3 class="tail-h">FIVE SECTIONS</h3>
        <p class="tail-p">Technology, AI, Cyber, Culture and People — the same history read through five different lenses.</p>
        <p class="band-link mono"><a class="link-arrow" href="/topics/">BROWSE THE SECTIONS ${arrow}</a></p>
      </div>
      <div>
        <h3 class="tail-h">SOURCES</h3>
        <p class="tail-p">Every figure printed in this issue is traceable: ENIAC’s specification, the ENIAC Six, the transistor, the 4004, the web, ImageNet, generative AI.</p>
        <p class="band-link mono"><a class="link-arrow" href="/colophon/">READ THE COLOPHON ${arrow}</a></p>
      </div>
    </div>
  </div>
</section>`;
