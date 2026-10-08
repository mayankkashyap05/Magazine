// ENIAC — publication identity, issue metadata and editorial copy.
// Content is data. Presentation lives in /templates, the design system in /src/assets.

export const SITE = {
  name: 'ENIAC',
  sub: 'DIGITAL MAGAZINE',
  tagline: 'OLD MACHINE. NEW THINKING.',
  statement:
    'ENIAC is a magazine about computing, artificial intelligence, security and digital life — and about the people who keep asking what all of it is for.',
  coverStatement: 'THE MACHINES THAT CHANGED HOW WE THINK.',
  coverNote:
    'A first issue about computing, intelligence and the people in between. From a counting board in Mesopotamia to a model that writes back.',
  volume: 'VOL. 01',
  issue: 'ISSUE 001',
  year: '2026',
  edition: 'DIGITAL EDITION',
  fileRef: 'FILE ENIAC-26-001',
  /* primary navigation — deliberately short labels, one line */
  nav: [
    { href: '/', label: 'HOME' },
    { href: '/issue/', label: 'ISSUE' },
    { href: '/topics/technology/', label: 'TECHNOLOGY' },
    { href: '/topics/ai/', label: 'AI' },
    { href: '/topics/cyber/', label: 'CYBER' },
    { href: '/topics/culture/', label: 'CULTURE' },
    { href: '/topics/people/', label: 'PEOPLE' },
    { href: '/archive/', label: 'ARCHIVE' },
  ],
  /* footer navigation — the full index */
  index: [
    { href: '/', label: 'HOME' },
    { href: '/issue/', label: 'THIS ISSUE' },
    { href: '/timeline/', label: 'TIMELINE' },
    { href: '/topics/', label: 'SECTIONS' },
    { href: '/archive/', label: 'ARCHIVE' },
    { href: '/colophon/', label: 'COLOPHON' },
  ],
  /* the masthead statement inside the editor's note */
  editorial: {
    label: 'EDITOR’S NOTE',
    title: 'WE NAMED THIS MAGAZINE AFTER A MACHINE THAT FILLED A ROOM.',
    paras: [
      'ENIAC weighed about thirty tons, drew 150 kilowatts and could perform roughly five thousand additions a second — extraordinary for 1946, unremarkable for a doorbell today. It had no screen, no keyboard and no stored memory of its own. Programming it meant moving cables with your hands.',
      'Its story is the story of every technology since. A tool is built by people, for a problem; then the tool quietly reshapes the people who built it. That loop is the real subject of this magazine — not the hardware.',
      'So this first issue travels from a counting board in Mesopotamia to a model that writes back, and stays on one question the whole way down: what are we becoming, alongside the things we make?',
    ],
    sign: 'THE EDITORS',
    file: 'ENIAC / VOL. 01 — ISSUE 001',
  },
  /* the closing page of the issue */
  final: {
    label: 'END OF ISSUE 001',
    lines: ['WE BUILT MACHINES', 'TO THINK FASTER.'],
    lines2: ['NOW WE MUST LEARN', 'HOW TO THINK BETTER.'],
    note: 'TECHNOLOGY IS NOT ONLY ABOUT MACHINES. IT IS ABOUT PEOPLE.',
    credit: 'ENIAC — VOL. 01, ISSUE 001, 2026',
  },
  footer: {
    brandLine: 'TECHNOLOGY. PEOPLE. IDEAS.',
    issue: 'VOL. 01 — ISSUE 001 / 2026',
    imprint: 'SET IN FRAUNCES, IBM PLEX SANS & IBM PLEX MONO.',
    paper: 'DIGITAL PAPER #F2EDE3 · INK #16130E · SIGNAL #C0442A.',
    rights: '© 2026 ENIAC. AN INDEPENDENT EDITORIAL PUBLICATION.',
    note: 'EVERY NUMBER IN THIS ISSUE IS SOURCED. SEE /COLOPHON.',
  },
  /* short line used in meta tags */
  seo: {
    home: 'ENIAC — a digital magazine about computing, artificial intelligence, security and digital life, from the abacus to generative AI.',
  },
};
