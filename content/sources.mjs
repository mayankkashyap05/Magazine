// Sources and qualifications for every hard number printed in Issue 001.
// The magazine adds no figures that cannot be traced to a listed reference.

export const FACTS = [
  {
    id: 'turing',
    claim: 'A universal computing machine was described in 1936, nine years before ENIAC ran.',
    source: 'Turing, A. M. “On Computable Numbers, with an Application to the Entscheidungsproblem.” Proceedings of the London Mathematical Society, ser. 2, vol. 42, 1937, pp. 230–265.',
    note: 'Presented in 1936. The paper is a mathematical argument about decidability; the “machine” in it is a thought experiment, which is why this entry is dated to the theory rather than to any device.',
  },
  {
    id: 'eniac-spec',
    claim: '17,468 vacuum tubes, 1,500 relays, 30 tons, roughly 1,800 sq ft, 150 kW.',
    source: 'Goldstine, H. H. & Goldstine, A. “The Electronic Numerical Integrator and Computer (ENIAC).” Mathematical Tables and Other Aids to Computation, vol. 2, no. 15, 1946, pp. 97–110.',
    note: 'The published specification table. Weight and floor area are reported as approximately 30 tons and 1,800 square feet; later accounts differ slightly.',
  },
  {
    id: 'eniac-speed',
    claim: 'About 5,000 additions per second — a 200-microsecond addition time.',
    source: 'Goldstine & Goldstine (1946); U.S. Army Ordnance Department ENIAC press release, 14 February 1946.',
    note: 'Indicative figure for the era. The machine was in practice limited by its input/output equipment, not its arithmetic.',
  },
  {
    id: 'eniac-first',
    claim: '“Widely regarded as the first general-purpose electronic digital computer.”',
    source: 'Computer History Museum, ENIAC exhibit notes; ENIAC patent US 3,120,606 (1964).',
    note: 'The claim is qualified deliberately. Earlier electronic machines (the Atanasoff–Berry computer, Colossus) were built for narrower purposes, and the stored-program design arrived after ENIAC.',
  },
  {
    id: 'eniac-six',
    claim: 'Six women mathematicians — Kay McNulty, Betty Jennings, Betty Snyder, Marlyn Wescoff, Fran Bilas and Ruth Lichterman — were ENIAC’s first programmers.',
    source: 'U.S. Army Ordnance Department, 1946 photographs and captions; Bartik, J. J. oral histories; Penn Engineering, “The Women of ENIAC.”',
    note: 'Recorded under their names at the time; several are better known today under their married names (Mauchly, Bartik, Holberton, Meltzer, Spence, Teitelbaum).',
  },
  {
    id: 'eniac-off',
    claim: 'ENIAC was switched off on 2 October 1955.',
    source: 'U.S. Army Ballistic Research Laboratory records; Computer History Museum timeline.',
    note: '',
  },
  {
    id: 'abacus',
    claim: 'Counting boards appear in Mesopotamia around the third millennium BC.',
    source: 'Ifrah, G. The Universal History of Numbers (1981); standard histories of Mesopotamian accounting.',
    note: 'The word “abacus” covers several different devices across cultures; the date marks the earliest documented counting tablets and boards, not one single invention.',
  },
  {
    id: 'pascal',
    claim: 'Blaise Pascal began work on a mechanical calculator in 1642.',
    source: 'Pascal’s surviving correspondence; Musée des Arts et Métiers, Paris.',
    note: 'Roughly twenty Pascaline machines survive. It added and subtracted; multiplication required repeated operations.',
  },
  {
    id: 'babbage',
    claim: 'The Analytical Engine was designed with a “store,” a “mill” and conditional branching.',
    source: 'Babbage’s notebooks and drawings, Science Museum, London; Lovelace, A. “Notes” on Menabrea’s Sketch of the Analytical Engine, 1843.',
    note: 'Entered the design in 1833–34; it was never completed in Babbage’s lifetime, and is therefore a design rather than a working machine.',
  },
  {
    id: 'lovelace',
    claim: 'Ada Lovelace published the first algorithm intended for a machine, computing Bernoulli numbers.',
    source: 'Lovelace, A. “Notes by the Translator,” Taylor’s Scientific Memoirs, 1843 — Note G.',
    note: 'Described as “widely regarded” because her notes also included the first argument that the Engine could operate on symbols, not only numbers.',
  },
  {
    id: 'transistor-ic',
    claim: 'The transistor was demonstrated at Bell Telephone Laboratories in 1947; the integrated circuit was realised in 1958.',
    source: 'Bell Labs / Nobel Foundation, 1956 physics prize documentation; Kilby’s 1958 Noyce/Kilby integrated-circuit filings.',
    note: 'Jack Kilby (TI) and Robert Noyce (Fairchild) reached the integrated circuit by different routes in the same year.',
  },
  {
    id: 'microprocessor',
    claim: 'The Intel 4004, released in 1971, was a complete processor on a single chip.',
    source: 'Intel 4004 documentation and press material, 1971.',
    note: 'It ran at roughly 740 kHz and was built for a calculator before anyone recognised it as a general-purpose processor.',
  },
  {
    id: 'internet-1991',
    claim: 'The World Wide Web became publicly available in 1991.',
    source: 'CERN, “The birth of the web,” and Berners-Lee’s 1991 announcement to the alt.hypertext newsgroup.',
    note: 'The underlying internet predates this by two decades; 1991 is the year the web opened to anyone.',
  },
  {
    id: 'imagenet',
    claim: 'Deep learning broke through in computer vision around 2012.',
    source: 'Krizhevsky, A., Sutskever, I. & Hinton, G. “ImageNet Classification with Deep Convolutional Neural Networks.” NeurIPS, 2012.',
    note: 'The error rate on the ImageNet benchmark fell by roughly ten percentage points in a single year.',
  },
  {
    id: 'genai',
    claim: 'Generative AI became a mass-market tool between 2022 and today.',
    source: 'OpenAI, ChatGPT announcement, November 2022; competitive releases 2023–2026.',
    note: 'The transformer architecture (Vaswani et al., 2017) is the foundation most of these systems share.',
  },
];

export const factById = (id) => FACTS.find((f) => f.id === id);

export const IMAGE_NOTE = {
  title: 'A NOTE ON THE PLATES',
  body:
    'Plates credited to the U.S. Army Signal Corps are archival photographs in the public domain and are reproduced as historical records. All other plates in this issue are illustrative composites commissioned for ENIAC — they are editorial images, not documentary evidence — and are captioned as such.',
};
