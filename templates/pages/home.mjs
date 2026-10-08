// HOME — the front cover, the editor's note and six feature movements.
import { SITE } from '../../content/site.mjs';
import { STORIES, storyBySlug } from '../../content/stories.mjs';
import { ENIAC_SPECS, ISSUE_MARKS } from '../../content/marks.mjs';
import { esc, figure, picture, wordmark, statCell, divider, kicker, arrow } from '../ui.mjs';
import { tickStrip, acceleratorChart, loopDiagram, runwaysDiagram } from '../diagrams.mjs';
import { AXIS_CAPTIONS } from '../../content/timeline.mjs';
import { tease } from '../teasers.mjs';

/* ---------- 1. COVER ---------- */
function cover() {
  const index = STORIES.map(
    (s) => `<li><a href="/stories/${s.slug}/">
      <span class="ci-n mono">${s.no}</span>
      <span class="ci-t">${s.title.map(esc).join(' ')}</span>
      <span class="ci-cat mono">${esc(s.section.label)}</span>
      <span class="ci-ref mono">${esc(s.meta.ref)}</span>
      <span class="ci-go" aria-hidden="true">${arrow}</span>
    </a></li>`
  ).join('');

  return `<section class="cover">
  <div class="wrap">
    <div class="cover-strip mono">
      <span>${esc(SITE.fileRef)}</span>
      <span class="cover-strip-c">${esc(SITE.edition)} / ${esc(SITE.year)}</span>
      <span>EST. ON A ROOM-SIZED MACHINE, 1946</span>
    </div>
    <div class="cover-masthead">
      <h1 class="cover-title"><span class="ct-word">ENIAC</span></h1>
      <p class="cover-sub mono">A DIGITAL MAGAZINE ABOUT COMPUTING, TECHNOLOGY &amp; HUMAN INNOVATION</p>
    </div>

    <div class="cover-lower">
      <div class="cover-side">
        <p class="cover-statement">${esc(SITE.coverStatement)}</p>
        <p class="cover-note">${esc(SITE.coverNote)}</p>
        <p class="cover-sig mono">EDITED AT THE ENIAC DESK<span class="cursor" aria-hidden="true">_</span></p>
      </div>
      <div class="cover-marks">
        ${['01', '02', '03']
          .map((n, i) => {
            const m = [ISSUE_MARKS.span, ISSUE_MARKS.end, ISSUE_MARKS.now][i];
            return `<div class="cmark">
        <span class="cmark-n mono">${n}</span>
        <span class="cmark-v" data-count="${esc(m.v)}">${esc(m.v)}</span>
        <span class="cmark-u mono">${esc(m.u)}</span>
        <span class="cmark-note">${esc(m.note)}</span>
      </div>`;
          })
          .join('')}
      </div>
    </div>

    <nav class="cover-index" aria-label="Contents of Issue 001">
      <p class="ci-h mono">IN THIS ISSUE <span class="ci-h-r">SIX FEATURES · ONE QUESTION</span></p>
      <ol class="ci-list">${index}</ol>
    </nav>
    ${tickStrip()}
  </div>
</section>`;
}

/* ---------- 2. COVER PLATE ---------- */
function coverPlate() {
  return `<section class="cover-plate">
  ${figure('hero-timeline', {
    ratio: '16/9',
    eager: true,
    sizes: '100vw',
    caption:
      'FIG. 01 — THE INSTRUMENTS OF CALCULATION, IN ORDER OF APPEARANCE: ABACUS, PASCAL’S CALCULATOR, VACUUM TUBE, CIRCUIT BOARD, SILICON DIE, KEYBOARD, PROCESSOR BOARD. FIVE THOUSAND YEARS, TWO METRES OF TABLE.',
  })}
</section>`;
}

/* ---------- 3. EDITOR'S NOTE ---------- */
function note() {
  const e = SITE.editorial;
  return `<section class="note" aria-labelledby="note-title">
  <div class="wrap note-grid">
    <div class="note-aside">
      ${kicker('§', e.label)}
      <p class="note-file mono">${esc(e.file)}</p>
      <p class="note-sign mono">${esc(e.sign)}</p>
    </div>
    <div class="note-body">
      <h2 class="note-title" id="note-title">${esc(e.title)}</h2>
      <div class="note-cols">
        ${e.paras.map((p, i) => `<p class="note-p${i === 0 ? ' note-p-first' : ''}">${esc(p)}</p>`).join('')}
      </div>
    </div>
  </div>
</section>`;
}

/* ---------- 4. LEAD FEATURE — FROM COMPUTER TO AI ---------- */
function leadBand() {
  const s = storyBySlug('from-computer-to-ai');
  return `<section class="band band-lead" aria-labelledby="lead-title">
  <div class="wrap band-grid band-grid-a">
    <div class="band-text">
      ${kicker(`FEATURE ${s.no}`, `${s.section.label} / ${s.runtime.toUpperCase()}`)}
      <h2 class="band-title band-title-xl" id="lead-title">FROM<br>COMPUTER<br>TO AI</h2>
      <p class="band-dek">${esc(s.dek)}</p>
      <p class="band-link mono"><a class="link-arrow" href="/stories/${s.slug}/">READ THE FEATURE ${arrow}</a></p>
      <p class="band-meta mono">${esc(s.meta.read)} · ${esc(s.meta.ref)}</p>
    </div>
    <div class="band-fig">
      ${figure('abacus-detail', {
        ratio: '4/3',
        sizes: '(min-width: 1040px) 46vw, 94vw',
        caption: 'FIG. 02 — c. 3000 BC. THE FIRST INTERFACE IS A BEAD YOU MOVE WITH A FINGER.',
      })}
    </div>
  </div>
  <div class="wrap band-foot">
    <p class="band-quote">“The history of computing is not a history of machines. It is a history of people refusing to stop asking.”</p>
    <p class="band-quote-s mono">ENIAC, VOL. 01 — FEATURE 01</p>
  </div>
</section>`;
}

/* ---------- 5. THE ACCELERATION ---------- */
function acceleration() {
  return `<section class="band band-acc" aria-labelledby="acc-title">
  <div class="wrap">
    ${kicker('§', 'SEQUENCE / THE ACCELERATION')}
    <h2 class="band-title" id="acc-title">FIVE THOUSAND YEARS,<br>AND THEN A BLUR.</h2>
    <p class="band-dek band-dek-narrow">Plotted honestly, the history of computing is not a line. It is a long quiet shelf and a cliff. Below, the same fifteen milestones are drawn on two scales — the first one true, the second one readable.</p>
  </div>
  <div class="wrap wrap-chart">
    ${acceleratorChart()}
    <div class="chart-legend">
      <p class="legend-p"><span class="legend-k mono">A — TRUE SCALE</span> ${esc(AXIS_CAPTIONS.linear)}</p>
      <p class="legend-p"><span class="legend-k mono">B — LOG SCALE</span> ${esc(AXIS_CAPTIONS.log)}</p>
    </div>
    <p class="chart-link mono"><a class="link-arrow" href="/timeline/">READ THE FULL TIMELINE ${arrow}</a></p>
  </div>
</section>`;
}

/* ---------- 6. THE MACHINE — ENIAC ---------- */
function eniacBand() {
  const s = storyBySlug('eniac');
  return `<section class="band band-eniac" aria-labelledby="eniac-title">
  <div class="eniac-plate">
    ${picture('eniac-room', { sizes: '(min-width: 900px) 78vw, 100vw', cls: 'eniac-img' })}
    <p class="eniac-giant" aria-hidden="true">30<br><span>TONS</span></p>
  </div>
  <div class="wrap">
    <div class="eniac-head">
      ${kicker(`FEATURE ${s.no}`, 'THE FOUNDATIONAL MACHINE / 1946')}
      <h2 class="band-title band-title-huge" id="eniac-title">ENIAC</h2>
      <p class="eniac-sub">THE GIANT THAT STARTED THE DIGITAL AGE</p>
      <p class="band-dek band-dek-mid">${esc(s.dek)}</p>
      <p class="band-link mono"><a class="link-arrow" href="/stories/${s.slug}/">ENTER THE MACHINE ROOM ${arrow}</a></p>
    </div>
    <div class="specs specs-home">
      ${ENIAC_SPECS.slice(0, 6).map(statCell).join('')}
      <p class="specs-note mono">SPECIFICATION PER GOLDSTINE &amp; GOLDSTINE, 1946. FLOOR AREA AND MASS ARE REPORTED AS APPROXIMATE.</p>
    </div>
    <div class="six">
      <div class="six-head">
        <h3 class="six-title">THE ENIAC SIX</h3>
        <p class="six-note">SIX MATHEMATICIANS, HIRED AS “COMPUTERS,” WHO LEARNED THE MACHINE FROM ITS SCHEMATICS AND BECAME ITS FIRST PROGRAMMERS.</p>
      </div>
      <ol class="six-list">
        ${s.blocks
          .find((b) => b.t === 'roster')
          .people.map(
            (p, i) => `<li class="six-item">
          <span class="six-n mono">${String(i + 1).padStart(2, '0')}</span>
          <span class="six-name">${esc(p.name)}</span>
          <span class="six-role">${esc(p.note.split(' · ')[1] ?? 'PROGRAMMER')}</span>
        </li>`
          )
          .join('')}
      </ol>
    </div>
  </div>
</section>`;
}

/* ---------- 7. THE NEXT GENERATION — BCA ---------- */
function runwayBand() {
  const s = storyBySlug('bca-launchpad');
  const rw = s.blocks.find((b) => b.t === 'runways');
  return `<section class="band band-runway" aria-labelledby="rw-title">
  <div class="wrap">
    ${kicker(`FEATURE ${s.no}`, 'EDUCATION / THE LAUNCHPAD')}
    <h2 class="band-title" id="rw-title">THREE RUNWAYS.<br>ONE TAKE-OFF.</h2>
    <p class="band-dek band-dek-narrow">${esc(s.dek)}</p>
  </div>
  <div class="wrap band-runway-grid">
    ${runwaysDiagram(rw.runways)}
    <ol class="runway-lines">
      ${rw.runways
        .map(
          (r) => `<li class="runway-line-item">
        <span class="rl-n mono">${esc(r.n)}</span>
        <h3 class="rl-t">${esc(r.title)}</h3>
        <p class="rl-items">${r.items.map(esc).join(' · ')}</p>
      </li>`
        )
        .join('')}
    </ol>
    <p class="band-link mono"><a class="link-arrow" href="/stories/${s.slug}/">READ THE FEATURE ${arrow}</a></p>
  </div>
</section>`;
}

/* ---------- 8. THE DIGITAL THREAT — CYBERSECURITY (tonal shift) ---------- */
function cyberBand() {
  const s = storyBySlug('cybersecurity');
  const emotions = s.blocks.find((b) => b.t === 'pair');
  return `<section class="band band-cyber" aria-labelledby="cy-title">
  <div class="wrap">
    <div class="cy-top">
      ${kicker(`FEATURE ${s.no}`, 'CYBER / THE HUMAN LAYER', 'kicker-inv')}
      <p class="cy-ref mono">${esc(s.meta.ref)} · ${esc(s.meta.read)}</p>
    </div>
    <h2 class="cy-title" id="cy-title">ONE CLICK.<br>ONE MISTAKE.<br><span class="cy-accent">ONE HUGE LOSS.</span></h2>
    <div class="cy-grid">
      <div class="cy-fig">
        ${figure('cybersecurity', {
          ratio: '1/1',
          sizes: '(min-width: 900px) 34vw, 92vw',
          caption: 'FIG. 03 — THE ORDINARY CRIME SCENE.',
        })}
      </div>
      <div class="cy-body">
        <p class="cy-dek">${esc(s.dek)}</p>
        <ul class="cy-emotions">
          ${emotions.left.items
            .slice(0, 3)
            .map((i) => `<li><span class="cy-em">${esc(i.split(' — ')[0])}</span><span class="cy-em-x">${esc(i.split(' — ')[1] ?? '')}</span></li>`)
            .join('')}
        </ul>
        <p class="cy-insight mono">${esc(emotions.insight)}</p>
        <p class="band-link mono"><a class="link-arrow" href="/stories/${s.slug}/">READ THE FEATURE ${arrow}</a></p>
      </div>
    </div>
    <div class="cy-rules">
      <p class="cy-rules-h mono">FIVE RULES THAT STOP MOST OF IT</p>
      <ol class="cy-rule-list">
        ${s.blocks
          .find((b) => b.t === 'rules')
          .items.map(
            (r) => `<li><span class="cy-r-n mono">${esc(r.n)}</span><span class="cy-r-t">${esc(r.title)}</span></li>`
          )
          .join('')}
      </ol>
      <p class="cy-stop">STOP. THINK. CLICK.</p>
    </div>
  </div>
</section>`;
}

/* ---------- 9. HUMAN × AI — YOUNG GENERATION ---------- */
function youthBand() {
  const s = storyBySlug('young-generation-ai');
  const pair = s.blocks.find((b) => b.t === 'pair');
  return `<section class="band band-youth" aria-labelledby="ya-title">
  <div class="wrap">
    ${kicker(`FEATURE ${s.no}`, 'AI / THE GENERATION')}
    <h2 class="band-title band-title-big" id="ya-title">ARE WE USING AI —<br><span class="dim">OR IS AI USING US?</span></h2>
  </div>
  <div class="wrap band-youth-grid">
    <div class="youth-fig">
      ${figure('youth-ai', {
        ratio: '3/2',
        sizes: '(min-width: 900px) 44vw, 94vw',
        caption: 'FIG. 04 — THE NEW STUDY DESK. THE NOTEBOOK IS STILL OPEN.',
      })}
    </div>
    <div class="youth-pair">
      <div class="yp-col">
        <h3 class="yp-t mono">${esc(pair.left.title)}</h3>
        <ul>${pair.left.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>
      <div class="yp-col yp-col-b">
        <h3 class="yp-t mono">${esc(pair.right.title)}</h3>
        <ul>${pair.right.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>
    </div>
  </div>
  <div class="wrap">
    <p class="youth-edge mono">KEEP YOUR HUMAN EDGE — CRITICAL THINKING · CREATIVITY · COMMUNICATION · EMPATHY · LEADERSHIP</p>
    <p class="band-link mono"><a class="link-arrow" href="/stories/${s.slug}/">READ THE FEATURE ${arrow}</a></p>
  </div>
</section>`;
}

/* ---------- 10. HUMAN × MACHINE — GAMING ---------- */
function gameBand() {
  const s = storyBySlug('brain-games');
  return `<section class="band band-game" aria-labelledby="gm-title">
  <div class="wrap band-game-grid">
    <div class="game-text">
      ${kicker(`FEATURE ${s.no}`, 'CULTURE / THE LOOP')}
      <h2 class="band-title" id="gm-title">WHO IS<br>CONTROLLING<br>WHOM?</h2>
      <p class="band-dek">${esc(s.dek)}</p>
      <p class="game-enemy">THE GAME IS NOT THE ENEMY.<br><span>LOSING CONTROL IS.</span></p>
      <p class="band-link mono"><a class="link-arrow" href="/stories/${s.slug}/">READ THE FEATURE ${arrow}</a></p>
    </div>
    <div class="game-diagram">
      ${loopDiagram(['PLAY', 'REWARD', 'DOPAMINE', 'REPEAT'])}
    </div>
  </div>
</section>`;
}

/* ---------- 11. END OF ISSUE / INDEX ---------- */
function endBand() {
  return `<section class="band band-end" aria-labelledby="end-title">
  <div class="wrap">
    ${kicker('§', 'END OF ISSUE 001')}
    <h2 class="band-title" id="end-title">WHAT YOU CAN READ NEXT.</h2>
    <div class="teases teases-home">
      ${STORIES.map((s) => tease(s)).join('')}
    </div>
    <p class="band-link mono"><a class="link-arrow" href="/archive/">OPEN THE ARCHIVE ${arrow}</a></p>
  </div>
</section>`;
}

export const homeBody = () =>
  [cover(), coverPlate(), note(), leadBand(), acceleration(), eniacBand(), runwayBand(), cyberBand(), youthBand(), gameBand(), endBand()].join('\n');
