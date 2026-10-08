// The five editorial sections. Each aggregates features, timeline nodes and plates.
export const TOPICS = [
  {
    slug: 'technology',
    title: 'TECHNOLOGY',
    kicker: 'SECTION 01',
    line: 'The machines themselves — from counting boards to silicon, and the people who build them.',
    stories: ['eniac', 'from-computer-to-ai'],
    timeline: ['abacus', 'babbage', 'turing', 'eniac', 'microprocessor', 'pc'],
    plates: ['eniac-room', 'vacuum-tube', 'silicon-detail', 'terminal-lab'],
  },
  {
    slug: 'ai',
    title: 'AI',
    kicker: 'SECTION 02',
    line: 'Systems that learn, generate and decide — and the humans still expected to think.',
    stories: ['from-computer-to-ai', 'young-generation-ai'],
    timeline: ['turing', 'ml', 'deep', 'genai'],
    plates: ['youth-ai', 'hero-timeline'],
  },
  {
    slug: 'cyber',
    title: 'CYBER',
    kicker: 'SECTION 03',
    line: 'Security is a human subject. The frontier is a click, not a firewall.',
    stories: ['cybersecurity'],
    timeline: ['internet'],
    plates: ['cybersecurity'],
  },
  {
    slug: 'culture',
    title: 'CULTURE',
    kicker: 'SECTION 04',
    line: 'Attention, play and habit in a screen-lit life — examined without panic.',
    stories: ['brain-games'],
    timeline: ['internet', 'genai'],
    plates: ['gaming-brain'],
  },
  {
    slug: 'people',
    title: 'PEOPLE',
    kicker: 'SECTION 05',
    line: 'The humans behind the hardware, and the generation now growing up beside AI.',
    stories: ['eniac', 'bca-launchpad', 'young-generation-ai'],
    timeline: ['lovelace', 'eniac', 'genai'],
    plates: ['eniac-programmers', 'bca-launchpad', 'youth-ai'],
  },
];

export const topicBySlug = (slug) => TOPICS.find((t) => t.slug === slug);
