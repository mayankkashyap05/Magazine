// TIMELINE — the signature sequence. Spacing compresses: acceleration made visible.
import { TIMELINE } from '../../content/timeline.mjs';
import { esc, kicker, picture } from '../ui.mjs';

export const timelineBody = () => `
<section class="page-head">
  <div class="wrap">
    ${kicker('SEQUENCE', 'TIMELINE / 5,000 YEARS IN ONE COLUMN')}
    <h1 class="ph-title">THE<br>ACCELERATION</h1>
    <p class="ph-dek">From the counting board to the learning machine. Notice the gaps: millennia, then centuries, then decades, then years. The compression is the story.</p>
    <p class="ph-note mono">TIMELINE NOT TO SCALE. THE SHRINKING GAPS ARE THE STORY.</p>
    <figure class="fig ratio-3-2 tl-head-fig">
      ${picture('terminal-lab', { eager: true, sizes: '(min-width: 900px) 60vw, 94vw' })}
      <figcaption class="mono">FIG. 01 — A UNIVERSITY COMPUTING LABORATORY, 1970S. THE MACHINE BECOMES A ROOM ANYONE CAN SIT IN.</figcaption>
    </figure>
  </div>
</section>
<section class="tl-page">
  <div class="wrap">
    <ol class="tl tl-full">
      ${TIMELINE.map(
        (t) => `<li class="tl-entry pace-${t.pace}" id="${t.key}">
        <span class="tl-year">${esc(t.year)}</span>
        <span class="tl-node" aria-hidden="true"></span>
        <div class="tl-body">
          <h2 class="tl-title">${esc(t.title)} <span class="tech">${esc(t.tag)}</span></h2>
          <p class="tl-text">${esc(t.body)}</p>
          ${t.img ? `<div class="tl-fig">${picture(t.img, { sizes: '(min-width: 900px) 34vw, 90vw' })}</div>` : ''}
        </div>
      </li>`
      ).join('')}
    </ol>
    <div class="tl-end">
      <p class="tl-end-line">WE BUILT MACHINES TO HELP US THINK.</p>
      <p class="tl-end-line">THE MACHINES LEARNED.</p>
      <p class="tl-end-line tl-end-accent">NOW WE DECIDE HOW WE WANT TO THINK WITH THEM.</p>
    </div>
  </div>
</section>`;
