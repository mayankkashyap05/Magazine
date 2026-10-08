// Shared markup primitives. Pure functions of data → HTML string.
import { plateAlt, PLATES } from '../content/images.mjs';
import { SITE } from '../content/site.mjs';

let MANIFEST = {};
export function setManifest(m) {
  MANIFEST = m;
}
export const manifest = () => MANIFEST;

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- technical furniture ---------- */

// Tiny mono label. `tech('FIG. 03')`
export const tech = (text, cls = '') => `<span class="tech${cls ? ' ' + cls : ''}">${esc(text)}</span>`;

// Section kicker: number/§ + rule + label, e.g. § / SPECIFICATION
export const kicker = (a, b, cls = '') =>
  `<p class="kicker${cls ? ' ' + cls : ''}">` +
  (a ? `<span class="kicker-a">${esc(a)}</span><span class="kicker-rule" aria-hidden="true"></span>` : '') +
  `<span class="kicker-b">${esc(b)}</span></p>`;

// Hairline rule with a technical label, used to divide editorial movements.
export const divider = (label) =>
  `<div class="divider" role="presentation">${label ? `<span class="divider-label">${esc(label)}</span>` : ''}</div>`;

// The ENIAC punched-column mark: a machine-label glyph, not an icon.
export const cardColumn = (cls = '', n = 6, punched = [1, 3, 4]) => {
  const cells = Array.from({ length: n }, (_, i) => `<i${punched.includes(i) ? ' class="on"' : ''}></i>`).join('');
  return `<span class="col-mark${cls ? ' ' + cls : ''}" aria-hidden="true">${cells}</span>`;
};

// Wordmark: name + apparatus + optional subtitle. `size`: 'sm' | 'md' | 'lg'
export function wordmark({ size = 'md', href = '/', sub = true, label = `${SITE.name} — home`, tag = 'a' } = {}) {
  const inner = `
  ${cardColumn('wm-col')}
  <span class="wm-text">
    <span class="wm-name">${esc(SITE.name)}</span>
    ${sub ? `<span class="wm-sub">${esc(SITE.sub)}</span>` : ''}
  </span>`;
  const attrs = `class="wordmark wm-${size}" aria-label="${esc(label)}"`;
  return tag === 'a'
    ? `<a ${attrs} href="${href}">${inner}</a>`
    : `<span ${attrs} role="img">${inner}</span>`;
}

/* ---------- media ---------- */

// Responsive <picture> for a processed plate.
export function picture(img, { sizes = '(min-width: 900px) 50vw, 92vw', eager = false, cls = '', alt } = {}) {
  const m = MANIFEST[img] ?? {};
  const widths = m.widths?.length ? m.widths : [640, 1024];
  const w = m.w ?? 1024;
  const h = m.h ?? 768;
  const srcset = (ext) => widths.map((x) => `/img/${img}-${x}.${ext} ${x}w`).join(', ');
  const fallback = `/img/${img}-${widths[widths.length - 1]}.jpg`;
  return `<picture${cls ? ` class="${cls}"` : ''}>
<source type="image/webp" srcset="${srcset('webp')}" sizes="${sizes}">
<img src="${fallback}" srcset="${srcset('jpg')}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt ?? plateAlt(img))}"${eager ? ' fetchpriority="high" decoding="sync"' : ' loading="lazy"'} decoding="async">
</picture>`;
}

// Figure with archival caption and plate credit.
export function figure(img, { caption, ratio, eager = false, sizes, cls = '', credit = true, parallax = false } = {}) {
  const classes = ['fig', cls, ratio ? `ratio-${ratio.replace('/', '-')}` : ''].filter(Boolean).join(' ');
  return `<figure class="${classes}">
<div class="fig-media"${parallax ? ' data-parallax' : ''}>${picture(img, { sizes, eager })}</div>
${caption || credit ? `<figcaption><span class="fig-cap">${esc(caption ?? '')}</span>${credit && PLATES[img]?.credit ? `<span class="fig-credit">${esc(PLATES[img].credit)}</span>` : ''}</figcaption>` : ''}
</figure>`;
}

/* ---------- editorial objects ---------- */

export const statCell = ({ v, u, note, label, source }, i, { withSource = true } = {}) => `
<div class="spec-cell">
  <span class="spec-n mono">${String(i + 1).padStart(2, '0')}</span>
  <span class="spec-v" data-count="${esc(v)}">${esc(v)}</span>
  <span class="spec-u">${esc(u)}</span>
  ${label ? `<span class="spec-l mono">${esc(label)}</span>` : ''}
  ${note ? `<span class="spec-note">${esc(note)}</span>` : ''}
  ${source && withSource ? `<span class="spec-note src-foot mono"><a href="/colophon/#${esc(source)}">SOURCE / ${esc(source.toUpperCase())}</a></span>` : ''}
</div>`;

export const listRow = ({ n, title, body }, i = 0) => `
<div class="lrow">
  <span class="lrow-n mono">${esc(n ?? String(i + 1).padStart(2, '0'))}</span>
  <span class="lrow-body">
    <span class="lrow-t">${esc(title)}</span>
    ${body ? `<span class="lrow-b">${esc(body)}</span>` : ''}
  </span>
</div>`;

export const pipeRow = ({ k, title, body }, i = 0) => `
<div class="prow">
  <span class="prow-k mono">${esc(k ?? String(i + 1).padStart(2, '0'))}</span>
  <span class="prow-t">${esc(title)}</span>
  <span class="prow-b">${esc(body)}</span>
</div>`;

// Section head used inside story bodies.
export const sectionHead = (no, label, title, note) => `
<header class="sec-head">
  ${kicker(no, label)}
  ${title ? `<h2 class="sec-title">${esc(title)}</h2>` : ''}
  ${note ? `<p class="sec-note">${esc(note)}</p>` : ''}
</header>`;

export const arrow = '<span class="arrow" aria-hidden="true">→</span>';
