// Build-time SVG. Every diagram is generated from content data, not drawn by hand,
// so it stays true when the underlying numbers change.
import { TIMELINE, axisPositions, AXIS_CAPTIONS, AXIS_META } from '../content/timeline.mjs';
import { esc } from './ui.mjs';

const W = 1000; // internal viewBox width; CSS scales it

/* ------------------------------------------------------------------ *
 * THE ACCELERATOR — the signature graphic of the issue.
 * Fifteen milestones on a plotted axis. Two scales:
 *   LINEAR — true proportion: the modern era collapses into a hairline.
 *   LOG    — equal width per order of magnitude of years-ago.
 * ------------------------------------------------------------------ */
export function acceleratorChart({ id = 'acc', rows = ['log', 'linear'] } = {}) {
  const pos = axisPositions();
  const byKey = Object.fromEntries(pos.map((p) => [p.key, p]));
  const H = 268;              // per-row viewBox height
  const base = 172;           // baseline y inside a row
  const x = (pct) => Math.round(pct * 10 * 10) / 10; // 0–100 → 0–1000, 0.1 precision

  const rowSvg = (scale, ri) => {
    const y = base;
    const grid = Array.from({ length: 11 }, (_, i) => `<line class="ax-decade" x1="${i * 100}" y1="${y}" x2="${i * 100}" y2="${y + 6}" />`).join('');

    const ticks = TIMELINE.map((t) => {
      const cx = x(byKey[t.key][scale]);
      const major = t.major ? ' is-major' : '';
      return `<g class="ax-tick${major}" data-key="${t.key}">
    <line x1="${cx}" y1="${y}" x2="${cx}" y2="${y - (t.major ? 52 : 30)}" />
    <circle cx="${cx}" cy="${y}" r="${t.major ? 5 : 3.5}" />
  </g>`;
    }).join('');

    // labels differ by scale: on the true scale, only the two ends can be read
    const labels =
      scale === 'log'
        ? TIMELINE.filter((t) => t.major)
            .map(
              (t, i, arr) => `<text x="${x(byKey[t.key][scale])}" y="${y - 62}" text-anchor="${
                i === 0 ? 'start' : i === arr.length - 1 ? 'end' : 'middle'
              }" class="ax-lab">${esc(t.title.split(' ').slice(0, 3).join(' '))}</text>`
            )
            .join('')
        : `<text x="6" y="${y - 62}" class="ax-lab">THE ABACUS — c. 3000 BC</text>
     <path class="ax-leader" d="M ${x(byKey.turing.linear) - 150} ${y - 46} L ${x(byKey.turing.linear) - 8} ${y - 46}" />
     <text x="${x(byKey.turing.linear) - 158}" y="${y - 42}" text-anchor="end" class="ax-note">EVERY MILESTONE AFTER THE ABACUS IS PACKED INTO THE FINAL ${Math.round(AXIS_META.modernBand)}% OF THIS LINE — THE LAST ${AXIS_META.lateCount} INTO ITS LAST EIGHTH.</text>`;

    return `<svg class="ax-svg" viewBox="0 0 ${W} ${H}" data-scale="${scale}" role="img" aria-labelledby="${id}-${scale}-t ${id}-${scale}-d" preserveAspectRatio="xMidYMid meet">
  <title id="${id}-${scale}-t">${scale === 'log' ? 'Logarithmic' : 'True-scale'} plot of fifteen computing milestones</title>
  <desc id="${id}-${scale}-d">${
      scale === 'log'
        ? 'Each order of magnitude of years-ago receives equal width, so the modern era can be read.'
        : `Plotted in true proportion: the abacus occupies the first ${(100 - Number(AXIS_META.modernBand)).toFixed(0)}% of the line and every other milestone is compressed against the right edge.`
    }</desc>
  ${grid}
  <line class="ax-base" x1="0" y1="${y}" x2="${W}" y2="${y}" />
  ${ticks}
  ${labels}
  <text x="0" y="${y + 34}" class="ax-edge">3000 BC</text>
  <text x="${W}" y="${y + 34}" text-anchor="end" class="ax-edge">TODAY</text>
  <text x="0" y="30" class="ax-rowlab">${scale === 'log' ? 'B — LOG SCALE' : 'A — TRUE SCALE'}</text>
</svg>`;
  };

  return `<div class="accelerator" data-mode="both">
  <div class="acc-scroll">
    ${rows.map(rowSvg).join('')}
  </div>
  <p class="acc-hint mono" aria-hidden="true">SCROLL HORIZONTALLY TO READ THE FULL AXIS →</p>
</div>`;
}

/* Horizontal tick strip: 15 marks in one thin band (used on the cover). */
export function tickStrip({ href = '/timeline/', id = 'strip' } = {}) {
  const pos = axisPositions();
  const byKey = Object.fromEntries(pos.map((p) => [p.key, p]));
  const labelled = [
    ['abacus', '3000 BC'],
    ['lovelace', '1843'],
    ['eniac', '1946'],
    ['internet', '1991'],
    ['genai', 'TODAY'],
  ];
  return `<div class="tick-strip">
  <div class="ts-head">
    <span class="ts-lab mono">THE ACCELERATION / ${TIMELINE.length} MARKS</span>
    <span class="ts-lab mono ts-lab-r">3000 BC → 2026</span>
  </div>
  <a class="ts-plot" href="${href}" aria-label="Open the full timeline: ${TIMELINE.length} milestones from 3000 BC to today">
    <svg viewBox="0 0 1000 70" role="img" aria-hidden="true" focusable="false">
      <line x1="0" y1="42" x2="1000" y2="42" class="ts-base" />
      ${TIMELINE.map((t) => {
        const cx = byKey[t.key].log * 10;
        return `<line class="ts-tick${t.major ? ' is-major' : ''}" x1="${cx}" y1="42" x2="${cx}" y2="${t.major ? 8 : 24}" />`;
      }).join('')}
    </svg>
    <span class="ts-years" aria-hidden="true">
      ${labelled
        .map(([k, l]) => {
          const p = byKey[k].log;
          const style = `left:${p}%; transform: translateX(${p < 3 ? '0' : p > 97 ? '-100%' : '-50%'})`;
          return `<span style="${style}">${l}</span>`;
        })
        .join('')}
    </span>
  </a>
</div>`;
}

/* ------------------------------------------------------------------ *
 * THE DOPAMINE LOOP — a circular diagram, closed by an arrow.
 * ------------------------------------------------------------------ */
export function loopDiagram(nodes = ['PLAY', 'REWARD', 'DOPAMINE', 'REPEAT']) {
  const cx = 300;
  const cy = 292;
  const r = 190;
  const at = (i) => {
    const a = -Math.PI / 2 + (i / nodes.length) * Math.PI * 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r, a];
  };
  const arcs = nodes
    .map((_, i) => {
      const [x1, y1, a1] = at(i);
      const [x2, y2] = at((i + 1) % nodes.length);
      const large = 0;
      const sweep = 1;
      const rr = r;
      return `<path class="loop-arc" d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${rr} ${rr} 0 ${large} ${sweep} ${x2.toFixed(1)} ${y2.toFixed(1)}" marker-end="url(#loop-arrow)" />`;
    })
    .join('');
  const labels = nodes
    .map((n, i) => {
      const [x, y, a] = at(i);
      const lx = cx + Math.cos(a) * (r + 66);
      const ly = cy + Math.sin(a) * (r + 52);
      const anchor = Math.abs(Math.cos(a)) < 0.3 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end';
      return `<g class="loop-node">
  <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" />
  <text x="${lx.toFixed(1)}" y="${(ly + 5).toFixed(1)}" text-anchor="${anchor}" class="loop-lab">${esc(n)}</text>
</g>`;
    })
    .join('');
  return `<svg class="loop-diagram" viewBox="0 0 600 584" role="img" aria-labelledby="loop-t loop-d">
  <title id="loop-t">The dopamine loop: play, reward, dopamine, repeat</title>
  <desc id="loop-d">A closed circular sequence of four stages. Playing produces a reward; the reward releases dopamine, a signal of anticipation rather than pleasure; the anticipation returns the player to play. The loop is designed to close quickly and often.</desc>
  <defs>
    <marker id="loop-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${r}" class="loop-ring" />
  ${arcs}
  ${labels}
  <text x="${cx}" y="${cy - 6}" text-anchor="middle" class="loop-centre mono">THE LOOP</text>
  <text x="${cx}" y="${cy + 22}" text-anchor="middle" class="loop-centre-sub">DESIGNED TO CLOSE</text>
</svg>`;
}

/* ------------------------------------------------------------------ *
 * RUNWAYS — one origin, three departures.
 * ------------------------------------------------------------------ */
export function runwaysDiagram(runways) {
  const W2 = 1000;
  const H = 420;
  const originX = 66;
  const originY = H / 2;
  const endX = 968;
  const lanes = runways.map((_, i) => 96 + i * 118);
  const paths = runways
    .map((r, i) => {
      const y = lanes[i];
      return `<path class="rw-path" d="M ${originX} ${originY} C ${originX + 210} ${originY}, ${originX + 210} ${y}, ${originX + 420} ${y} L ${endX} ${y}" marker-end="url(#rw-arrow)" data-rw="${i}" />
  <text x="${originX + 440}" y="${y - 20}" class="rw-lab">${esc(r.title.replace('THE ', '').replace(' RUNWAY', ''))}</text>
  <text x="${originX + 440}" y="${y + 30}" class="rw-count">${r.items.length} DIRECTIONS</text>`;
    })
    .join('');
  return `<svg class="runways-diagram" viewBox="0 0 ${W2} ${H}" role="img" aria-labelledby="rw-t rw-d">
  <title id="rw-t">Three runways leaving one starting point</title>
  <desc id="rw-d">A single origin point diverging into three departure directions: the career runway, the higher studies runway and the creator runway.</desc>
  <defs>
    <marker id="rw-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  </defs>
  <circle class="rw-origin" cx="${originX}" cy="${originY}" r="7" />
  <text x="${originX}" y="${originY + 54}" class="rw-origin-lab mono">YOU / YEAR 1</text>
  ${paths}
</svg>`;
}

/* ------------------------------------------------------------------ *
 * CHAIN / SEQUENCE — nodes joined by a drawn line.
 * ------------------------------------------------------------------ */
export function chainDiagram(nodes) {
  const n = nodes.length;
  const H = 132;
  const x = (i) => 60 + (i * (1000 - 120)) / (n - 1);
  return `<div class="chain-diagram">
  <svg viewBox="0 0 1000 ${H}" role="img" aria-labelledby="ch-t ch-d">
    <title id="ch-t">${esc(nodes.join(' → '))}</title>
    <desc id="ch-d">A sequence diagram: ${esc(nodes.join(', then '))}.</desc>
    <line x1="${x(0)}" y1="${H / 2}" x2="${x(n - 1)}" y2="${H / 2}" class="ch-line" marker-end="url(#ch-arrow)" />
    <defs>
      <marker id="ch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    </defs>
    ${nodes
      .map(
        (nd, i) => `<g class="ch-node">
      <circle cx="${x(i)}" cy="${H / 2}" r="5" />
      <line x1="${x(i)}" y1="${H / 2 - 12}" x2="${x(i)}" y2="${H / 2 - 26}" />
      <text x="${x(i)}" y="${H / 2 + 46}" text-anchor="${i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}" class="ch-lab">${esc(nd)}</text>
      <text x="${x(i)}" y="${H / 2 + 66}" text-anchor="${i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}" class="ch-n mono">${String(i + 1).padStart(2, '0')}</text>
    </g>`
      )
      .join('')}
  </svg>
</div>`;
}

/* ------------------------------------------------------------------ *
 * LADDER — stacked levels (the three levels of AI).
 * ------------------------------------------------------------------ */
export function ladderDiagram(steps) {
  const n = steps.length;
  const colW = 1000 / n;
  return `<div class="ladder-diagram">
  <svg viewBox="0 0 1000 ${110 * n}" role="img" aria-labelledby="ld-t ld-d">
    <title id="ld-t">The AI ladder: machine learning, deep learning, generative AI</title>
    <desc id="ld-d">Three stacked levels, each built on the one below it.</desc>
    ${steps
      .map((s, i) => {
        const y = 110 * (n - 1 - i);
        return `<g class="ld-step">
      <rect x="${i * 12}" y="${y}" width="${1000 - i * 24}" height="86" class="ld-rect" />
      <text x="${i * 12 + 22}" y="${y + 36}" class="ld-k mono">${esc(s.k)}</text>
      <text x="${i * 12 + 22}" y="${y + 66}" class="ld-t">${esc(s.title)}</text>
      <text x="${1000 - i * 12 - 22}" y="${y + 50}" text-anchor="end" class="ld-b">${esc(s.body)}</text>
    </g>`;
      })
      .join('')}
  </svg>
</div>`;
}

/* ------------------------------------------------------------------ *
 * THE INTERVALS — the same fifteen milestones read as time between them.
 * Widths are logarithmic so a 4,600-year gap and a 1-year gap can share
 * an axis; the numbers printed are the real ones, computed here.
 * ------------------------------------------------------------------ */
export function intervalBars(nodes = TIMELINE) {
  const gaps = nodes
    .map((n, i) => (i === 0 ? null : { from: nodes[i - 1].title, to: n.title, years: n.y - nodes[i - 1].y }))
    .filter(Boolean);

  const scale = (y) => {
    const pct = ((Math.log10(Math.max(y, 1)) + 0.15) / 3.85) * 100;
    return Math.max(2.5, Math.min(100, pct)).toFixed(2);
  };

  return `<ol class="iv-bars">
  ${gaps
    .map(
      (g) => `<li class="iv-row">
    <span class="iv-lab mono">${esc(g.from)} →</span>
    <span class="iv-track"><span class="iv-fill" style="width: ${scale(g.years)}%"></span></span>
    <span class="iv-val mono">${g.years >= 1000 ? `${Math.round(g.years / 100) * 100}`.toLocaleString('en-US') : g.years} ${
        g.years === 1 ? 'YEAR' : 'YEARS'
      }</span>
    <span class="iv-to mono">${esc(g.to)}</span>
  </li>`
    )
    .join('')}
</ol>
<p class="iv-note mono">LOGARITHMIC WIDTHS, EXACT INTERVALS. ${Math.round(
    ((nodes.filter((n) => n.y >= 1900).length / nodes.length) * 100
  ))}% OF THE MILESTONES ON THIS LINE HAPPEN AFTER 1900.</p>`;
}

