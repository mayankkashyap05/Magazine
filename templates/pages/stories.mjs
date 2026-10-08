// STORIES — the index of features in this issue.
import { STORIES } from '../../content/stories.mjs';
import { kicker } from '../ui.mjs';
import { tease } from '../teasers.mjs';

export const storiesBody = () => `
<section class="page-head">
  <div class="wrap">
    ${kicker('INDEX', 'STORIES / ISSUE 001')}
    <h1 class="ph-title">SIX FEATURES.<br>ONE QUESTION.</h1>
    <p class="ph-dek">Where computing came from, what it has become, and what we are becoming alongside it.</p>
  </div>
</section>
<section class="stories-index">
  <div class="wrap">
    <div class="teases">${STORIES.map((s) => tease(s)).join('')}</div>
  </div>
</section>`;
