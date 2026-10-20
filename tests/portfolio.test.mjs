import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const html=readFileSync(new URL("../index.html",import.meta.url),"utf8");
const css=readFileSync(new URL("../styles.css",import.meta.url),"utf8");
const js=readFileSync(new URL("../app.js",import.meta.url),"utf8");
const icon=readFileSync(new URL("../icon.svg",import.meta.url),"utf8");

test("semantic portfolio layout and navigation",()=>{
 for(const id of ["top","about","work","journey","project-grid","timeline","lang-switch","theme-switch"]){
   assert.match(html,new RegExp('id="'+id+'"'),"missing "+id);
 }
 assert.match(html,/<main>/);
 assert.match(html,/<nav[^>]+aria-label/);
 assert.match(html,/data-open-project="garden"/);
 assert.match(html,/class="workspace"/);
 assert.match(html,/class="stack-strip"/);
 assert.match(html,/href="\.\/icon\.svg"/);
 assert.match(icon,/<svg/);
});

test("the site remains a tech portfolio, not a literal ocean scene",()=>{
 assert.match(html,/Developer &amp; Creative Builder|Developer & Creative Builder/);
 assert.match(html,/workspace__projects/);
 assert.match(css,/--accent:#74ddf1/);
 assert.match(css,/\.bento-grid/);
 assert.doesNotMatch(html,/starfield|hero__sea|sea-wave|galaxy-layer|hero__moon/);
 assert.doesNotMatch(js,/initOceanAtmosphere|meteor|stars\s*=\s*\[/);
 assert.doesNotMatch(icon,/<circle/);
});

test("public project allowlist and all ten showcase items survive unchanged",()=>{
 const required=["Living Garden","Asumi","Miraei","Project SC","Word Clock","AlphaCMS 2","Zinit","ELO Badminton","Chrome Dino","Tak The Game"];
 for(const name of required)assert.ok(js.includes('title:"'+name+'"'),"missing "+name);
 assert.equal((js.match(/\bid:"/g)||[]).length,10);
 const sc=js.split('id:"sc",')[1].split('id:"clock",')[0];
 assert.match(sc,/visibility:"private"/);
 assert.doesNotMatch(sc,/source:|demo:/);
 const sources=[...js.matchAll(/source:"(https:\/\/github\.com\/[^"]+)"/g)].map(m=>m[1]).sort();
 assert.deepEqual(sources,["https://github.com/HoenMike/ChromeDino","https://github.com/HoenMike/DiscordMikeBot"]);
 assert.match(js,/project\.visibility === "public"/);
 assert.match(js,/tridzfr\/vietnamese-word-clock/);
 assert.match(js,/Graduation thesis/);
 assert.match(html,/ChillTown/);
});

test("interactive features have accessible and stable event handlers",()=>{
 assert.match(js,/querySelectorAll/);
 assert.match(js,/const \$\$ =/);
 assert.doesNotMatch(js,/(?<!\$)\$\([^)]*\)\.forEach\(/);
 assert.match(js,/grid\.addEventListener\("click"/);
 assert.match(js,/aria-expanded/);
 assert.match(js,/aria-controls/);
 assert.match(js,/startViewTransition/);
 assert.match(js,/event\.key==="Escape"/);
 assert.match(js,/function renderTimeline/);
 assert.match(js,/timeline\.map/);
 assert.match(js,/function openProject/);
 assert.match(js,/data-open-project/);
});
test("language, themes and responsive behavior",()=>{
 assert.match(js,/const themes = \["dark", "light"\]/);
 assert.match(js,/localStorage/);
 assert.match(js,/document\.documentElement\.lang=lang/);
 assert.match(js,/filter==="all"\|\|project\.kind===filter/);
 assert.match(html,/data-i18n="heroHello"/);
 assert.match(css,/max-width:600px/);
 assert.match(css,/max-width:355px/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.doesNotMatch(css,/data-theme=oled/);
});


test("project stories, accessible feedback and recoverable empty states",()=>{
  assert.match(html,/id="project-status"[^>]+role="status"/);
  assert.match(html,/id="project-empty"[^>]+hidden/);
  assert.match(html,/id="reset-filter"/);
  assert.match(html,/class="skip-link"/);
  assert.match(js,/project\.focus/);
  assert.match(js,/copyProjectLink/);
  assert.match(js,/copyFallback/);
  assert.match(js,/navigator\.clipboard/);
  assert.match(js,/\.select\(\)/);
  assert.match(js,/const getProjectFromUrl/);
  assert.match(js,/window\.addEventListener\("popstate"/);
  assert.match(js,/window\.addEventListener\("hashchange"/);
  assert.match(js,/window\.history\.pushState/);
});

test("concept art stays decorative, responsive and does not leak private projects",()=>{
  assert.match(js,/Decorative concept art, not product screenshots/);
  assert.match(js,/projectScenes/);
  assert.match(css,/\.visual-garden/);
  assert.match(css,/\.visual-chat/);
  assert.match(css,/\.visual-ideas/);
  assert.match(css,/@media\(max-width:480px\)/);
  assert.match(css,/\.copy-fallback/);
  const sc=js.split('id:"sc",')[1].split('id:"clock",')[0];
  assert.doesNotMatch(sc,/source:|demo:/);
  assert.match(sc,/details remain private|giữ riêng tư/);
});
