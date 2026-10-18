import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const js = readFileSync(new URL("../app.js", import.meta.url), "utf8");

test("Page has readable landmarks and accessible card host", () => {
  for (const id of ["top", "about", "work", "journey", "project-grid", "timeline"]) {
    assert.match(html, new RegExp('id="' + id + '"'));
  }
  assert.match(html, /<main>/);
  assert.match(html, /<nav[^>]+aria-label/);
  assert.match(js, /aria-expanded/);
  assert.match(js, /aria-controls/);
});

test("Project SC is the private, public-safe presentation", () => {
  assert.match(js, /title:"Project SC"/);
  const details = js.split('id:"sc",')[1].split('id:"clock",')[0];
  assert.match(details, /visibility:"private"/);
  assert.doesNotMatch(details, /source:|demo:/);
});

test("Source links only target an approved set of public projects", () => {
  const publicSources = [...js.matchAll(/source:"(https:\/\/github\.com\/[^"]+)"/g)].map((m) => m[1]).sort();
  assert.deepEqual(publicSources, [
    "https://github.com/HoenMike/ChromeDino",
    "https://github.com/HoenMike/DiscordMikeBot"
  ]);
  assert.match(js, /project\.visibility === "public"/);
});

test("Required portfolio milestones are represented", () => {
  for (const name of ["Living Garden", "Asumi", "Miraei", "Project SC", "Zinit", "Chrome Dino", "ChillTown"]) {
    assert.ok(html.includes(name) || js.includes(name), "missing: " + name);
  }
  assert.match(js, /Graduation thesis/);
  assert.match(js, /year:"2023"/);
  assert.match(js, /year:"2026"/);
});

test("Interactive features and themes exist", () => {
  for (const value of ["dark", "light"]) assert.ok(js.includes('"' + value + '"'));
  assert.match(js, /const themes = \["dark", "light"\]/);
  assert.doesNotMatch(js, /themeOled|theme === "oled"/);
  assert.doesNotMatch(css, /data-theme=oled/);
  assert.match(js, /startViewTransition/);
  assert.match(js, /Escape/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /max-width:600px/);
  assert.match(css, /tile\.is-expanded/);
});

test("Journey content remains rendered and visible in the clean layout", () => {
  assert.match(html, /class="timeline" id="timeline"/);
  assert.match(js, /renderTimeline\(\);/);
  assert.match(js, /timeline\.map\(/);
  assert.doesNotMatch(css, /\.timeline\s*\{[^}]*display\s*:\s*none/);
  assert.doesNotMatch(css, /\.timeline-item\s*\{[^}]*opacity\s*:\s*0/);
});

test("Midnight Ocean uses only two fonts and one navy/cyan palette", () => {
  assert.match(css, /--bg:\s*#020b14/);
  assert.match(css, /--accent:\s*#78dcef/);
  assert.match(css, /--tile-bg:\s*#102b3c/);
  assert.doesNotMatch(html, /Space\+Mono/);
  assert.match(html, /href="\.\/icon\.svg"/);
  assert.doesNotMatch(js, /const retiredVisual/);
  assert.match(js, /\.tile__trigger,\.timeline-item/);
});
test("Atmosphere and animation have explicit low-motion and visibility safeguards", () => {
  assert.match(html, /id="starfield"/);
  assert.match(html, /sea-wave--far/);
  assert.match(html, /sea-wave--middle/);
  assert.match(html, /sea-wave--near/);
  assert.match(js, /Math\.min\(window\.devicePixelRatio \|\| 1, 2\)/);
  assert.match(js, /mobile\.matches \? 60 : 160/);
  assert.match(js, /document\.visibilityState === "visible"/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /cancelAnimationFrame/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /tile\.is-filter-leaving/);
});
