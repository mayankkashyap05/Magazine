// 404 — an out-of-issue page.
import { esc, kicker, arrow } from '../ui.mjs';

export const notfoundBody = () => `<section class="nf">
  <div class="wrap">
    ${kicker('SYSTEM', 'ERROR / 404')}
    <h1 class="nf-title">PAGE NOT<br>IN THIS ISSUE.</h1>
    <p class="nf-dek">The requested page could not be located in Volume 01. It may have been moved, or it may never have been printed.</p>
    <p class="nf-links mono">
      <a class="link-arrow" href="/">FRONT PAGE ${arrow}</a>
      <a class="link-arrow" href="/archive/">ARCHIVE ${arrow}</a>
    </p>
  </div>
</section>`;
