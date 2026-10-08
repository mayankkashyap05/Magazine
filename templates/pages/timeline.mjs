// TIMELINE — the signature sequence, with the dual-scale accelerator chart.
import { TIMELINE, AXIS_CAPTIONS } from '../../content/timeline.mjs';
import { esc, kicker, picture, divider, arrow } from '../ui.mjs';
import { acceleratorChart, intervalBars } from '../diagrams.mjs';

// "4,642 YEARS FROM THE ABACUS" — computed, never typed by hand.
function gapLabel(prev, node) {
  const years = node.y - prev.y;
  if (years <= 0) return `WITHIN THE SAME DECADE AS ${prev.title}`;
  const rounded = years >= 1000 ? Math.round(years / 100) * 100 : years >= 100 ? Math.round(years / 10) * 10 : years;
  const unit = years >= 2 ? 'YEARS' : 'YEAR';
  return `${rounded.toLocaleString('en-US')} ${unit} AFTER ${prev.title}`;
}

export const timelineBody = () => `<section class="page-head page-head-tl">
  <div class="wrap">
    ${kicker('SEQUENCE', 'THE ACCELERATION / 3000 BC — TODAY')}
    <h1 class="ph-title">FIVE THOUSAND<br>YEARS, IN ONE<br>COLUMN.</h1>
    <p class="ph-dek">From a counting board to a model that writes back. Read the years, then read the gaps between them — the gaps are the story.</p>
  </div>
</section>

<section class="tl-chart">
  <div class="wrap">
    ${acceleratorChart({ id: 'tl' })}
    <div class="chart-legend">
      <p class="legend-p"><span class="legend-k mono">A — TRUE SCALE</span> ${esc(AXIS_CAPTIONS.linear)}</p>
      <p class="legend-p"><span class="legend-k mono">B — LOG SCALE</span> ${esc(AXIS_CAPTIONS.log)}</p>
    </div>
    <div class="tl-scale" role="group" aria-label="Chart scale">
      <span class="mono tl-scale-k">SCALE</span>
      <button class="tl-scale-b mono is-on" type="button" data-scale-btn="log" aria-pressed="true">LOG</button>
      <button class="tl-scale-b mono" type="button" data-scale-btn="linear" aria-pressed="false">TRUE</button>
      <button class="tl-scale-b mono" type="button" data-scale-btn="both" aria-pressed="false">BOTH</button>
    </div>
  </div>
</section>

<section class="tl-page">
  <div class="wrap">
    <ol class="tl">
      ${TIMELINE.map(
        (t, i) => `<li class="tl-entry pace-${t.pace}${t.major ? ' is-major' : ''}" id="${t.key}">
        <span class="tl-n mono">${String(i + 1).padStart(2, '0')}</span>
        <span class="tl-year">${esc(t.year)}</span>
        <span class="tl-node" aria-hidden="true"></span>
        <div class="tl-body">
          ${i === 0 ? '' : `<p class="tl-gap mono">${gapLabel(TIMELINE[i - 1], t)}</p>`}
          <h2 class="tl-title">${esc(t.title)} <span class="tech">${esc(t.tag)}</span></h2>
          <p class="tl-text">${esc(t.body)}</p>
          ${t.fact ? `<p class="tl-fact mono">${esc(t.fact)}</p>` : ''}
          ${t.img ? `<div class="tl-fig">${picture(t.img, { sizes: '(min-width: 900px) 30vw, 90vw' })}</div>` : ''}
        </div>
      </li>`
      ).join('')}
    </ol>

    <section class="tl-intervals">
      ${divider('THE INTERVALS')}
      <h2 class="tl-int-title">FIFTEEN MILESTONES, FOURTEEN GAPS.</h2>
      <p class="tl-int-dek">Read downwards, the line above says <em>what</em> happened. Read sideways, this one says <em>how fast</em> — and how recently it started going fast.</p>
      ${intervalBars()}
    </section>

    <div class="tl-end">
      ${divider('THE PATTERN')}
      <p class="tl-end-line">EVERY MILESTONE ON THIS LINE WAS BUILT BY PEOPLE WHO DID NOT KNOW IT WAS A MILESTONE.</p>
      <p class="tl-end-line tl-end-accent">THE MACHINE LEARNED. NOW WE DECIDE WHAT WE WANT TO THINK WITH IT.</p>
      <p class="band-link mono"><a class="link-arrow" href="/stories/from-computer-to-ai/">READ THE FEATURE ${arrow}</a></p>
    </div>
  </div>
</section>`;
