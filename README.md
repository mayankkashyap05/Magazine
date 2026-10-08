# ENIAC

**A digital magazine about computing, technology and human innovation.**

> OLD MACHINE. NEW THINKING.

ENIAC is named after the thirty-ton machine that helped open the electronic
computing era — and it is written as if the machine age, the internet age and
the AI age are one continuous argument about people. It is a publication, not a
website: paper stock, ink, one signal accent, an asymmetrical editorial grid,
oversized numerals, technical captions, and photography that carries the story
instead of decorating it. Roughly 80% graphics, 20% text.

`VOL. 01 — ISSUE 001 / 2026` · six features · one timeline · five sections.

---

## Commands

```bash
npm install        # dev tooling only (sharp, for the image pipeline)
npm run media      # media-src/ masters → responsive webp + jpg in src/assets/img/
npm run build      # content/ through templates/ → dist/ (static HTML/CSS/JS)
npm run preview    # serve dist/ on :4173
npm run check      # static QA: links, anchors, ARIA ids, headings, alt text, tag balance, CSS health
npm run ship       # media → build → check, in one go
```

The published site has **zero runtime dependencies**. `dist/` drops onto any
static host. Client JavaScript is ~9 KB uncompressed and only ever enhances:
the magazine reads, navigates and prints fully with JS disabled.

## Structure

```
content/     editorial data — site, features (one module each), timeline, sections,
             plates, and sources.mjs: the reference for every printed figure
templates/   layout shell, block renderers, SVG diagram generators, page templates
             (pure functions: data in, HTML string out)
src/assets/  design system CSS, client JS, favicon, processed image derivatives
tools/       image pipeline, static preview server, QA checker
dist/        built site (generated, gitignored)
media-src/   original plates (large, gitignored — derivatives are committed)
```

Adding an issue means adding `content/features/*.mjs` modules and a line in
`content/stories.mjs`. No template changes required.

## Design system

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#F2EDE3` | the stock everything is printed on |
| Paper (recessed) | `#E8E1D3` | structural bands and tonal shifts |
| Ink | `#14110C` | type, rules, dark movements |
| Ink (secondary / tertiary) | `#5F584C` / `#655D50` | captions, metadata — both ≥ 5:1 on paper |
| Signal | `#C0442A` | one accent, used like a warning lamp |
| Signal (deep / high) | `#9C3319` / `#E8836A` | the same accent at small sizes, AA on paper and on ink |

**Type** — Fraunces (display, variable optical size) + IBM Plex Sans (reading) +
IBM Plex Mono (dates, specifications, captions, coordinates). Three families,
strictly assigned: nothing else sets type.

**Grid** — a 1640px measure with fluid gutters, and six layout spans
(`full / wide / left / right / narrow / bleed`) that every block can adopt, so a
feature's rhythm is authored in its data rather than hard-coded in a template.
Square corners, hairline rules, no gradients, no shadows, no cards.

**Motion** — one reveal observer, a number that settles once into place, a few
pixels of parallax on feature plates, a spine of reading progress. All of it is
disabled under `prefers-reduced-motion`, and none of it is required.

## Editorial contents (Issue 001)

1. **FROM COMPUTER TO AI** — the acceleration, abacus to generative AI
2. **ENIAC** — the 30-ton giant, and the ENIAC Six who programmed it
3. **BCA IS NOT JUST A DEGREE** — a launchpad with three runways
4. **CYBERSECURITY** — one click can cost you everything
5. **YOUNG GENERATION & AI** — boon, bane or both?
6. **HUMAN BRAIN & COMPUTER GAMES** — who is controlling whom?

Plus: **The Acceleration** (`/timeline/`) — fifteen milestones plotted on a true
scale and a logarithmic one, so the compression of the last century is visible
rather than asserted; the **Colophon** (`/colophon/`) — every figure in the
issue with its reference and qualifications; and the **Archive**
(`/archive/`) — the catalogue of Volume 01.

## Facts

ENIAC's specification comes from Goldstine & Goldstine (1946); the ENIAC Six
from the U.S. Army Signal Corps photographs and the institutional histories that
later recovered their names; the remaining dates from standard sources listed
in `content/sources.mjs`. Contested or qualified claims — "widely regarded as
the first general-purpose electronic digital computer", approximate floor area
and mass — are stated as such in print and explained in the colophon. No figure
appears in the magazine that cannot be traced there.

Archival plates are public-domain Signal Corps photographs and are credited as
historical records. Every other plate is an illustrative composite made for this
issue, captioned as such, and never presented as documentary evidence.

---

*WE BUILT MACHINES TO THINK FASTER. NOW WE MUST LEARN HOW TO THINK BETTER.*
