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

test("Project SC is the sole displayed confidential project name", () => {
  assert.match(js, /title:"Project SC"/);
  assert.match(js, /id:"sc".*visibility:"private"/);
  assert.doesNotMatch(js, /ChinhLandingPage|StellarCapital|Stellar-Capital|stellar-frontend/i);
  assert.doesNotMatch(html, /ChinhLandingPage|StellarCapital|Stellar-Capital/i);
});

test("Private projects have no public source links", () => {
  for (const name of ["ProjectG", "SecondBrainAssistant", "AlphaCMS2", "zinit_productivity", "BatmintonRanking"]) {
    assert.ok(!js.includes("https://github.com/HoenMike/" + name), "private source reference: " + name);
  }
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
