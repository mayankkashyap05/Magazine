// Page shell: <head>, masthead, final page, footer.
import { SITE } from '../content/site.mjs';
import { esc, wordmark, arrow, cardColumn } from './ui.mjs';

const BUILD_DATE = new Date().toISOString().slice(0, 10);

const FONTS =
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap';

function head({ title, desc, url, jsonLd }) {
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#F2EDE3">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="alternate" type="application/rss+xml" title="ENIAC" href="/feed.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="${FONTS}">
<link rel="stylesheet" href="${FONTS}" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="${FONTS}"></noscript>
<link rel="stylesheet" href="/assets/style.css">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:image" content="/img/og.jpg">
<meta property="og:url" content="${esc(url)}">
<meta name="twitter:card" content="summary_large_image">
<script>document.documentElement.className=document.documentElement.className.replace('no-js','js')</script>
<script type="module" src="/assets/main.js"></script>
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
</head>`;
}

function masthead(current = []) {
  const cur = Array.isArray(current) ? current : [current];
  const links = SITE.nav
    .map((n) => {
      const active = cur.includes(n.href);
      return `<li><a href="${n.href}"${active ? ' aria-current="page"' : ''}>${n.label}</a></li>`;
    })
    .join('');
  return `<header class="masthead" data-masthead>
  <div class="mh-meta">
    <span class="mono">${SITE.volume} — ${SITE.issue}</span>
    <span class="mono mh-tag">${SITE.tagline}</span>
    <span class="mono">${SITE.year} / ${SITE.edition}</span>
  </div>
  <div class="mh-main">
    ${wordmark({ size: 'sm', sub: true })}
    <nav class="nav" aria-label="Sections">
      <ul>${links}</ul>
    </nav>
    <button class="menu-btn mono" type="button" aria-expanded="false" aria-controls="menu" data-menu-btn>INDEX +</button>
  </div>
  <div class="mh-rule" aria-hidden="true"></div>
</header>
<div class="menu" id="menu" data-menu hidden>
  <div class="menu-inner">
    <p class="menu-k mono">${SITE.volume} — ${SITE.issue} / ${SITE.year}</p>
    <nav aria-label="Full index">
      <ol class="menu-list">
        ${SITE.nav
          .map(
            (n, i) => `<li><a href="${n.href}"><span class="menu-n mono">${String(i + 1).padStart(2, '0')}</span><span class="menu-l">${n.label}</span></a></li>`
          )
          .join('')}
      </ol>
    </nav>
    <div class="menu-foot">
      <p class="mono">${esc(SITE.tagline)}</p>
      <p class="mono menu-foot-r">${esc(SITE.fileRef)}</p>
    </div>
  </div>
</div>`;
}

function finalPage() {
  const { label, lines, lines2, note, credit } = SITE.final;
  return `<section class="final" aria-labelledby="final-title">
  <div class="wrap">
    <p class="final-k mono">${esc(label)}</p>
    <h2 class="final-title" id="final-title">
      <span class="final-l">${lines.map(esc).join('<br>')}</span>
      <span class="final-l final-l-alt">${lines2.map(esc).join('<br>')}</span>
    </h2>
    <div class="final-foot">
      <p class="final-note">${esc(note)}</p>
      <p class="final-mark">${wordmark({ size: 'lg', sub: false, tag: 'span' })}</p>
    </div>
    <p class="final-credit mono">${esc(credit)}</p>
  </div>
</section>`;
}

function footer() {
  const nav = SITE.index.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('');
  return `<footer class="foot">
  <div class="wrap foot-grid">
    <div class="foot-col foot-col-id">
      ${wordmark({ size: 'md', sub: false, tag: 'span' })}
      <p class="foot-line">${esc(SITE.footer.brandLine)}</p>
      <p class="foot-note">${esc(SITE.footer.note)}</p>
    </div>
    <div class="foot-col">
      <p class="foot-h mono">INDEX</p>
      <ul class="foot-nav">${nav}</ul>
    </div>
    <div class="foot-col">
      <p class="foot-h mono">ISSUE</p>
      <p class="foot-copy">${esc(SITE.footer.issue)}<br>${esc(SITE.edition)}</p>
      <p class="foot-h mono foot-h-2">COLOPHON</p>
      <p class="foot-copy">${esc(SITE.footer.imprint)}<br>${esc(SITE.footer.paper)}</p>
    </div>
    <div class="foot-col">
      <p class="foot-h mono">CREDITS</p>
      <p class="foot-copy">${esc(SITE.footer.rights)}</p>
      <p class="foot-copy">EDITORIAL, DESIGN &amp; ENGINEERING: THE ENIAC DESK.</p>
    </div>
  </div>
  <div class="wrap foot-tail">
    <span class="mono">${esc(SITE.fileRef)}</span>
    <span class="mono foot-stamp">BUILT ${esc(BUILD_DATE)} · STATIC EDITION · NOTHING TRACKED</span>
    ${cardColumn('foot-col-mark', 6, [0, 2, 5])}
    <span class="mono">END OF FILE</span>
  </div>
</footer>`;
}

export function page({ title, desc, url = 'https://eniac.example/', body, current = [], bodyClass = '', jsonLd = null, progress = false }) {
  return `${head({ title, desc, url, jsonLd })}
<body class="${bodyClass}">
<a class="skip" href="#main">SKIP TO CONTENT</a>
${masthead(current)}
<main id="main">
${body}
</main>
${finalPage()}
${footer()}
</body>
</html>`;
}

export { finalPage, masthead, footer, arrow };
