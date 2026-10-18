# HoenMike — Seamless Bento Portfolio

An interactive personal landing page: a living collection of projects and experiments.

## Release

- Production: https://hoenmike.github.io/ (GitHub Pages, deployed from `main`).
- Push or merge into `main` to deploy; no separate preview deployment is required.
- Validate with `node --check app.js` and `node --test tests/*.test.mjs`.

## Experience

- 12-column asymmetric Bento grid with larger featured tiles and smaller project cards.
- Restrained styling and improved reading contrast, without decorative interface mockups or extra badges.
- Inline expansion: click or tap a tile to grow it in place. No route change or modal.
- Native View Transitions API when supported; safe fallback; Escape collapses the tile.
- Project filters: All / Games / AI / Apps & Tools.
- Vietnamese / English and Dark / Light, saved to browser storage.
- CSS-drawn art, responsive layouts, reduced-motion support.
- Timeline and Experience card including ChillTown.

## Privacy and editorial rules

Public showcase content is an explicit allowlist in app.js, not a feed of private GitHub metadata.

- The confidential project is displayed ONLY as Project SC, with generic copy.
- No private source URL, architecture, internal features or internal data for Project SC.
- Zinit is labeled Graduation Thesis.
- ChillTown is an experiment in Experience, not a claim of employment.
- Chrome Dino is a Java/OOP game from 2023.
- Source links exist only for public projects (Asumi and Chrome Dino).
- Preserve the word clock's open-source attribution.

## Local preview

No build tool required. Run:

    python -m http.server 4173

Open http://localhost:4173/.

## Checks

    node --check app.js
    node --test tests/*.test.mjs

Before production verify card open/close and Escape, filters, VI/EN, every theme, keyboard navigation, reduced motion and widths 320px, 390px, 768px and 1440px.

## Stack

Semantic HTML, modern CSS Grid, responsive layouts, custom illustrations, JavaScript modules, View Transitions, Web Storage, GitHub Pages and Node built-in tests. No unnecessary client framework or bundle.
