// ABOUT — the philosophy and the colophon.
import { kicker } from '../ui.mjs';

export const aboutBody = () => `
<section class="page-head">
  <div class="wrap">
    ${kicker('MANIFESTO', 'ABOUT / WHY THIS EXISTS')}
    <h1 class="ph-title">COMPUTING IS A<br>HUMAN STORY.</h1>
  </div>
</section>
<section class="about-body">
  <div class="wrap about-grid">
    <div class="about-col">
      <p class="prose lg">Computing is more than machines. It is a history of curiosity, problem-solving and invention — of people building tools to think faster, create more, and understand more.</p>
      <p class="prose">This publication follows one thread: <strong>HUMAN → MACHINE → INTELLIGENCE → SOCIETY → FUTURE.</strong> Where computing came from. What it has become. What we are becoming alongside it.</p>
      <p class="prose">We write for students, educators and the technology-curious. Short sentences. Honest numbers. Pictures that carry the argument. We would rather show you 17,468 vacuum tubes than describe them in a paragraph.</p>
    </div>
    <div class="about-col">
      <p class="sec-note mono">WHAT WE EXPLORE</p>
      <ul class="about-list">
        <li>COMPUTING HISTORY</li>
        <li>ARTIFICIAL INTELLIGENCE</li>
        <li>EDUCATION</li>
        <li>CYBERSECURITY</li>
        <li>DIGITAL CULTURE</li>
        <li>HUMAN BEHAVIOR</li>
      </ul>
      <p class="sec-note mono">HOW WE DESIGN</p>
      <ul class="about-list">
        <li>80% GRAPHICS / 20% TEXT</li>
        <li>PAPER + INK + ONE ACCENT</li>
        <li>RULES, NUMBERS, CAPTIONS</li>
        <li>WHITESPACE IS STRUCTURE</li>
        <li>HISTORY, NOT DECORATION</li>
      </ul>
    </div>
  </div>
  <div class="wrap about-close">
    <p class="bs-line bs-2">WE BUILT MACHINES TO HELP US THINK.<br>THE MACHINES LEARNED.<br><span class="plus-note">NOW WE DECIDE HOW WE WANT TO THINK WITH THEM.</span></p>
  </div>
</section>`;
