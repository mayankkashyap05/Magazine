// Editorial teasers — rules and typography, never cards.
import { esc, picture, arrow, tech } from './ui.mjs';

// Contents row used on the issue page and section pages.
export function tease(s, { plate = true } = {}) {
  return `<a class="tease" href="/stories/${s.slug}/">
  <span class="tease-n mono">${esc(s.no)}</span>
  ${plate ? `<span class="tease-plate">${picture(s.hero.img, { sizes: '(min-width: 1000px) 210px, 40vw', cls: 'tease-pic' })}</span>` : ''}
  <span class="tease-main">
    <span class="tease-cat mono">${esc(s.section.label)} — ${esc(s.runtime)}</span>
    <span class="tease-t">${s.title.map(esc).join(' ')}</span>
    <span class="tease-d">${esc(s.dek)}</span>
  </span>
  <span class="tease-meta mono">
    <span>${esc(s.meta.read)}</span>
    <span>${esc(s.meta.ref)}</span>
    <span class="tease-go">${arrow}</span>
  </span>
</a>`;
}

export const teases = (list, opts) => `<div class="teases">${list.map((s) => tease(s, opts)).join('')}</div>`;

// Compact cross-reference used at the foot of story pages.
export const miniRef = (s) =>
  `<a class="miniref" href="/stories/${s.slug}/"><span class="miniref-n mono">${esc(s.no)}</span><span class="miniref-t">${s.title.map(esc).join(' ')}</span>${tech(s.section.label)}</a>`;
