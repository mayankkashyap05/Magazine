// The six features of Issue 001. Magazine grammar: 80% graphics, 20% text.
// Blocks are rendered by templates/blocks.mjs; order and layout vary per story.

export const STORIES = [
  {
    slug: 'from-computer-to-ai',
    no: '01',
    category: 'HISTORY',
    topics: ['computing', 'ai', 'human-technology'],
    title: ['FROM COMPUTER', 'TO AI'],
    dek: 'A journey from counting to creating. We began with the abacus. We arrived at artificial intelligence.',
    date: '2026',
    read: '07 MIN',
    ref: 'P. 02',
    hero: {
      img: 'hero-timeline',
      ratio: '4/3',
      caption: 'FIG. 01 — CATALOGUE PLATE. THE INSTRUMENTS OF CALCULATION, IN ORDER OF APPEARANCE.',
    },
    blocks: [
      {
        t: 'prose',
        text: 'Every object on that plate began as an answer to a human question. How much? How fast? What next? The history of computing is not a history of machines. It is a history of people refusing to stop asking.',
      },
      {
        t: 'quote',
        lines: ['WE BEGAN WITH A TOOL', 'THAT HELPED US COUNT.', 'NOW WE ARE BUILDING TOOLS', 'THAT HELP US CREATE.'],
      },
      { t: 'timeline', note: 'TIMELINE NOT TO SCALE. THE SHRINKING GAPS ARE THE STORY.' },
      {
        t: 'ladder',
        title: 'THE AI LADDER',
        note: 'EACH RUNG STANDS ON THE ONE BELOW.',
        steps: [
          { k: 'L1', title: 'MACHINE LEARNING', body: 'Learning from data.' },
          { k: 'L2', title: 'DEEP LEARNING', body: 'Learning through layered neural networks.' },
          { k: 'L3', title: 'GENERATIVE AI', body: 'Creating new content from learned patterns.' },
        ],
      },
      {
        t: 'statement',
        lines: [
          { text: 'THE COMPUTER WAS CREATED TO CALCULATE.', size: 'lg' },
          { text: 'AI IS BEING DEVELOPED TO ASSIST WITH DECISIONS, CREATION AND PROBLEM-SOLVING.', size: 'md' },
        ],
      },
    ],
    closing: ['THE FUTURE ISN’T', 'COMPUTER VS. HUMAN.', 'IT’S COMPUTER + HUMAN.'],
  },

  {
    slug: 'eniac',
    no: '02',
    category: '1946',
    topics: ['computing'],
    title: ['ENIAC'],
    sub: 'THE GIANT THAT STARTED THE DIGITAL AGE',
    dek: 'Before smartphones, laptops and AI, there was a 30-ton machine that filled a room.',
    idline: 'ELECTRONIC NUMERICAL INTEGRATOR AND COMPUTER — MOORE SCHOOL, UNIVERSITY OF PENNSYLVANIA. UNVEILED 1946.',
    date: '1946',
    read: '06 MIN',
    ref: 'P. 08',
    hero: {
      img: 'eniac-room',
      ratio: '3/4',
      caption: 'FIG. 01 — THE MACHINE ROOM. PANELS WIRED BY HAND, UNDER BARE BULBS. 1946.',
    },
    blocks: [
      {
        t: 'statement',
        lines: [{ text: 'WAR NEEDED SPEED.', size: 'xl' }],
      },
      {
        t: 'prose',
        text: 'During the Second World War, the U.S. Army needed artillery firing tables — thousands of complex ballistic calculations, and human computers were too slow. ENIAC was built to do that arithmetic electronically.',
      },
      {
        t: 'prose',
        text: 'Widely regarded as the first general-purpose electronic digital computer, ENIAC marked the moment computing turned electronic.',
      },
      {
        t: 'stats',
        title: 'THE NUMBERS',
        items: [
          { v: '30', u: 'TONS', note: 'THE WEIGHT OF THE MACHINE.' },
          { v: '17,468', u: 'VACUUM TUBES', note: 'ITS GLOWING HEART.' },
          { v: '~1,800', u: 'SQ. FT.', note: 'IT OCCUPIED AN ENTIRE HALL.' },
          { v: '150', u: 'KW', note: 'ITS CONTINUOUS POWER DRAW.' },
          { v: '5,000', u: 'ADDITIONS / SEC', note: 'EXTRAORDINARY SPEED FOR ITS ERA.' },
        ],
      },
      {
        t: 'rows',
        title: 'PROGRAMMING',
        note: 'ONE CALCULATION COULD TAKE DAYS TO SET UP.',
        items: [
          { k: '—', title: 'NO KEYBOARD', body: 'Input was cables, switches and panels.' },
          { k: '—', title: 'NO MOUSE', body: 'Nothing was pointed at. Everything was wired.' },
          { k: '—', title: 'NO SCREEN', body: 'Results arrived as lights and punched cards.' },
        ],
      },
      {
        t: 'roster',
        title: 'THE ENIAC SIX',
        note: 'THE MATHEMATICIANS WHO BECAME THE MACHINE’S FIRST PROGRAMMERS — AND TURNED WIRES INTO A PROGRAMMABLE COMPUTER.',
        people: [
          'KAY McNULTY',
          'BETTY JENNINGS',
          'BETTY HOLBERTON',
          'MARLYN WESCOFF',
          'FRAN BILAS',
          'RUTH LICHTERMAN',
        ],
      },
      { t: 'fig', img: 'eniac-programmers', ratio: '4/3', caption: 'FIG. 02 — PROGRAMMING BY HAND. CABLES WERE THE LANGUAGE.' },
      { t: 'fig', img: 'vacuum-tube', ratio: '1/1', caption: 'FIG. 03 — VACUUM TUBES. 17,468 ELECTRONIC SWITCHES. NO MOVING PARTS.' },
      {
        t: 'chain',
        title: 'LEGACY',
        note: 'ENIAC HELPED PROVE THAT LARGE-SCALE ELECTRONIC COMPUTING WAS POSSIBLE.',
        nodes: ['STORED-PROGRAM COMPUTING', 'MODERN ARCHITECTURE', 'COMPUTER INDUSTRY', 'DIGITAL WORLD'],
      },
      {
        t: 'statement',
        lines: [
          { text: '11:45 P.M. — OCTOBER 2, 1955.', size: 'md' },
          { text: 'ENIAC WAS SWITCHED OFF.', size: 'lg' },
          { text: 'EVERY LAPTOP, SMARTPHONE AND AI SYSTEM CARRIES A PIECE OF THAT REVOLUTION.', size: 'sm' },
        ],
      },
    ],
    closing: ['30 TONS OF HISTORY.', 'ONE LINE OF YOURS.'],
  },

  {
    slug: 'bca-launchpad',
    no: '03',
    category: 'EDUCATION',
    topics: ['education'],
    title: ['BCA IS NOT', 'JUST A DEGREE.'],
    sub: 'IT’S A LAUNCHPAD.',
    dek: 'A degree gives you knowledge. BCA gives you the opportunity to build with it.',
    date: '2026',
    read: '05 MIN',
    ref: 'P. 14',
    hero: {
      img: 'bca-launchpad',
      ratio: '3/2',
      caption: 'FIG. 01 — THE DRAFTING TABLE. WHERE PROGRAMS ARE PLANNED BEFORE THEY ARE TYPED.',
    },
    blocks: [
      {
        t: 'rows',
        title: 'WHAT YOU ACTUALLY DO',
        items: [
          { k: 'A', title: 'CODE', body: 'Turn ideas into software.' },
          { k: 'B', title: 'BUILD', body: 'Create websites, apps and digital products.' },
          { k: 'C', title: 'SOLVE', body: 'Break complex problems into smaller ones.' },
          { k: 'D', title: 'THINK', body: 'Develop logical and analytical skill.' },
        ],
      },
      {
        t: 'runways',
        title: 'THREE RUNWAYS',
        note: 'DEPARTURE DIRECTIONS, NOT DESTINATIONS. CHOOSE A HEADING.',
        runways: [
          {
            n: '01',
            title: 'CAREER',
            items: ['Software Developer', 'Web Developer', 'App Developer', 'Data Analyst', 'Cybersecurity Analyst', 'UI/UX Designer', 'Cloud Engineer'],
          },
          { n: '02', title: 'HIGHER STUDIES', items: ['MCA', 'M.Sc. IT', 'MBA / IT Management', 'MS & International Studies'] },
          { n: '03', title: 'CREATOR', items: ['Freelancing', 'Startups', 'Apps & Products', 'Digital Agencies', 'Entrepreneurship'] },
        ],
      },
      {
        t: 'list',
        title: 'LIFE SKILLS',
        items: [
          { n: '01', title: 'LOGIC', body: 'Break down problems.' },
          { n: '02', title: 'PATIENCE', body: 'Code rarely works the first time.' },
          { n: '03', title: 'TEAMWORK', body: 'Great software is rarely built alone.' },
          { n: '04', title: 'ADAPTABILITY', body: 'Technology never stops changing.' },
        ],
      },
      {
        t: 'statement',
        lines: [
          { text: 'AI. DATA SCIENCE. CLOUD. CYBERSECURITY. AUTOMATION.', size: 'md' },
          { text: 'TECHNOLOGY KEEPS CHANGING.', size: 'lg' },
          { text: 'STRONG FUNDAMENTALS KEEP YOU READY.', size: 'lg' },
        ],
      },
      {
        t: 'statement',
        lines: [
          { text: 'BCA IS NOT THE DESTINATION.', size: 'lg' },
          { text: 'IT’S YOUR TAKE-OFF POINT.', size: 'lg' },
        ],
      },
    ],
    closing: ['KNOWLEDGE IS THE FUEL.', 'BUILDING IS THE FLIGHT.'],
  },

  {
    slug: 'cybersecurity',
    no: '04',
    category: 'SECURITY',
    topics: ['cybersecurity'],
    title: ['YOUR ONE CLICK CAN', 'COST YOU EVERYTHING.'],
    dek: 'In the physical world, we don’t open our door to strangers. Online, we sometimes do it with one click.',
    date: '2026',
    read: '06 MIN',
    ref: 'P. 20',
    hero: {
      img: 'cybersecurity',
      ratio: '1/1',
      caption: 'FIG. 01 — THE ORDINARY CRIME SCENE. A PHONE, A MESSAGE, A DECISION.',
    },
    blocks: [
      {
        t: 'statement',
        lines: [
          { text: 'ONE CLICK.', size: 'xl' },
          { text: 'ONE MISTAKE.', size: 'xl' },
          { text: 'ONE HUGE LOSS.', size: 'xl' },
        ],
      },
      {
        t: 'specimens',
        title: 'EXHIBITS — THE BAIT',
        insight: 'THE BAIT CHANGES. THE GOAL DOESN’T.',
        items: [
          { tag: 'EXHIBIT A — FAKE JOB OFFER', text: '“Earn ₹5,000 a day from home.”' },
          { tag: 'EXHIBIT B — PHISHING MESSAGE', text: '“Your bank account will be blocked. Update KYC now.”' },
          { tag: 'EXHIBIT C — FAKE GIVEAWAY', text: '“Congratulations! You’ve won an iPhone.”' },
        ],
      },
      {
        t: 'list',
        title: 'HUMAN EMOTIONS — THE ATTACK SURFACE',
        note: 'ATTACKS AIM AT FEELINGS BEFORE THEY AIM AT SYSTEMS.',
        items: [
          { n: '01', title: 'FEAR', body: '“Your account will be closed!”' },
          { n: '02', title: 'GREED', body: '“You’ve won a lottery!”' },
          { n: '03', title: 'CURIOSITY', body: '“Is this you in this video?”' },
        ],
      },
      {
        t: 'rules',
        title: 'FIVE DIGITAL RULES',
        items: [
          { n: '01', title: 'STOP. THINK. CLICK.', body: 'Check the real website before opening a link.' },
          { n: '02', title: 'PROTECT YOUR OTP.', body: 'Your OTP is a digital key. Never share it.' },
          { n: '03', title: 'QUESTION “FREE”.', body: 'Free downloads and cracked software can hide malware.' },
          { n: '04', title: 'USE TWO LOCKS.', body: 'Enable two-factor authentication wherever possible.' },
          { n: '05', title: 'UPDATE.', body: 'Updates often close the doors attackers use.' },
        ],
      },
      {
        t: 'quote',
        lines: ['PASSWORDS CAN BE CHANGED.', 'MONEY CAN SOMETIMES BE RECOVERED.', 'BUT PRIVACY MAY NEVER BE RESTORED.'],
      },
      {
        t: 'statement',
        lines: [
          { text: 'BE SMART. NOT JUST DIGITAL.', size: 'lg' },
          { text: 'THINK BEFORE YOU CLICK.', size: 'md' },
        ],
      },
    ],
    closing: ['THE LOCK IS SOFTWARE.', 'THE KEY IS ATTENTION.'],
  },

  {
    slug: 'young-generation-ai',
    no: '05',
    category: 'FUTURE',
    topics: ['ai', 'human-technology'],
    title: ['YOUNG GENERATION', '& AI.'],
    sub: 'BOON, BANE OR BOTH?',
    dek: 'Our parents grew up with Google. We are growing up with AI. We don’t just search anymore. We ask.',
    date: '2026',
    read: '06 MIN',
    ref: 'P. 26',
    hero: {
      img: 'youth-ai',
      ratio: '3/2',
      caption: 'FIG. 01 — THE NEW STUDY DESK. A QUESTION, A SCREEN, AND A NOTEBOOK STILL OPEN.',
    },
    blocks: [
      {
        t: 'list',
        title: 'AI = A NEW SUPERPOWER',
        items: [
          { n: '01', title: 'SUPER-TUTOR', body: 'Learn concepts, ask questions, study at your own pace.' },
          { n: '02', title: 'SUPER-CREATOR', body: 'Write. Design. Code. Create. Present.' },
          { n: '03', title: 'SUPER-ACCELERATOR', body: 'Turn an idea into a first draft in minutes.' },
          { n: '04', title: 'NEW CAREERS', body: 'New roles, industries and opportunities are appearing.' },
        ],
      },
      {
        t: 'statement',
        lines: [
          { text: 'THE BIGGEST RISK?', size: 'md' },
          { text: 'STOPPING OURSELVES FROM THINKING.', size: 'xl' },
        ],
      },
      {
        t: 'prose',
        text: 'If AI performs every assignment, writes every line of code and answers every question — what happens to our own ability to think?',
      },
      {
        t: 'list',
        title: 'THREE DIGITAL DANGERS',
        items: [
          { n: '01', title: 'DEPENDENCE', body: 'Using AI to avoid learning.' },
          { n: '02', title: 'COMPARISON', body: 'AI-generated perfection can distort how we see ourselves.' },
          { n: '03', title: 'DECEPTION', body: 'Deepfakes, voice cloning and AI scams grow harder to detect.' },
        ],
      },
      {
        t: 'pair',
        title: 'THE SMART WAY FORWARD',
        insight: 'USE AI. DON’T DEPEND ON AI.',
        left: { title: 'ASK AI', items: ['TO EXPLAIN.', 'FOR IDEAS.', 'TO ACCELERATE YOU.'] },
        right: { title: 'THEN YOU', items: ['UNDERSTAND IT YOURSELF.', 'CREATE YOUR OWN.', 'STAY IN CONTROL.'] },
      },
      {
        t: 'edge',
        title: 'KEEP YOUR HUMAN EDGE',
        items: ['CRITICAL THINKING', 'CREATIVITY', 'COMMUNICATION', 'EMPATHY', 'LEADERSHIP'],
      },
      {
        t: 'statement',
        lines: [
          { text: 'THE FUTURE BELONGS TO PEOPLE WHO KNOW HOW TO WORK WITH AI.', size: 'lg' },
          { text: 'NOT PEOPLE WHO BLINDLY WORK FOR IT.', size: 'md' },
        ],
      },
    ],
    closing: ['ASK THE MACHINE.', 'KEEP THE QUESTION YOURS.'],
  },

  {
    slug: 'brain-games',
    no: '06',
    category: 'BEHAVIOR',
    topics: ['culture', 'human-technology'],
    title: ['HUMAN BRAIN &', 'COMPUTER GAMES'],
    sub: 'WHO IS CONTROLLING WHOM?',
    dek: 'You think you control the game. But every reward, sound, level and victory is designed to keep your brain engaged.',
    date: '2026',
    read: '06 MIN',
    ref: 'P. 32',
    hero: {
      img: 'gaming-brain',
      ratio: '1/1',
      caption: 'FIG. 01 — SPECIMEN STUDY. THE CONTROLLER, AND THE ORGAN IT PLAYS.',
    },
    blocks: [
      {
        t: 'loop',
        title: 'THE DOPAMINE LOOP',
        note: 'A SIMPLIFIED MODEL. GAMES ARE ENGINEERED TO CLOSE THIS LOOP QUICKLY, AND OFTEN.',
        nodes: ['PLAY', 'REWARD', 'DOPAMINE', 'REPEAT'],
      },
      {
        t: 'pair',
        title: 'TWO READINGS OF THE SAME MACHINE',
        left: {
          title: 'THE GOOD SIDE',
          items: ['FASTER REACTIONS — QUICK DECISIONS UNDER PRESSURE.', 'PROBLEM SOLVING — STRATEGY, LOGIC AND PLANNING.', 'TEAMWORK — COMMUNICATION AND COORDINATION.', 'CREATIVITY — BUILDING, DESIGNING, EXPERIMENTING.'],
        },
        right: {
          title: 'WHEN GAMING TAKES CONTROL',
          items: ['ATTENTION — CONSTANT STIMULATION MAKES SLOWER ACTIVITIES HARDER TO TOLERATE.', 'MOOD & ANGER — HEAVY COMPETITIVE PLAY CAN AFFECT EMOTIONAL REGULATION.', 'SLEEP LOSS — LATE-NIGHT SCREENS INTERFERE WITH HEALTHY SLEEP.'],
        },
      },
      {
        t: 'statement',
        lines: [
          { text: 'THE REAL ENEMY IS NOT GAMING.', size: 'lg' },
          { text: 'IT IS LOSS OF CONTROL.', size: 'lg' },
        ],
      },
      {
        t: 'rules',
        title: 'GOLDEN RULES',
        items: [
          { n: '01', title: '60–10 RULE', body: 'Play about 60 minutes. Take a 10-minute break.' },
          { n: '02', title: 'NO GAMES BEFORE BED', body: 'Give your brain time to wind down.' },
          { n: '03', title: 'CHOOSE YOUR GAMES', body: 'Strategy, puzzle and creative games challenge the brain differently from repetitive play.' },
        ],
      },
      {
        t: 'statement',
        lines: [
          { text: 'AM I PLAYING THE GAME?', size: 'lg' },
          { text: 'OR IS THE GAME PLAYING ME?', size: 'lg' },
          { text: 'YOUR BRAIN IS THE MOST POWERFUL GAMING SYSTEM YOU OWN. PROTECT IT.', size: 'sm' },
        ],
      },
    ],
    closing: ['THE CONTROLLER FITS YOUR HAND.', 'SO DOES THE DESIGN.'],
  },
];

export const storyBySlug = (slug) => STORIES.find((s) => s.slug === slug);
