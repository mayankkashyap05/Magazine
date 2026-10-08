// Page shell: <head> metadata, masthead header, footer.
import { SITE } from '../content/site.mjs';
import { esc } from './ui.mjs';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap';

function head({ title, desc, path }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#F3EFE6">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:image" content="/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="/img/og.jpg">
<script type="module" src="/assets/main.js" defer></script>
</head>`;
}

function header(current) {
  const links = SITE.nav
    .map((n) => {
      const active = n.href === current;
      return `<li><a href="${n.href}"${active ? ' aria-current="page"' : ''}>${n.label}</a></li>`;
    })
    .join('');
  return `<header class="site-head">
  <div class="head-meta mono">
    <span>${SITE.volume} — ${SITE.issue}</span>
    <span class="head-tag">${SITE.tagline}</span>
    <span>${SITE.year}</span>
  </div>
  <div class="head-main">
    <a class="brand" href="/" aria-label="${SITE.name} — home">
      <span class="brand-a">BYTE</span><span class="brand-sep" aria-hidden="true">/</span><span class="brand-b">HUMAN</span>
    </a>
    <nav class="site-nav" aria-label="Primary">
      <ul>${links}</ul>
    </nav>
    <button class="menu-btn mono" aria-expanded="false" aria-controls="mobile-menu" data-menu-btn>MENU</button>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" data-menu hidden>
  <nav aria-label="Mobile">
    <ul>
      ${SITE.nav.map((n, i) => `<li><a href="${n.href}"><span class="mono mm-n">0${i + 1}</span>${n.label}</a></li>`).join('')}
    </ul>
  </nav>
  <p class="mono mm-foot">${SITE.volume} — ${SITE.issue} / ${SITE.year}</p>
</div>`;
}

function footer() {
  const nav = SITE.nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('');
  return `<footer class="site-foot">
  <div class="foot-close">
    <div class="wrap">
      <p class="foot-line">THE MACHINE CHANGES.<br>THE HUMAN QUESTION REMAINS.</p>
    </div>
  </div>
  <div class="wrap foot-grid">
    <div class="foot-col">
      <p class="foot-brand">BYTE<span aria-hidden="true">/</span>HUMAN</p>
      <p class="foot-statement">${SITE.statement}</p>
    </div>
    <div class="foot-col">
      <p class="foot-h mono">INDEX</p>
      <ul class="foot-nav">${nav}</ul>
    </div>
    <div class="foot-col">
      <p class="foot-h mono">COLOPHON</p>
      <p class="foot-copy">Set in Archivo &amp; IBM Plex.<br>Printed on digital paper, #F3EFE6.<br>One accent: #B65F32.</p>
    </div>
    <div class="foot-col">
      <p class="foot-h mono">EDITION</p>
      <p class="foot-copy">${SITE.volume} — ${SITE.issue}<br>${SITE.year}<br>© BYTE/HUMAN</p>
    </div>
  </div>
</footer>`;
}

export function page({ title, desc, path, body, current = '' }) {
  return `${head({ title, desc, path })}
<body>
<a class="skip" href="#main">Skip to content</a>
${header(current)}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>`;
}
