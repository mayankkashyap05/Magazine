// Editorial teaser rows — rules and typography, not cards.
import { esc, picture } from './ui.mjs';

export function tease(s, { showFig = true } = {}) {
  return `<a class="tease" href="/stories/${s.slug}/">
  <span class="tease-no mono">${esc(s.no)}</span>
  <span class="tease-cat mono">${esc(s.category)}</span>
  <span class="tease-body">
    <h3 class="tease-t">${s.title.map((l) => esc(l)).join(' ')}</h3>
    <p class="tease-d">${esc(s.dek)}</p>
  </span>
  ${showFig ? `<span class="tease-fig">${picture(s.hero.img, { sizes: '(min-width: 1081px) 168px, (min-width: 861px) 140px, 92vw' })}</span>` : ''}
  <span class="tease-ref mono">${esc(s.ref)} <span class="tease-arrow" aria-hidden="true">→</span></span>
</a>`;
}
