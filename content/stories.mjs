// The six features of Issue 001, in reading order.
// Each feature is its own module so future issues can be assembled without touching templates.
import f1 from './features/01-from-computer-to-ai.mjs';
import f2 from './features/02-eniac.mjs';
import f3 from './features/03-bca-launchpad.mjs';
import f4 from './features/04-cybersecurity.mjs';
import f5 from './features/05-young-generation-ai.mjs';
import f6 from './features/06-brain-games.mjs';

export const STORIES = [f1, f2, f3, f4, f5, f6];

export const storyBySlug = (slug) => STORIES.find((s) => s.slug === slug);
export const storyNo = (slug) => String(STORIES.findIndex((s) => s.slug === slug) + 1).padStart(2, '0');
