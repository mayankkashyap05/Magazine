// FEATURE 01 — the historical spine of Issue 001.
export default {
  slug: 'from-computer-to-ai',
  no: '01',
  kind: 'FEATURE',
  section: { label: 'TECHNOLOGY', href: '/topics/technology/' },
  topics: ['technology', 'ai', 'people'],
  runtime: 'the acceleration',
  title: ['FROM COMPUTER', 'TO AI'],
  sub: 'A JOURNEY FROM COUNTING TO CREATING',
  dek: '5,000 years of human innovation, compressed into one sequence — and one argument about where it is going.',
  meta: { date: 'ISSUE 001', read: '7 MIN', ref: 'P. 02', plate: 'PLATE 01' },
  hero: {
    img: 'hero-timeline',
    layout: 'bleed',
    ratio: '16/9',
    caption:
      'FIG. 01 — INSTRUMENTS OF CALCULATION IN ORDER OF APPEARANCE. Every object here began as an answer to the same human question: how much, how fast, what next?',
  },
  blocks: [
    {
      t: 'lede',
      layout: 'left',
      text: 'We began with beads. We are ending up — for now — with models that write back. Nothing in between was inevitable, and none of it was done by machines alone.',
    },
    {
      t: 'statement',
      layout: 'right',
      size: 'md',
      lines: [
        { text: 'EVERY COMPUTER IS A HUMAN ARGUMENT', size: 'lg' },
        { text: 'about what thinking is, written in materials we happened to have at the time — wood, brass, glass, silicon.', size: 'sm' },
      ],
    },
    { t: 'rule', layout: 'full' },
    { t: 'timelineIndex', layout: 'full', title: 'THE JOURNEY', note: 'FIFTEEN MARKS. THE SHRINKING GAPS ARE THE STORY.' },
    {
      t: 'fig',
      layout: 'wide',
      img: 'abacus-detail',
      ratio: '4/3',
      caption:
        'FIG. 02 — c. 3000 BC. Position becomes a number you can move with a finger. The first interface is a bead.',
    },
    {
      t: 'ladder',
      layout: 'right',
      title: 'THREE LEVELS OF AI',
      note: 'EACH RUNG STANDS ON THE ONE BELOW IT.',
      steps: [
        { k: 'L1', title: 'MACHINE LEARNING', body: 'Learning patterns from data instead of following rules written by hand.' },
        { k: 'L2', title: 'DEEP LEARNING', body: 'Many layers of simple units, trained on enormous sets of examples.' },
        { k: 'L3', title: 'GENERATIVE AI', body: 'Producing new text, images, code or audio from what was learned.' },
      ],
    },
    {
      t: 'statement',
      layout: 'left',
      size: 'lg',
      lines: [
        { text: 'THE COMPUTER WAS BUILT TO CALCULATE.', size: 'lg' },
        { text: 'AI IS BEING BUILT TO ASSIST WITH DECISIONS, CREATION AND PROBLEM-SOLVING.', size: 'md' },
      ],
    },
    {
      t: 'pair',
      layout: 'full',
      title: 'THE ONLY QUESTION THAT MATTERS',
      insight: 'THE FRAMING WAS ALWAYS WRONG.',
      left: {
        title: 'THE OLD FRAME',
        items: [
          'COMPUTER VS. HUMAN — A CONTEST.',
          'MACHINES REPLACE PEOPLE.',
          'THE FUTURE ARRIVES WITHOUT US.',
        ],
      },
      right: {
        title: 'THE USEFUL FRAME',
        items: [
          'COMPUTER + HUMAN — A COLLABORATION.',
          'MACHINES EXTEND WHAT PEOPLE START.',
          'THE FUTURE IS BUILT BY WHOEVER SHOWS UP.',
        ],
      },
    },
    {
      t: 'pull',
      layout: 'narrow',
      lines: ['THE TOOL GOT SMARTER.', 'THE DECISION IS STILL OURS.'],
      cite: 'ENIAC, VOL. 01',
    },
  ],
  closing: ['WE BEGAN WITH A TOOL THAT HELPED US COUNT.', 'WE ARE BUILDING TOOLS THAT HELP US CREATE.'],
  sources: ['abacus', 'pascal', 'babbage', 'lovelace', 'turing', 'eniac-first', 'transistor-ic', 'microprocessor', 'internet-1991', 'imagenet', 'genai'],
};
