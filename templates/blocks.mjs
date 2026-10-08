// Block renderer: turns structured story blocks into editorial markup.
import { esc, figure, stat, listRow, sectionHead, tech, picture } from './ui.mjs';
import { TIMELINE } from '../content/timeline.mjs';

const arrow = '<span class="arrow" aria-hidden="true">→</span>';

function statement(b) {
  const lines = b.lines
    .map((l) => `<span class="st-line st-${l.size}">${esc(l.text)}</span>`)
    .join('');
  return `<div class="statement${b.tone ? ' tone-' + b.tone : ''}">${lines}</div>`;
}

function quote(b) {
  return `<blockquote class="pull">${b.lines.map((l) => `<span>${esc(l)}</span>`).join('')}</blockquote>`;
}

function stats(b) {
  return `<section class="blk-stats">
    ${sectionHead('§', 'SPECIFICATION', b.title, b.note)}
    <div class="stats-grid">${b.items.map(stat).join('')}</div>
  </section>`;
}

function rows(b) {
  return `<section class="blk-rows">
    ${sectionHead('§', 'OPERATIONS', b.title, b.note)}
    <div class="rows">
      ${b.items
        .map(
          (r) => `<div class="row">
        <span class="row-k mono">${esc(r.k)}</span>
        <h3 class="row-t">${esc(r.title)}</h3>
        <p class="row-b">${esc(r.body)}</p>
      </div>`
        )
        .join('')}
    </div>
  </section>`;
}

function list(b) {
  return `<section class="blk-list">
    ${sectionHead('§', 'INDEX', b.title, b.note)}
    <div class="lrows">${b.items.map(listRow).join('')}</div>
  </section>`;
}

function rules(b) {
  return `<section class="blk-rules">
    ${sectionHead('§', 'PROTOCOL', b.title)}
    <ol class="rules">
      ${b.items
        .map(
          (r) => `<li class="rule-row">
        <span class="rule-n mono">${esc(r.n)}</span>
        <h3 class="rule-t">${esc(r.title)}</h3>
        <p class="rule-b">${esc(r.body)}</p>
      </li>`
        )
        .join('')}
    </ol>
  </section>`;
}

function ladder(b) {
  return `<section class="blk-ladder">
    ${sectionHead('§', 'DIAGRAM', b.title, b.note)}
    <div class="ladder">
      ${b.steps
        .map(
          (s, i) => `<div class="ladder-step" style="--step:${i}">
        <span class="ladder-k mono">${esc(s.k)}</span>
        <span class="ladder-t">${esc(s.title)}</span>
        <span class="ladder-b">${esc(s.body)}</span>
      </div>`
        )
        .join('')}
    </div>
  </section>`;
}

function chain(b) {
  return `<section class="blk-chain">
    ${sectionHead('§', 'SEQUENCE', b.title, b.note)}
    <div class="chain">${b.nodes.map((n) => `<span class="chain-node">${esc(n)}</span>`).join(arrow)}</div>
  </section>`;
}

function loop(b) {
  const nodes = b.nodes.map((n) => `<span class="chain-node">${esc(n)}</span>`).join(arrow);
  return `<section class="blk-loop">
    ${sectionHead('§', 'DIAGRAM', b.title, b.note)}
    <div class="chain loop">
      ${nodes}
      <span class="loop-return mono" aria-hidden="true">↺ RETURNS TO PLAY</span>
    </div>
  </section>`;
}

function runways(b) {
  return `<section class="blk-runways">
    ${sectionHead('§', 'TRAJECTORIES', b.title, b.note)}
    <div class="runways">
      ${b.runways
        .map(
          (r) => `<div class="runway">
        <header class="runway-head">
          <span class="runway-n mono">${esc(r.n)}</span>
          <h3 class="runway-t">${esc(r.title)}</h3>
          <span class="runway-line" aria-hidden="true"></span>
        </header>
        <ul class="runway-items">${r.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>`
        )
        .join('')}
    </div>
  </section>`;
}

function pair(b) {
  return `<section class="blk-pair">
    ${sectionHead('§', 'READING', b.title, b.insight)}
    <div class="pair">
      <div class="pair-col">
        <h3 class="pair-t mono">${esc(b.left.title)}</h3>
        <ul>${b.left.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>
      <div class="pair-col pair-right">
        <h3 class="pair-t mono">${esc(b.right.title)}</h3>
        <ul>${b.right.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>
    </div>
  </section>`;
}

function specimens(b) {
  return `<section class="blk-specimens">
    ${sectionHead('§', 'EVIDENCE', b.title)}
    <div class="specimens">
      ${b.items
        .map(
          (s) => `<div class="specimen">
        <span class="specimen-tag mono">${esc(s.tag)}</span>
        <p class="specimen-text">${esc(s.text)}</p>
      </div>`
        )
        .join('')}
    </div>
    <p class="insight">${esc(b.insight)}</p>
  </section>`;
}

function roster(b) {
  return `<section class="blk-roster">
    ${sectionHead('§', 'PERSONNEL', b.title, b.note)}
    <ol class="roster">
      ${b.people.map((p, i) => `<li><span class="roster-n mono">0${i + 1}</span><span class="roster-name">${esc(p)}</span></li>`).join('')}
    </ol>
  </section>`;
}

function edge(b) {
  return `<section class="blk-edge">
    ${sectionHead('§', 'INVENTORY', b.title)}
    <p class="edge">${b.items.map((i) => `<span>${esc(i)}</span>`).join('<span class="edge-sep" aria-hidden="true">/</span>')}</p>
  </section>`;
}

function prose(b) {
  return `<p class="prose">${esc(b.text)}</p>`;
}

function timelineBlock(b) {
  return `<section class="blk-timeline">
    ${sectionHead('§', 'SEQUENCE', 'THE ACCELERATION', b.note)}
    <ol class="tl">
      ${TIMELINE.map(
        (t) => `<li class="tl-entry pace-${t.pace}">
        <span class="tl-year">${esc(t.year)}</span>
        <span class="tl-node" aria-hidden="true"></span>
        <div class="tl-body">
          <h3 class="tl-title">${esc(t.title)} <span class="tech">${esc(t.tag)}</span></h3>
          <p class="tl-text">${esc(t.body)}</p>
        </div>
      </li>`
      ).join('')}
    </ol>
  </section>`;
}

function fig(b) {
  return figure(b.img, { caption: b.caption, ratio: b.ratio, sizes: b.sizes });
}

export function renderBlock(b) {
  switch (b.t) {
    case 'statement': return statement(b);
    case 'quote': return quote(b);
    case 'stats': return stats(b);
    case 'rows': return rows(b);
    case 'list': return list(b);
    case 'rules': return rules(b);
    case 'ladder': return ladder(b);
    case 'chain': return chain(b);
    case 'loop': return loop(b);
    case 'runways': return runways(b);
    case 'pair': return pair(b);
    case 'specimens': return specimens(b);
    case 'roster': return roster(b);
    case 'edge': return edge(b);
    case 'prose': return prose(b);
    case 'timeline': return timelineBlock(b);
    case 'fig': return fig(b);
    default: return '';
  }
}
