// COLOPHON — sources, qualifications, the plate note, and how the magazine is made.
import { FACTS, IMAGE_NOTE } from '../../content/sources.mjs';
import { SITE } from '../../content/site.mjs';
import { esc, kicker, divider } from '../ui.mjs';

export const colophonBody = () => `<section class="page-head">
  <div class="wrap">
    ${kicker('APPENDIX', 'COLOPHON / SOURCES &amp; SPECIFICATIONS')}
    <h1 class="ph-title">WHERE EVERY<br>NUMBER COMES FROM.</h1>
    <p class="ph-dek">ENIAC does not print a figure it cannot trace. Where a claim is contested, the magazine says so in the entry below rather than smoothing it over.</p>
  </div>
</section>

<section class="colophon-page">
  <div class="wrap col-grid">
    <div class="col-main">
      ${divider('SOURCES')}
      <ol class="facts">
        ${FACTS.map(
          (f) => `<li class="fact" id="${esc(f.id)}">
          <p class="fact-claim">${esc(f.claim)}</p>
          <p class="fact-src mono">${esc(f.source)}</p>
          ${f.note ? `<p class="fact-note">${esc(f.note)}</p>` : ''}
          <a class="fact-link mono" href="#${esc(f.id)}">#${esc(f.id.toUpperCase())}</a>
        </li>`
        ).join('')}
      </ol>

      ${divider('A NOTE ON THE PLATES')}
      <section class="img-note">
        <h2 class="img-note-t">${esc(IMAGE_NOTE.title)}</h2>
        <p class="img-note-b">${esc(IMAGE_NOTE.body)}</p>
      </section>
    </div>

    <aside class="col-aside" aria-label="Specifications">
      <h2 class="col-h mono">THE MAGAZINE</h2>
      <dl class="spec-dl">
        <div><dt>NAME</dt><dd>${esc(SITE.name)} — ${esc(SITE.sub)}</dd></div>
        <div><dt>VOLUME</dt><dd>${esc(SITE.volume)} — ${esc(SITE.issue)} / ${esc(SITE.year)}</dd></div>
        <div><dt>STANDPOINT</dt><dd>${esc(SITE.tagline)}</dd></div>
        <div><dt>FILE</dt><dd>${esc(SITE.fileRef)}</dd></div>
      </dl>

      <h2 class="col-h mono">TYPOGRAPHY</h2>
      <dl class="spec-dl">
        <div><dt>DISPLAY</dt><dd>Fraunces — a soft-serif with an optical size axis, set tight and large.</dd></div>
        <div><dt>BODY</dt><dd>IBM Plex Sans — the reading voice, 400 and 500.</dd></div>
        <div><dt>TECHNICAL</dt><dd>IBM Plex Mono — dates, specifications, captions, coordinates.</dd></div>
      </dl>

      <h2 class="col-h mono">PALETTE</h2>
      <dl class="spec-dl">
        <div><dt>PAPER</dt><dd>#F2EDE3</dd></div>
        <div><dt>INK</dt><dd>#14110C</dd></div>
        <div><dt>SIGNAL</dt><dd>#C0442A — one accent, used like a warning lamp.</dd></div>
      </dl>

      <h2 class="col-h mono">CORRECTIONS</h2>
      <p class="col-p">Errors are corrected in place and listed here on the date of correction. Nothing is altered silently.</p>
      <p class="col-p mono col-empty">NO CORRECTIONS PUBLISHED YET — ISSUE 001.</p>

      <h2 class="col-h mono">RIGHTS</h2>
      <p class="col-p">${esc(SITE.footer.rights)}</p>
      <p class="col-p">Archival plates: U.S. Army Signal Corps, public domain. All other plates are illustrative composites produced for this issue and are captioned as editorial images.</p>
    </aside>
  </div>
</section>`;
