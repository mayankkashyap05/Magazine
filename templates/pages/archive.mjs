// ARCHIVE — library catalogue + magazine index. No invented back-issues.
import { STORIES } from '../../content/stories.mjs';
import { SITE } from '../../content/site.mjs';
import { esc, kicker } from '../ui.mjs';

export const archiveBody = () => `
<section class="page-head">
  <div class="wrap">
    ${kicker('CATALOGUE', 'ARCHIVE / VOLUME 01')}
    <h1 class="ph-title">THE INDEX.</h1>
    <p class="ph-dek">Issue 001 is the first edition. The complete collection is below — no back issues exist yet, and none are invented.</p>
  </div>
</section>
<section class="archive-page">
  <div class="wrap">
    <div class="ar-filter mono" role="group" aria-label="Filter the index by category">
      <button class="ar-f is-on" data-filter="all" aria-pressed="true">ALL</button>
      ${['HISTORY', '1946', 'EDUCATION', 'SECURITY', 'FUTURE', 'BEHAVIOR'].map((c) => `<button class="ar-f" data-filter="${c}" aria-pressed="false">${c}</button>`).join('')}
    </div>
    <div class="ar-head mono" aria-hidden="true"><span>NO.</span><span>STORY</span><span>CATEGORY</span><span>REF</span><span>READ</span></div>
    <ol class="ar-list">
      ${STORIES.map(
        (s) => `<li class="ar-row" data-cat="${esc(s.category)}">
        <span class="ar-no mono">${s.no}</span>
        <a class="ar-t" href="/stories/${s.slug}/">${s.title.map((l) => esc(l)).join(' ')}</a>
        <span class="ar-cat mono">${esc(s.category)}</span>
        <span class="ar-ref mono">${esc(s.ref)}</span>
        <span class="ar-read mono">${esc(s.read)}</span>
      </li>`
      ).join('')}
    </ol>
    <div class="ar-plates">
      <p class="sec-note mono">PLATES IN THIS VOLUME</p>
      <ul class="plate-list">
        ${[
          ['FIG. 01', 'CATALOGUE PLATE — INSTRUMENTS OF CALCULATION', 'P. 02'],
          ['FIG. 01', 'THE MACHINE ROOM — 1946', 'P. 08'],
          ['FIG. 02', 'PROGRAMMING BY HAND', 'P. 10'],
          ['FIG. 03', 'VACUUM TUBES', 'P. 11'],
          ['FIG. 01', 'THE DRAFTING TABLE', 'P. 14'],
          ['FIG. 01', 'THE ORDINARY CRIME SCENE', 'P. 20'],
          ['FIG. 01', 'THE NEW STUDY DESK', 'P. 26'],
          ['FIG. 01', 'SPECIMEN STUDY — CONTROLLER & BRAIN', 'P. 32'],
        ]
          .map(
            ([n, t, r]) => `<li><span class="mono">${n}</span><span>${t}</span><span class="mono">${r}</span></li>`
          )
          .join('')}
      </ul>
    </div>
  </div>
</section>`;
