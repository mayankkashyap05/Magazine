# BYTE/HUMAN

**A retro-minimal static editorial magazine about computing, AI and human innovation.**

> Technology is not only a story of machines. It is a story of human innovation.

BYTE/HUMAN is the digital edition of a technology publication in the archival
tradition: paper, ink, one accent, rigorous grids, numbered figures and
statistics treated as design objects. Eighty percent graphics, twenty percent
text — a magazine spread, not a blog.

`VOL. 01 — ISSUE 001 / 2026` · six features · one timeline · six topics.

---

## Commands

```bash
npm install        # dev tooling only (sharp, for image processing)
npm run media      # process art-directed plates (media-src/) into responsive webp/jpg (src/assets/img/)
npm run build      # render content/ through templates/ into dist/ (plain static HTML/CSS/JS)
npm run preview    # serve dist/ on :4173
npm run check      # static QA: internal links, anchors, assets, h1 count, alt text, meta
```

The site itself ships **zero dependencies**. `dist/` deploys to any static host
(Netlify, Pages, S3, nginx). Client JavaScript is ~2 KB (menu, reading
progress, archive filter); the publication reads fully with JS disabled.

## Structure

```
content/     editorial data: site, stories, timeline, topics, image alt text
templates/   layout shell, block renderers, page templates (pure functions → HTML)
src/assets/  design system CSS, client JS, favicon, processed image derivatives
tools/       media pipeline, static server, QA checks
dist/        built site (generated, gitignored)
media-src/   original generated plates (large; gitignored — derivatives are committed)
```

## Design system

- **Paper** `#F3EFE6` · **Ink** `#171717` · **Secondary ink** `#5E5B55` ·
  **Rule** `#C8C1B5` · **Accent** `#B65F32` (display) with `#9A4E24` /
  `#D08A5F` variants so 10–11px labels keep WCAG AA contrast on paper and ink
- **Type** — Archivo (variable width, display) + IBM Plex Sans (body) +
  IBM Plex Mono (dates, specs, issue marks, technical labels)
- Square corners, thin rules, no gradients, no shadows, no cards.
- `prefers-reduced-motion` honored; keyboard-navigable; one `h1` per page;
  descriptive alt text on every plate.

## Editorial contents (Issue 001)

1. **FROM COMPUTER TO AI** — the acceleration, from abacus to generative AI
2. **ENIAC** — the 30-ton giant that started the digital age
3. **BCA IS NOT JUST A DEGREE** — a launchpad with three runways
4. **CYBERSECURITY** — one click can cost you everything
5. **YOUNG GENERATION & AI** — boon, bane or both?
6. **HUMAN BRAIN & COMPUTER GAMES** — who is controlling whom?

Historical figures are sourced and qualified (ENIAC specifications per the
1946 Goldstine & Goldstine paper and the Computer History Museum; the ENIAC
Six per institutional histories).

---

*The machine changes. The human question remains.*
