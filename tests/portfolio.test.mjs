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
  for (const value of ["dark", "light", "oled"]) assert.ok(js.includes('"' + value + '"'));
  assert.match(js, /startViewTransition/);
  assert.match(js, /Escape/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /max-width:600px/);
  assert.match(css, /tile\.is-expanded/);
});

test("Editorial refresh keeps a bespoke hero and readable project discovery", () => {
  assert.match(html, /class="hero__studio"/);
  assert.match(html, /class="studio__window"/);
  assert.match(html, /class="interest-strip"/);
  assert.match(html, /data-count-for="all"/);
  assert.match(js, /heroAside:/);
  assert.match(js, /workInstruction:/);
  assert.match(js, /project\.tech\.slice\(0, 2\)/);
  assert.match(css, /\.hero__studio\{/);
  assert.match(css, /\.tile__mini-stack/);
});
