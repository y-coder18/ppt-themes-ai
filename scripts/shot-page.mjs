// 截指定页的图，用来肉眼验收排版。
//
//   node scripts/shot-page.mjs <deck.html> <页号|关键字> [输出.png]
//
// 页号是 1-based；也可以传关键字，匹配每页的文本内容（取第一个命中的页）。
//
// 为什么要翻页而不是直接截元素：Marp 默认模板是 bespoke，所有 <section> 都嵌在
// SVG 的 <foreignObject> 里且全部叠在 (0,0)，非活动页 Playwright 判定为 not visible，
// elementHandle.screenshot 必然超时。所以只能一路按 ArrowRight 翻到目标页再截视口。
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [deck, target, outArg] = process.argv.slice(2);

if (!deck || !target) {
  console.error('用法: node scripts/shot-page.mjs <deck.html> <页号|关键字> [输出.png]');
  process.exit(2);
}
if (!existsSync(deck)) {
  console.error(`找不到文稿: ${deck}`);
  process.exit(2);
}

const out = outArg ?? `shot.${target}.png`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

await page.goto(pathToFileURL(path.resolve(deck)).href, { waitUntil: 'networkidle' });

// 等字体和图片就位。不等的话代码块 / LaTeX 那几页会截到未排完版的样子，
// 图片没 decode 完还会被当成破图。
await page.evaluate(() => document.fonts.ready.then(() => undefined));
await page.waitForFunction(() => [...document.images].every((img) => img.complete));
await page.waitForTimeout(300);

// 每页压成一行文本，既用来匹配关键字，也在找不到时列出来帮你定位
const pages = await page.evaluate(() =>
  [...document.querySelectorAll('section')].map((s) =>
    s.textContent.replace(/\s+/g, ' ').trim()
  )
);

const asNumber = /^\d+$/.test(target) ? Number(target) : null;
const idx = asNumber
  ? asNumber - 1
  : pages.findIndex((t) => t.includes(target));

if (idx < 0 || idx >= pages.length) {
  console.error(`没找到「${target}」。这份文稿共 ${pages.length} 页：\n`);
  pages.forEach((t, i) => console.error(`  ${String(i + 1).padStart(3)}  ${t.slice(0, 46)}`));
  await browser.close();
  process.exit(1);
}

for (let i = 0; i < idx; i++) {
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(120);
}
await page.waitForTimeout(400);

await page.screenshot({ path: out });
console.log(`第 ${idx + 1} / ${pages.length} 页 -> ${out}`);

await browser.close();
