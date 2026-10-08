// The signature sequence of the issue: fifteen milestones.
// `y` is the numeric year (negative = BCE) and drives the accelerator axis;
// `pace` controls editorial breathing room in the vertical index.
//
// Two axis scales are computed at build time so the reader can see the same
// data two ways — linear (true to scale, the modern era collapses to a hairline)
// and logarithmic (equal space per order of magnitude of years-ago).

export const TIMELINE = [
  {
    key: 'abacus',
    year: 'c. 3000 BC',
    y: -3000,
    title: 'THE ABACUS',
    tag: 'CALCULATION',
    body: 'Counting boards appear in Mesopotamia. Calculation becomes something you can touch — beads, grooves, position, memory.',
    pace: 'wide',
    major: true,
    fact: 'The earliest known counting devices predate writing.',
  },
  {
    key: 'pascal',
    year: '1642',
    y: 1642,
    title: 'PASCAL’S CALCULATOR',
    tag: 'MECHANICS',
    body: 'Blaise Pascal builds one of the first mechanical calculators — gears that add and subtract, so arithmetic can happen without a person watching it.',
    pace: 'wide',
  },
  {
    key: 'babbage',
    year: '1833–34',
    y: 1834,
    title: 'THE ANALYTICAL ENGINE',
    tag: 'DESIGN',
    body: 'Charles Babbage drafts a machine with a store, a mill and conditional branching — the conceptual shape of a computer, a century before one was built.',
    pace: 'mid',
    major: true,
  },
  {
    key: 'lovelace',
    year: '1843',
    y: 1843,
    title: 'ADA LOVELACE',
    tag: 'PROGRAM',
    body: 'Lovelace publishes her notes on the Engine, including a step-by-step method for computing Bernoulli numbers — widely regarded as the first computer program.',
    pace: 'mid',
  },
  {
    key: 'turing',
    year: '1936',
    y: 1936,
    title: 'THE UNIVERSAL MACHINE',
    tag: 'THEORY',
    body: 'Alan Turing describes a machine that can compute anything computable by following a table of instructions — the theoretical computer, nine years before an electronic one was built.',
    pace: 'mid',
    major: true,
    fact: '“On Computable Numbers” contains no hardware at all. It is a machine made of an argument.',
  },
  {
    key: 'eniac',
    year: '1946',
    y: 1946,
    title: 'ENIAC',
    tag: 'ELECTRONICS',
    body: 'Electronic computing begins. Thirty tons, 17,468 vacuum tubes, 5,000 additions a second — and six mathematicians wiring it by hand.',
    pace: 'mid',
    major: true,
    img: 'eniac-room',
  },
  {
    key: 'transistor',
    year: '1947',
    y: 1947,
    title: 'THE TRANSISTOR',
    tag: 'SOLID STATE',
    body: 'At Bell Labs, Bardeen, Brattain and Shockley demonstrate the transistor. The switch gets smaller, cooler and vastly more reliable than glass.',
    pace: 'dense',
  },
  {
    key: 'circuits',
    year: '1958',
    y: 1958,
    title: 'INTEGRATED CIRCUIT',
    tag: 'SCALE',
    body: 'Kilby and Noyce work out how to build many components on one piece of silicon. The machine stops being assembled and starts being printed.',
    pace: 'dense',
  },
  {
    key: 'microprocessor',
    year: '1971',
    y: 1971,
    title: 'MICROPROCESSOR',
    tag: 'SILICON',
    body: 'The Intel 4004 puts a processor on a single chip. Computing is now small enough to leave the laboratory.',
    pace: 'dense',
    img: 'silicon-detail',
  },
  {
    key: 'pc',
    year: '1977+',
    y: 1977,
    title: 'PERSONAL COMPUTER',
    tag: 'ACCESS',
    body: 'Machines arrive on desks and in homes. The user is no longer an institution — it is a person.',
    pace: 'dense',
    img: 'terminal-lab',
  },
  {
    key: 'internet',
    year: '1990s',
    y: 1991,
    title: 'THE INTERNET',
    tag: 'NETWORK',
    body: 'The web opens to the public in 1991. Computers that calculated alone begin to calculate together.',
    pace: 'dense',
  },
  {
    key: 'bigdata',
    year: '2000s',
    y: 2001,
    title: 'BIG DATA',
    tag: 'VOLUME',
    body: 'The world begins producing more information than any person could read. Scale itself becomes the engineering problem.',
    pace: 'dense',
    img: 'data-hall',
  },
  {
    key: 'ml',
    year: '2010s',
    y: 2010,
    title: 'MACHINE LEARNING',
    tag: 'LEARNING',
    body: 'Instead of being told the rules, computers begin to find patterns in examples — and improve with more of them.',
    pace: 'dense',
  },
  {
    key: 'deep',
    year: '2012+',
    y: 2012,
    title: 'DEEP LEARNING',
    tag: 'NETWORKS',
    body: 'Stacked neural networks plus cheap parallel silicon produce sudden leaps in vision, speech and language.',
    pace: 'dense',
  },
  {
    key: 'genai',
    year: '2022+',
    y: 2022,
    title: 'GENERATIVE AI',
    tag: 'GENERATION',
    body: 'Systems begin to produce text, images, code and audio on request. The tool starts to create — and everyone has to decide what that means.',
    pace: 'dense',
    major: true,
    img: 'youth-ai',
  },
];

export const TIMELINE_RANGE = { oldest: -3000, newest: 2026 };

/* --- axis maths ---------------------------------------------------------
   linear: true proportion. log: equal space per order of magnitude of
   "years ago", which is the honest way to display an accelerating scale. */
const l10 = (x) => Math.log10(x);

export function axisPositions(nodes = TIMELINE) {
  const dMax = TIMELINE_RANGE.newest - TIMELINE_RANGE.oldest;
  const dMin = 4; // floor, so "years ago" stays positive near the present
  const span = l10(dMax) - l10(dMin);
  const linSpan = TIMELINE_RANGE.newest - TIMELINE_RANGE.oldest;
  return nodes.map((n) => ({
    key: n.key,
    linear: +(((n.y - TIMELINE_RANGE.oldest) / linSpan) * 100).toFixed(3),
    log: +((1 - (l10(Math.max(TIMELINE_RANGE.newest - n.y, dMin)) - l10(dMin)) / span) * 100).toFixed(3),
  }));
}

/* Chart captions, computed from the data so they can never drift out of step. */
const linearPos = axisPositions();
const total = TIMELINE.length;
const lateCount = TIMELINE.filter(
  (t) => (t.y - TIMELINE_RANGE.oldest) / (TIMELINE_RANGE.newest - TIMELINE_RANGE.oldest) > 0.92
).length;
const word = { 1: 'ONE', 2: 'TWO', 3: 'THREE', 4: 'FOUR', 5: 'FIVE', 6: 'SIX', 7: 'SEVEN', 8: 'EIGHT', 9: 'NINE', 10: 'TEN', 11: 'ELEVEN', 12: 'TWELVE', 13: 'THIRTEEN', 14: 'FOURTEEN', 15: 'FIFTEEN' };

export const AXIS_CAPTIONS = {
  linear: `TRUE SCALE. ${word[lateCount] ?? lateCount} OF THESE ${word[total] ?? total} MILESTONES OCCUR INSIDE THE FINAL EIGHT PERCENT OF THE LINE.`,
  log: 'LOG SCALE. Equal width per order of magnitude of years-ago, so the modern era can be read.',
};
/* `modernBand` = how little of the true-scale line is left once the counting board
   is behind us. Computed from the second node, which is where that era begins. */
export const AXIS_META = { total, lateCount, modernBand: (100 - linearPos[1].linear).toFixed(1) };
