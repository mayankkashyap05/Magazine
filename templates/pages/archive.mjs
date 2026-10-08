// ARCHIVE — the catalogue of Volume 01. No invented back issues.
import { STORIES } from '../../content/stories.mjs';
import { SITE } from '../../content/site.mjs';
import { PLATES } from '../../content/images.mjs';
import { TIMELINE } from '../../content/timeline.mjs';
import { esc, kicker, divider, arrow } from '../ui.mjs';

const CATS = [...new Set(STORIES.map((s) => s.section.label))];

export const archiveBody = () => `<section class="page-head">
  <div class="wrap">
    ${kicker('CATALOGUE', 'ARCHIVE / VOLUME 01')}
    <h1 class="ph-title">THE INDEX.</h1>
    <p class="ph-dek">Issue 001 is the first edition of ENIAC. Everything published so far is listed below — there are no back issues, and none are invented.</p>
  </div>
</section>

<section class="archive-page">
  <div class="wrap">
    ${divider('ISSUES')}
    <div class="issue-record">
      <span class="ir-n mono">${SITE.volume}</span>
      <span class="ir-t">${SITE.issue} — ${SITE.year}</span>
      <span class="ir-d">SIX FEATURES · ${TIMELINE.length} TIMELINE MARKS · ${Object.keys(PLATES).length} PLATES</span>
      <a class="ir-go mono" href="/issue/">OPEN ${arrow}</a>
    </div>

    ${divider('FEATURES')}
    <div class="ar-filter" role="group" aria-label="Filter the index by section">
      <button class="ar-f mono is-on" type="button" data-filter="all" aria-pressed="true">ALL</button>
      ${CATS.map((c) => `<button class="ar-f mono" type="button" data-filter="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join('')}
    </div>
    <div class="ar-head mono" aria-hidden="true">
      <span>NO.</span><span>FEATURE</span><span>SECTION</span><span>REF</span><span>READ</span>
    </div>
    <ol class="ar-list">
      ${STORIES.map(
        (s) => `<li class="ar-row" data-cat="${esc(s.section.label)}">
        <span class="ar-no mono">${esc(s.no)}</span>
        <a class="ar-t" href="/stories/${s.slug}/">${s.title.map(esc).join(' ')}</a>
        <span class="ar-cat mono">${esc(s.section.label)}</span>
        <span class="ar-ref mono">${esc(s.meta.ref)}</span>
        <span class="ar-read mono">${esc(s.meta.read)}</span>
      </li>`
      ).join('')}
    </ol>

    ${divider('PLATES')}
    <ul class="plate-list">
      ${[
        ['FIG. 01', 'THE INSTRUMENTS OF CALCULATION', 'COMMISSIONED', 'P. 02'],
        ['FIG. 02', 'THE ABACUS AND THE DRAFTING TABLE', 'COMMISSIONED', 'P. 04'],
        ['FIG. 01', 'THE MACHINE ROOM, 1946', 'SIGNAL CORPS', 'P. 08'],
        ['FIG. 02', 'VACUUM TUBES', 'COMMISSIONED', 'P. 09'],
        ['FIG. 03', 'PROGRAMMING BY HAND', 'SIGNAL CORPS', 'P. 11'],
        ['FIG. 01', 'THE DRAFTING TABLE', 'COMMISSIONED', 'P. 14'],
        ['FIG. 02', 'SILICON DIE', 'COMMISSIONED', 'P. 16'],
        ['FIG. 01', 'THE ORDINARY CRIME SCENE', 'COMMISSIONED', 'P. 20'],
        ['FIG. 02', 'PUNCHED CARDS', 'COMMISSIONED', 'P. 23'],
        ['FIG. 01', 'THE NEW STUDY DESK', 'COMMISSIONED', 'P. 26'],
        ['FIG. 02', 'THE HOUR THAT DECIDES IT', 'COMMISSIONED', 'P. 29'],
        ['FIG. 01', 'SPECIMEN STUDY — CONTROLLER & BRAIN', 'COMMISSIONED', 'P. 32'],
        ['FIG. 02', 'A UNIVERSITY COMPUTING LABORATORY, 1970s', 'COMMISSIONED', 'TIMELINE'],
        ['FIG. 03', 'A DATA CENTRE AISLE', 'COMMISSIONED', 'TIMELINE'],
      ]
        .map(
          ([n, t, src, ref]) =>
            `<li><span class="pl-n mono">${n}</span><span class="pl-t">${t}</span><span class="pl-src mono">${src}</span><span class="pl-ref mono">${ref}</span></li>`
        )
        .join('')}
    </ul>
    <p class="ar-note mono">PLATES AND SPECIFICATIONS ARE ALSO LISTED IN THE <a href="/colophon/">COLOPHON</a>.</p>
  </div>
</section>`;
