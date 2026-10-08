// FEATURE 05 — the contemporary story. Boon against bane.
export default {
  slug: 'young-generation-ai',
  no: '05',
  kind: 'FEATURE',
  section: { label: 'AI', href: '/topics/ai/' },
  topics: ['ai', 'people'],
  runtime: 'the generation',
  title: ['YOUNG GENERATION', '& AI'],
  sub: 'BOON, BANE — OR BOTH?',
  dek: 'Our parents grew up with search. We are growing up with something that answers back.',
  meta: { date: 'ISSUE 001', read: '6 MIN', ref: 'P. 26', plate: 'PLATE 12' },
  hero: {
    img: 'youth-ai',
    layout: 'split-left',
    ratio: '4/3',
    caption: 'FIG. 01 — THE NEW STUDY DESK. A QUESTION, A SCREEN, AND A NOTEBOOK STILL OPEN — THE ARGUMENT OF THIS FEATURE IN ONE FRAME.',
    aside: {
      kind: 'statement',
      title: 'THE QUESTION',
      lines: ['ARE WE USING AI —', 'OR IS AI USING US?'],
    },
  },
  blocks: [
    {
      t: 'lede',
      layout: 'narrow',
      text: 'We stopped searching and started asking. That shift is small enough to miss and large enough to change how a generation learns to think.',
    },
    {
      t: 'statement',
      layout: 'left',
      size: 'lg',
      lines: [
        { text: 'ARE WE USING AI —', size: 'xl' },
        { text: 'OR IS AI USING US?', size: 'xl' },
      ],
    },
    {
      t: 'list',
      layout: 'right',
      title: 'THE SUPERPOWER READING',
      note: 'WHAT IS GENUINELY NEW AND GENUINELY GOOD.',
      items: [
        { n: '01', title: 'SUPER-TUTOR', body: 'Any concept, explained again, at 2 a.m., without judgement.' },
        { n: '02', title: 'SUPER-CREATOR', body: 'Draft writing, design, code and presentations in minutes instead of weeks.' },
        { n: '03', title: 'SUPER-ACCELERATOR', body: 'The distance between an idea and a first version has collapsed.' },
        { n: '04', title: 'NEW CAREERS', body: 'Roles that did not exist four years ago are hiring this year.' },
      ],
    },
    {
      t: 'pair',
      layout: 'full',
      title: 'BOTH READINGS OF ONE TOOL',
      insight: 'EVERY SUPERPOWER ARRIVES WITH A PRICE LIST.',
      left: {
        title: 'BOON — AI AS LEVERAGE',
        items: [
          'LEARNING AT YOUR OWN PACE, IN YOUR OWN LANGUAGE.',
          'FIRST DRAFTS THAT WOULD OTHERWISE NEVER EXIST.',
          'ACCESS FOR PEOPLE WITHOUT PRIVATE TUITION.',
          'MORE TIME FOR THE PART ONLY A HUMAN CAN DO.',
        ],
      },
      right: {
        title: 'BANE — AI AS SUBSTITUTE',
        items: [
          'DEPENDENCE — USING IT TO AVOID LEARNING ALTOGETHER.',
          'COMPARISON — SYNTHETIC PERFECTION AS A MIRROR.',
          'DECEPTION — DEEPFAKES, CLONED VOICES, FAKE OFFERS.',
          'ATROPHY — THE SKILL YOU NEVER PRACTISED.',
        ],
      },
    },
    {
      t: 'statement',
      layout: 'full',
      size: 'xl',
      lines: [
        { text: 'THE BIGGEST RISK?', size: 'md' },
        { text: 'STOPPING OURSELVES FROM THINKING.', size: 'xl' },
      ],
      tone: 'ink',
    },
    {
      t: 'fig',
      layout: 'wide',
      img: 'youth-night',
      ratio: '16/9',
      caption: 'FIG. 02 — THE HOUR THAT DECIDES IT. USE THE TOOL TO REACH A THOUGHT, OR USE IT TO AVOID ONE.',
    },
    {
      t: 'protocol',
      layout: 'full',
      title: 'THE SMART WAY FORWARD',
      note: 'A WORKING METHOD, NOT A MORAL POSITION.',
      rows: [
        { left: 'ASK AI TO EXPLAIN', right: 'THEN EXPLAIN IT BACK IN YOUR OWN WORDS.' },
        { left: 'ASK AI FOR IDEAS', right: 'THEN CHOOSE AND DEFEND ONE YOURSELF.' },
        { left: 'ASK AI FOR A DRAFT', right: 'THEN REWRITE EVERY LINE YOU DISAGREE WITH.' },
        { left: 'LET AI ACCELERATE YOU', right: 'NEVER LET IT THINK INSTEAD OF YOU.' },
      ],
      footer: 'USE AI. DON’T DEPEND ON AI.',
    },
    {
      t: 'edge',
      layout: 'full',
      title: 'KEEP YOUR HUMAN EDGE',
      note: 'THESE ARE NOT DOWNLOADABLE.',
      items: ['CRITICAL THINKING', 'CREATIVITY', 'COMMUNICATION', 'EMPATHY', 'LEADERSHIP'],
    },
    {
      t: 'statement',
      layout: 'left',
      size: 'lg',
      lines: [
        { text: 'THE FUTURE BELONGS TO THE PEOPLE WHO KNOW HOW TO WORK WITH AI —', size: 'md' },
        { text: 'NOT TO THE PEOPLE WHO SIMPLY WORK FOR IT.', size: 'lg' },
      ],
    },
  ],
  closing: ['ASK THE MACHINE.', 'KEEP THE QUESTION YOURS.'],
  sources: ['genai', 'imagenet'],
};
