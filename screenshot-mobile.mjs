import { chromium } from '/c/Users/ulasi/Desktop/erisim-muhendislik/node_modules/playwright/index.mjs';

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
const p = await ctx.newPage();

// Ana sayfa full
await p.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(1500);
await p.screenshot({ path: '/c/Users/ulasi/Desktop/mob-check-home.png', fullPage: true });
console.log('home OK');

// Menü açık
await p.evaluate(() => {
  const btn = document.querySelector('button[aria-label="Menü"]');
  if (btn) btn.click();
});
await p.waitForTimeout(700);
await p.screenshot({ path: '/c/Users/ulasi/Desktop/mob-check-menu.png', fullPage: false });
console.log('menu OK');

await b.close();
