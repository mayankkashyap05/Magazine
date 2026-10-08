// Editorial topics. Each aggregates stories and timeline nodes under one theme.
export const TOPICS = [
  {
    slug: 'computing',
    title: 'COMPUTING',
    line: 'The machines — from counting boards to silicon.',
    stories: ['eniac', 'from-computer-to-ai'],
    timeline: ['abacus', 'pascal', 'babbage', 'eniac', 'microprocessor'],
  },
  {
    slug: 'ai',
    title: 'AI',
    line: 'Machines that learn, and what we do with them.',
    stories: ['from-computer-to-ai', 'young-generation-ai'],
    timeline: ['bigdata', 'ml', 'genai'],
  },
  {
    slug: 'education',
    title: 'EDUCATION',
    line: 'How people learn to build, not just to know.',
    stories: ['bca-launchpad'],
    timeline: ['lovelace'],
  },
  {
    slug: 'cybersecurity',
    title: 'CYBERSECURITY',
    line: 'The human layer of security. The click is the frontier.',
    stories: ['cybersecurity'],
    timeline: ['internet'],
  },
  {
    slug: 'culture',
    title: 'CULTURE',
    line: 'Games, habits, attention — digital life examined.',
    stories: ['brain-games'],
    timeline: ['internet', 'genai'],
  },
  {
    slug: 'human-technology',
    title: 'HUMAN + TECHNOLOGY',
    line: 'The relationship itself. The question the publication keeps asking.',
    stories: ['young-generation-ai', 'brain-games', 'from-computer-to-ai'],
    timeline: ['lovelace', 'genai'],
  },
];
