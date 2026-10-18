# HoenMike — Midnight Blue Ocean Portfolio

An interactive personal landing page: a living collection of projects and experiments.

## Release

- Production: https://hoenmike.github.io/ (GitHub Pages, deployed from `main`).
- Push or merge into `main` to deploy; no separate preview deployment is required.
- Validate with `node --check app.js` and `node --test tests/*.test.mjs`.

## Experience

- 12-column asymmetric Bento grid with larger featured tiles and smaller project cards.
- Restrained single-hue navy bento, moonlit cyan accents and WCAG AA-muted text on the project cards.
- One fixed canvas starfield in Dark, three parallaxed SVG wave layers, subtle reflection and ocean-only Light theme.
- One-off hero reveal, optional parallax, desktop card spotlight/tilt, animated filters, scroll reveal and timeline progress.
- Updated inline moon-and-wave logo plus SVG favicon.
- Inline expansion: click or tap a tile to grow it in place. No route change or modal.
- Native View Transitions API when supported; safe fallback; Escape collapses the tile.
- Project filters: All / Games / AI / Apps & Tools.
- Vietnamese / English and Dark / Light, saved to browser storage.
- No third-party JS libraries, no build tool; responsive layouts and reduced-motion support.
- Canvas only renders for Dark theme while the hero is visible; stops on hidden tabs, caps DPR at 2 and uses 60 stars on mobile.
- No private project art/screenshots, no decorative text glyphs, and no custom cursor.
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

Before production verify card open/close and Escape, filters, VI/EN, Dark/Light, keyboard navigation, reduced motion and widths 320px, 390px, 768px and 1440px. Also measure Lighthouse mobile performance (target 90+) and check animation behavior on actual devices; static tests do not establish a Lighthouse score.

## Stack

Semantic HTML, modern CSS Grid, canvas starfield, responsive inline SVG waves, JavaScript modules, IntersectionObserver, View Transitions, Web Storage, GitHub Pages and Node built-in tests. No client framework or build tool.
