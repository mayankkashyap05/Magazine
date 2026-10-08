// Block renderers: structured editorial data → markup.
// Blocks carry a `layout` (full / wide / left / right / narrow / bleed) which is
// what keeps the page from turning into one repeated component.
import { esc, figure, sectionHead, kicker, listRow, pipeRow, statCell, arrow, divider } from './ui.mjs';
import { TIMELINE } from '../content/timeline.mjs';
import { ENIAC_SPECS } from '../content/marks.mjs';
import { loopDiagram, chainDiagram, runwaysDiagram, ladderDiagram } from './diagrams.mjs';

const lay = (b, extra = '') => `blk ${extra} lay-${b.layout ?? 'full'}${b.tone ? ' tone-' + b.tone : ''}${b.overlap ? ' ov' : ''}`;

const statement = (b) => `<section class="${lay(b, 'blk-statement')}">
  ${b.kicker ? kicker(b.kicker[0], b.kicker[1]) : ''}
  <p class="statement">${b.lines
    .map((l) => `<span class="st st-${l.size ?? 'lg'}">${esc(l.text)}</span>`)
    .join('')}</p>
</section>`;

const pull = (b) => `<section class="${lay(b, 'blk-pull')}">
  <blockquote class="pull">
    <span class="pull-mark" aria-hidden="true">“</span>
    <p class="pull-lines">${b.lines.map((l) => `<span>${esc(l)}</span>`).join('')}</p>
    ${b.cite ? `<cite class="pull-cite mono">${esc(b.cite)}</cite>` : ''}
  </blockquote>
</section>`;

const lede = (b) => `<section class="${lay(b, 'blk-lede')}"><p class="lede">${esc(b.text)}</p></section>`;

const prose = (b) => `<section class="${lay(b, 'blk-prose')}"><p class="prose">${esc(b.text)}</p></section>`;

const rule = (b) => `<div class="${lay(b, 'blk-rule')}">${divider(b.label)}</div>`;

const specs = (b) => {
  const items = b.items === 'eniac' ? ENIAC_SPECS : b.items ?? [];
  return `<section class="${lay(b, 'blk-specs')}">
  ${sectionHead('§', 'SPECIFICATION', b.title, b.note)}
  <div class="specs${b.lead ? ' specs-lead' : ''}">${items.map(statCell).join('')}</div>
  ${b.footer ? `<p class="sec-foot mono">${esc(b.footer)}</p>` : ''}
</section>`;
};

const keynote = (b) => `<section class="${lay(b, 'blk-keynote')}">
  <ul class="keynotes">${b.words.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
  ${b.note ? `<p class="sec-foot mono">${esc(b.note)}</p>` : ''}
</section>`;

const rows = (b) => `<section class="${lay(b, 'blk-rows')}">
  ${sectionHead('§', b.label ?? 'OPERATIONS', b.title, b.note)}
  <div class="prows">${b.items.map(pipeRow).join('')}</div>
</section>`;

const list = (b) => `<section class="${lay(b, 'blk-list')}">
  ${sectionHead('§', b.label ?? 'INDEX', b.title, b.note)}
  <div class="lrows">${b.items.map(listRow).join('')}</div>
</section>`;

const rules = (b) => `<section class="${lay(b, 'blk-rules')}">
  ${sectionHead('§', 'PROTOCOL', b.title, b.note)}
  <ol class="rules">${b.items.map(listRow).join('')}</ol>
  ${b.footer ? `<p class="sec-foot mono">${esc(b.footer)}</p>` : ''}
</section>`;

const roster = (b) => `<section class="${lay(b, 'blk-roster')}">
  ${sectionHead('§', 'PERSONNEL — SIX', b.title, b.note)}
  <ol class="roster">
    ${b.people
      .map(
        (p, i) => `<li class="roster-item">
      <span class="roster-n mono">${String(i + 1).padStart(2, '0')}</span>
      <span class="roster-name">${esc(p.name)}</span>
      ${p.note ? `<span class="roster-note">${esc(p.note)}</span>` : ''}
    </li>`
      )
      .join('')}
  </ol>
  ${b.footer ? `<p class="sec-foot mono">${esc(b.footer)}</p>` : ''}
</section>`;

const pair = (b) => `<section class="${lay(b, 'blk-pair')}">
  ${sectionHead('§', b.label ?? 'READING', b.title, b.note)}
  <div class="pair">
    <div class="pair-col">
      <h3 class="pair-t mono">${esc(b.left.title)}</h3>
      <ul>${b.left.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
    </div>
    <div class="pair-col pair-col-b">
      <h3 class="pair-t mono">${esc(b.right.title)}</h3>
      <ul>${b.right.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
    </div>
  </div>
  ${b.insight ? `<p class="pair-insight">${esc(b.insight)}</p>` : ''}
</section>`;

const runways = (b) => `<section class="${lay(b, 'blk-runways')}">
  ${sectionHead('§', 'TRAJECTORIES', b.title, b.note)}
  ${runwaysDiagram(b.runways)}
  <div class="runways">
    ${b.runways
      .map(
        (r) => `<div class="runway">
      <header class="runway-head">
        <span class="runway-n mono">${esc(r.n)}</span>
        <h3 class="runway-t">${esc(r.title)}</h3>
        ${r.tag ? `<span class="runway-tag mono">${esc(r.tag)}</span>` : ''}
      </header>
      <ul class="runway-items">${r.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
    </div>`
      )
      .join('')}
  </div>
</section>`;

const chain = (b) => `<section class="${lay(b, 'blk-chain')}">
  ${sectionHead('§', 'SEQUENCE', b.title, b.note)}
  ${chainDiagram(b.nodes)}
</section>`;

const loop = (b) => `<section class="${lay(b, 'blk-loop')}">
  ${sectionHead('§', 'DIAGRAM', b.title, b.note)}
  <div class="loop-wrap">
    ${loopDiagram(b.nodes)}
    <div class="loop-aside">
      ${b.nodes
        .map(
          (n, i) => `<div class="loop-step"><span class="mono">${String(i + 1).padStart(2, '0')}</span><span>${esc(n)}</span></div>`
        )
        .join('')}
    </div>
  </div>
  ${b.footer ? `<p class="sec-foot mono">${esc(b.footer)}</p>` : ''}
</section>`;

const ladder = (b) => `<section class="${lay(b, 'blk-ladder')}">
  ${sectionHead('§', 'DIAGRAM', b.title, b.note)}
  ${ladderDiagram(b.steps)}
</section>`;

const edge = (b) => `<section class="${lay(b, 'blk-edge')}">
  ${sectionHead('§', 'INVENTORY', b.title, b.note)}
  <p class="edge">${b.items
    .map((i, k) => `<span class="edge-i"><span class="edge-n mono">${String(k + 1).padStart(2, '0')}</span>${esc(i)}</span>`)
    .join('')}</p>
</section>`;

const protocol = (b) => `<section class="${lay(b, 'blk-protocol')}">
  ${sectionHead('§', 'METHOD', b.title, b.note)}
  <div class="protocols">
    ${b.rows
      .map(
        (r) => `<div class="protocol">
      <span class="protocol-l">${esc(r.left)}</span>
      <span class="protocol-arrow" aria-hidden="true">→</span>
      <span class="protocol-r">${esc(r.right)}</span>
    </div>`
      )
      .join('')}
  </div>
  ${b.footer ? `<p class="protocol-foot">${esc(b.footer)}</p>` : ''}
</section>`;

const exhibits = (b) => `<section class="${lay(b, 'blk-exhibits')}">
  ${sectionHead('§', 'EVIDENCE', b.title, b.note)}
  <div class="exhibits">
    ${b.items
      .map(
        (x) => `<figure class="exhibit">
      <figcaption class="exhibit-tag mono">${esc(x.tag)}</figcaption>
      <blockquote class="exhibit-text">${esc(x.text)}</blockquote>
      ${x.tell ? `<p class="exhibit-tell mono">${esc(x.tell)}</p>` : ''}
    </figure>`
      )
      .join('')}
  </div>
  ${b.insight ? `<p class="exhibit-insight">${esc(b.insight)}</p>` : ''}
</section>`;

const fig = (b) => `<div class="${lay(b, 'blk-fig')}">${figure(b.img, {
  caption: b.caption,
  ratio: b.ratio,
  sizes: b.sizes,
  parallax: b.parallax,
})}</div>`;

const gallery = (b) => `<div class="${lay(b, 'blk-gallery')}">
  <div class="gallery g-${b.items.length}">
    ${b.items.map((it) => figure(it.img, { caption: it.caption, ratio: it.ratio ?? '4/3', sizes: '(min-width: 900px) 32vw, 92vw' })).join('')}
  </div>
</div>`;

const timelineIndex = (b) => `<section class="${lay(b, 'blk-tlindex')}">
  ${sectionHead('§', 'SEQUENCE', b.title, b.note)}
  <ol class="tlindex">
    ${TIMELINE.map(
      (t, i) => `<li class="tlindex-row pace-${t.pace}">
      <a href="/timeline/#${t.key}">
        <span class="tli-n mono">${String(i + 1).padStart(2, '0')}</span>
        <span class="tli-year">${esc(t.year)}</span>
        <span class="tli-title">${esc(t.title)}</span>
        <span class="tli-tag mono">${esc(t.tag)}</span>
      </a>
    </li>`
    ).join('')}
  </ol>
  <p class="sec-foot mono"><a class="link-arrow" href="/timeline/">OPEN THE FULL TIMELINE ${arrow}</a></p>
</section>`;

const marks = (b) => `<section class="${lay(b, 'blk-marks')}">
  <div class="marks">
    ${b.items
      .map(
        (m) => `<div class="mark">
      <span class="mark-v" data-count="${esc(m.v)}">${esc(m.v)}</span>
      <span class="mark-u mono">${esc(m.u)}</span>
      <span class="mark-n">${esc(m.note)}</span>
    </div>`
      )
      .join('')}
  </div>
</section>`;

const renderers = {
  statement, pull, lede, prose, rule, specs, keynote, rows, list, rules, roster, pair,
  runways, chain, loop, ladder, edge, protocol, exhibits, fig, gallery, timelineIndex, marks,
};

export function renderBlock(b) {
  const fn = renderers[b.t];
  return fn ? fn(b) : '';
}

export const renderBlocks = (blocks) => blocks.map(renderBlock).join('\n');
