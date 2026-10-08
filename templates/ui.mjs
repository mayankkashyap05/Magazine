// Shared markup primitives. Pure functions of data → HTML string.
import { IMAGES } from '../content/images.mjs';

let MANIFEST = {};
export function setManifest(m) {
  MANIFEST = m;
}

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Small technical label, e.g. SYSTEM / HISTORY / 1946
export const tech = (text, cls = '') =>
  `<span class="tech${cls ? ' ' + cls : ''}">${esc(text)}</span>`;

// Section kicker: number + label, e.g. 02 / FEATURE
export const kicker = (no, label) =>
  `<p class="kicker"><span class="kicker-no">${esc(no)}</span><span class="kicker-rule" aria-hidden="true"></span><span class="kicker-label">${esc(label)}</span></p>`;

// Responsive <picture> for a processed plate.
export function picture(img, { sizes = '(min-width: 900px) 50vw, 92vw', eager = false, cls = '' } = {}) {
  const m = MANIFEST[img];
  const widths = m ? m.widths : [640, 1024];
  const w = m ? m.w : 1024;
  const h = m ? m.h : 768;
  const srcsetWebp = widths.map((x) => `/img/${img}-${x}.webp ${x}w`).join(', ');
  const srcsetJpg = widths.map((x) => `/img/${img}-${x}.jpg ${x}w`).join(', ');
  const fallback = `/img/${img}-${widths[widths.length - 1]}.jpg`;
  return `<picture${cls ? ` class="${cls}"` : ''}>
<source type="image/webp" srcset="${srcsetWebp}" sizes="${sizes}">
<img src="${fallback}" srcset="${srcsetJpg}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(IMAGES[img]?.alt ?? '')}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">
</picture>`;
}

// Figure with archival caption.
export function figure(img, { caption, ratio, eager = false, sizes, cls = '' } = {}) {
  const clsAttr = ['fig', cls, ratio ? `ratio-${ratio.replace('/', '-')}` : ''].filter(Boolean).join(' ');
  return `<figure class="${clsAttr}">
${picture(img, { sizes, eager })}
${caption ? `<figcaption class="mono">${esc(caption)}</figcaption>` : ''}
</figure>`;
}

// Statistic as a design object.
export const stat = ({ v, u, note }) => `
<div class="stat">
  <span class="stat-v">${esc(v)}</span>
  <span class="stat-u mono">${esc(u)}</span>
  ${note ? `<span class="stat-note">${esc(note)}</span>` : ''}
</div>`;

// Numbered list row.
export const listRow = ({ n, title, body }) => `
<div class="lrow">
  <span class="lrow-n mono">${esc(n)}</span>
  <h3 class="lrow-t">${esc(title)}</h3>
  <p class="lrow-b">${esc(body)}</p>
</div>`;

export const sectionHead = (no, label, title, note) => `
<header class="sec-head">
  ${kicker(no, label)}
  ${title ? `<h2 class="sec-title">${esc(title)}</h2>` : ''}
  ${note ? `<p class="sec-note mono">${esc(note)}</p>` : ''}
</header>`;
