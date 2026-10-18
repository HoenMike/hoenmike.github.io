import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

mkdirSync("artifacts",{recursive:true});
const browser=await chromium.launch({headless:true});
const widths=[320,390,768,1440],errors=[];
try {
  for(const width of widths){
    const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1});
    const page=await context.newPage();
    page.on("pageerror",error=>errors.push(width+": "+error.message));
    await page.goto("http://127.0.0.1:4173/",{waitUntil:"domcontentloaded"});
    await page.locator(".tile").first().waitFor();
    assert.equal(await page.locator(".tile").count(),10,"10 cards at "+width);
    assert.equal(await page.locator(".timeline-item").count(),5,"Timeline at "+width);
    const overflow=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:window.innerWidth}));
    assert.ok(overflow.scroll<=overflow.viewport+2,"Horizontal overflow at "+width+": "+JSON.stringify(overflow));
    assert.equal(await page.locator(".hero__name").textContent(),"Mike.");
    for(const [kind,count] of [["game",3],["ai",2],["app",5],["all",10]]){
      await page.locator('.filter[data-filter="'+kind+'"]').click();
      assert.equal(await page.locator(".tile").count(),count,kind+" filter at "+width);
    }
    const garden=page.locator('.tile[data-id="garden"] .tile__trigger');
    await garden.click();
    assert.equal(await garden.getAttribute("aria-expanded"),"true");
    assert.equal(await page.locator("#detail-garden").isVisible(),true);
    await page.keyboard.press("Escape");
    assert.equal(await garden.getAttribute("aria-expanded"),"false");
    await page.locator("#lang-switch").click();
    assert.equal(await page.locator("html").getAttribute("lang"),"en");
    await page.locator("#theme-switch").click();
    assert.equal(await page.locator("html").getAttribute("data-theme"),"light");
    await page.locator('[data-open-project="asumi"]').click();
    assert.equal(await page.locator('.tile[data-id="asumi"] .tile__trigger').getAttribute("aria-expanded"),"true");
    assert.equal(await page.locator('.tile[data-id="sc"] a[href*="github.com"]').count(),0,"SC source privacy");
    await page.locator('.tile[data-id="asumi"] .tile__trigger').click();
    await page.locator('.tile[data-id="asumi"] .tile__trigger').click();
    assert.equal(await page.locator('.tile[data-id="asumi"] a[href*="github.com"]').count(),1,"Public source");
    if(width===390||width===1440){
      await page.locator("#theme-switch").click();
      await page.screenshot({path:"artifacts/portfolio-"+width+".png",fullPage:true,animations:"disabled"});
    }
    await context.close();
  }
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:"reduce"});
  const page=await context.newPage();
  page.on("pageerror",error=>errors.push("reduced: "+error.message));
  await page.goto("http://127.0.0.1:4173/",{waitUntil:"domcontentloaded"});
  assert.equal(await page.locator(".tile").count(),10);
  await page.locator('.tile[data-id="miraei"] .tile__trigger').click();
  assert.equal(await page.locator("#detail-miraei").isVisible(),true);
  await context.close();
  assert.deepEqual(errors,[],"No uncaught browser errors");
  console.log("PASS: responsive 320,390,768,1440; themes, i18n, filters, expansion, Escape, privacy, reduced motion");
} finally {await browser.close();}
