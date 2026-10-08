// Plate inventory: alt text (written as editorial descriptions) and aspect metadata.
// Raw widths/heights live in src/assets/img/manifest.json, written by tools/media.mjs.

export const PLATES = {
  'hero-timeline': {
    alt: 'Studio still life on cream paper: an abacus, a brass mechanical calculator, a glass vacuum tube, a hand-built circuit board, a bare silicon die, a beige keyboard and a modern processor board, arranged in a single row in order of invention.',
    credit: 'COMMISSIONED PLATE',
  },
  'abacus-detail': {
    alt: 'Overhead archival still life: a worn wooden abacus beside an open ruled notebook filled with pencil arithmetic and a steel draftsman’s compass.',
    credit: 'COMMISSIONED PLATE',
  },
  'punched-cards': {
    alt: 'Archival close-up of a fanned stack of punched cards on a scratched dark surface, the rectangular hole patterns catching raking light.',
    credit: 'COMMISSIONED PLATE',
  },
  'eniac-room': {
    alt: 'Archival photograph inside the ENIAC machine room: two long rows of dark panels studded with dials, switches and hand-wired cables, with two engineers consulting notes beneath bare ceiling lamps.',
    credit: 'U.S. ARMY SIGNAL CORPS / PUBLIC DOMAIN',
  },
  'eniac-programmers': {
    alt: 'Archival photograph of two of the ENIAC Six at a tall panel: one woman reaches up to seat a thick patch cable among dense loops of wiring while the other follows a printed table.',
    credit: 'U.S. ARMY SIGNAL CORPS / PUBLIC DOMAIN',
  },
  'vacuum-tube': {
    alt: 'Macro photograph of a dense grid of glass vacuum tubes seated in an aged panel, their filaments lit, wiring hand-soldered between the sockets.',
    credit: 'COMMISSIONED PLATE',
  },
  'silicon-detail': {
    alt: 'Macro photograph of a bare silicon processor die on a circuit board, showing the geometric metal interconnect layers and bond wires.',
    credit: 'COMMISSIONED PLATE',
  },
  'terminal-lab': {
    alt: 'Archival photograph of a 1970s computer laboratory: rows of beige CRT terminals on long desks, a tape cabinet at the far end, users seen from behind.',
    credit: 'COMMISSIONED PLATE',
  },
  'data-hall': {
    alt: 'Archival-style photograph of a long data centre aisle: two rows of grey server cabinets in one-point perspective with structured cabling overhead, emptier than expected.',
    credit: 'COMMISSIONED PLATE',
  },
  'bca-launchpad': {
    alt: 'Overhead still life on a drafting table: a hand-drawn technical flow diagram on large paper, a bare circuit board, a caliper, a compass and pencils.',
    credit: 'COMMISSIONED PLATE',
  },
  'cybersecurity': {
    alt: 'Overhead photograph on a pale desk: a phone with a blurred message, keys, a small brass padlock, papers and a wallet — the scene of an ordinary click.',
    credit: 'COMMISSIONED PLATE',
  },
  'youth-ai': {
    alt: 'Documentary photograph of a student at a desk, pen resting on an open notebook, thinking rather than typing, in warm window light.',
    credit: 'COMMISSIONED PLATE',
  },
  'youth-night': {
    alt: 'Documentary night photograph: a young person sitting on a bedroom floor with headphones on and a controller in hand, lit only by the screen.',
    credit: 'COMMISSIONED PLATE',
  },
  'controller-plate': {
    alt: 'Specimen still life on graph paper: a game controller opened into its shell halves, with button membranes, rumble motors, ribbon cable and circuit board laid out in rows beside a steel ruler.',
    credit: 'COMMISSIONED PLATE',
  },
  'gaming-brain': {
    alt: 'Specimen still life: a game controller laid on vintage anatomical plates of the human brain, with a steel ruler and dividers holding the drawing flat.',
    credit: 'COMMISSIONED PLATE',
  },
};

export const plateAlt = (name) => PLATES[name]?.alt ?? '';
