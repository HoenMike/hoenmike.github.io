# HoenMike — Developer Portfolio

A personal portfolio by Mike: selected web applications, AI companions, small games and experiments. Built with semantic HTML, modern CSS and plain JavaScript — no runtime framework or build tool.

## Live site

https://hoenmike.github.io/ — GitHub Pages deploys from \`main\`.

## Design & interactions

- Purpose first: introduction, actual technologies used, an interactive "currently building" panel, selected work, milestones and links to public source.
- Restrained navy/slate with cool cyan accents. Dark/Light themes and Vietnamese/English stored in browser storage.
- Asymmetric 12-column responsive Bento (featured and compact project cards) with original vector marks that do not expose private project information.
- Click a project to expand its overview, technologies and notes in place. Native View Transitions where supported; keyboard Enter/Space and Escape, plus safe fallback.
- Filters: All / Games / AI / Apps & Tools. Workspace projects open their matching card.
- Background grid, gentle hover feedback and a one-time below-fold reveal. No literal waves, moon, starfield, continuously running canvas or additional animation libraries.
- Reduced-motion support and visible focus states. Fonts: DM Sans and Space Grotesk only.

## Privacy and editorial rules — maintain this allowlist

All public project text is explicitly defined in \`app.js\`, not generated from private GitHub metadata.

- The confidential project is displayed **only as Project SC**, with generic wording. Never expose source links, implementation details, internal architecture, business information or screenshots.
- Zinit is explicitly the **Graduation Thesis**.
- ChillTown belongs to experiments/experience, not an employment claim.
- Chrome Dino is an early Java/OOP game from 2023.
- Source links are approved only for Asumi and Chrome Dino. A public Word Clock **demo** link is separate from source access.
- Word Clock maintains attribution to \`tridzfr/vietnamese-word-clock\`.
- Projects with private data are represented by abstract vector graphics, never confidential screenshots.

## Local development

No bundling:

\`\`\`bash
python -m http.server 4173
\`\`\`

Open http://localhost:4173.

## Checks

\`\`\`bash
node --check app.js
node --test tests/*.test.mjs
\`\`\`

Browser QA additionally verifies language/theme switching, all project filters, card expansion and Escape, timeline rendering, privacy, 320 / 390 / 768 / 1440 widths and reduced-motion using Playwright on CI. Playwright is a **test-only** dependency installed by the workflow; it is not bundled or downloaded by the production site.

Before declaring Lighthouse Performance ≥90, measure it on a deployed mobile build. Syntax/unit tests and browser behavior checks alone are not Lighthouse measurements.
