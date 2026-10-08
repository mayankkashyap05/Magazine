// The large marks used across the issue — numbers treated as editorial objects,
// not decoration. Every figure here is traceable to content/sources.mjs.

export const ENIAC_SPECS = [
  { v: '30', u: 'TONS', label: 'MASS', note: 'A machine the size of a large room.', source: 'eniac-spec' },
  { v: '17,468', u: 'VACUUM TUBES', label: 'SWITCHES', note: 'The glowing heart of the machine.', source: 'eniac-spec' },
  { v: '1,800', u: 'SQ. FT.', label: 'FLOOR AREA', note: 'It occupied an entire hall. Approximately.', source: 'eniac-spec' },
  { v: '150', u: 'KILOWATTS', label: 'POWER', note: 'Continuous draw while running, per the 1946 specification table.', source: 'eniac-spec' },
  { v: '5,000', u: 'ADDITIONS / SEC', label: 'SPEED', note: 'One addition in 200 microseconds.', source: 'eniac-speed' },
  { v: '6', u: 'PROGRAMMERS', label: 'PEOPLE', note: 'The ENIAC Six did the thinking that made it a computer.', source: 'eniac-six' },
];

/* Numbers that headline the issue's arguments, used on the cover and section pages. */
export const ISSUE_MARKS = {
  span: { v: '5,000', u: 'YEARS', note: 'From the first counting board to a model that writes back.' },
  end: { v: '1946', u: 'THE MACHINE', note: 'Thirty tons, and no way to remember its own program.' },
  now: { v: '2026', u: 'THE QUESTION', note: 'The machine can generate. Can we still think?' },
};
