// 把插图里的公式换成 MathJax 排出来的矢量。
//
//   node scripts/svg-math.mjs <插图.svg> [<插图.svg> ...]
//
// 为什么需要它：插图（media/*.svg）是独立文档，Marp 的公式排版进不去。
// 公式直接写 <text> 只能得到裸字符——根号退化成「√5」而没有横盖、分数线缺失、
// 变量不倾斜。这个脚本用 marp-core 自带的 MathJax 离线把这些式子排成纯路径的
// SVG，再就地嵌回插图。
//
// 用法：在插图的 <text> 上写 data-tex，值是要排的 TeX：
//
//   <text x="235" y="328" class="eq" text-anchor="middle"
//         data-tex="x = r\cos\theta,\ y = r\sin\theta">x = r cosθ ，y = r sinθ</text>
//
// 脚本把这条 <text> 整条换成内嵌的 <svg>。位置全部由原 <text> 推出，不用手算：
//   · x 属性就是锚点，text-anchor 决定公式摆在锚点的左 / 中 / 右
//   · y 属性就是基线；MathJax 的 viewBox 以 0 为基线，所以顶边放在 y − baseline 处
//   · 颜色取原 <text> 的 computed fill（MathJax 用 currentColor 上色）
// 字号取 FONT_SIZE，默认 20px（主题根字号，见 themes/academic/academic_template.css）。
// 课件若在 <style> 里覆盖了 --marpit-root-font-size（例如整套 24px），插图也要跟着改，
// 否则图里的公式会比正文小一截：用 SVG_MATH_PX=24 跑一次即可。
//
// 原 <text> 会被删掉，所以无障碍信息要留在根元素的 aria-label 上。
//
// 注意：片段排好之后，原来的 x / text-anchor 就没了，将来想把插图整体放大（换字号、
// 改比例）只能从片段几何反推锚点。所以下面把对齐方式和锚点写进注释里：
//   …（基准 24px，与正文同字号，居中于 x=315） -->
// 有了这一行，「按 K 倍放大、基线不动」就是纯算术：
//   y' = y − (K−1)·基线偏移（基线偏移 = −viewBoxY × height/viewBoxHeight）
//   x' = 锚点 − K·宽 × f（f: 左 0 / 中 0.5 / 右 1）
//
// data-tex 是 XML 属性值，里面不能出现裸的 < 和 &：大于小于写 \lt \gt，
// 与号写 \amp。写了裸字符的话整个插图会解析失败（<img> 直接不出图）。
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('用法: node scripts/svg-math.mjs <插图.svg> [<插图.svg> ...]');
  process.exit(2);
}

const FONT_SIZE = +(process.env.SVG_MATH_PX || 20); // 默认等于主题根字号，保证插图里的公式和正文一样大
const bundle = path.resolve('node_modules/mathjax-full/es5/tex-svg.js');
try {
  readFileSync(bundle);
} catch {
  console.error(`找不到 MathJax: ${bundle}\n先跑一次 npm install。`);
  process.exit(2);
}

const browser = await chromium.launch();
const mathPage = await browser.newPage();
await mathPage.addInitScript(() => {
  window.MathJax = { startup: { typeset: false } };
});
await mathPage.addScriptTag({ path: bundle });
await mathPage.waitForFunction(() => window.MathJax?.tex2svg);

// 所有公式在同一个页面里连着排，MathJax 内部的 id 计数器才会一路递增，
// 免得同一张插图里多个公式的 <defs> id 撞车、<use> 指错地方。
const cache = new Map();
async function renderTex(texList) {
  const todo = [...new Set(texList)].filter((t) => !cache.has(t));
  if (todo.length) {
    const out = await mathPage.evaluate(
      ({ texList, fontSize }) => {
        const host = document.createElement('div');
        host.style.cssText = `position:absolute;left:-9999px;top:0;font-size:${fontSize}px`;
        document.body.appendChild(host);
        return texList.map((tex) => {
          host.replaceChildren(window.MathJax.tex2svg(tex, { display: false }));
          const svg = host.querySelector('svg');
          const rect = svg.getBoundingClientRect();
          // viewBox = "xMin yMin width height"，y 轴以 0 为基线
          const [, vbY, , vbH] = svg.getAttribute('viewBox').trim().split(/\s+/).map(Number);
          const scale = rect.height / vbH;
          svg.removeAttribute('style'); // 在插图里靠坐标定位，vertical-align 是 HTML 的概念
          svg.removeAttribute('width');
          svg.removeAttribute('height');
          return {
            tex,
            inner: svg.innerHTML,
            // MathJax 的字形用 <use xlink:href="#…"> 引用 <defs>，而 xlink 前缀必须在
            // 文档里声明过才合法。插图是当 XML 解析的（<img> / librsvg 都严格），
            // 少这一句会直接解析失败，所以往下搬内容时得把它一起带上。
            xlink: svg.outerHTML.includes('xlink:') ? ' xmlns:xlink="http://www.w3.org/1999/xlink"' : '',
            viewBox: svg.getAttribute('viewBox'),
            width: +rect.width.toFixed(2),
            height: +rect.height.toFixed(2),
            baseline: +(-vbY * scale).toFixed(2),
          };
        });
      },
      { texList: todo, fontSize: FONT_SIZE }
    );
    for (const r of out) cache.set(r.tex, r);
  }
  return texList.map((t) => cache.get(t));
}

let touched = 0;
for (const file of files) {
  const raw = readFileSync(file, 'utf8');
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.resolve(file)).href);

  // <text> 的文档顺序在 DOM 和源文件里一致，所以按序号回填，不做脆弱的字符串匹配
  const items = await page.evaluate(() =>
    [...document.querySelectorAll('text')].map((t) => ({
      tex: t.getAttribute('data-tex'),
      anchorX: +t.getAttribute('x'),
      baselineY: +t.getAttribute('y'),
      anchor: getComputedStyle(t).textAnchor,
      fill: getComputedStyle(t).fill,
    }))
  );
  await page.close();
  if (!items.some((it) => it.tex)) continue;

  const spans = [...raw.matchAll(/<text\b[^>]*>[\s\S]*?<\/text>/g)];
  if (spans.length !== items.length) {
    console.error(`✗ ${file}: 源文件里 ${spans.length} 条 <text>，DOM 里 ${items.length} 条，对不上，跳过`);
    process.exitCode = 1;
    continue;
  }

  const rendered = await renderTex(items.filter((it) => it.tex).map((it) => it.tex));
  const byTex = new Map(rendered.map((r) => [r.tex, r]));

  // 从后往前替换，前面的下标才不会被后面的改动挪位
  let out = raw;
  for (let i = items.length - 1; i >= 0; i--) {
    const it = items[i];
    if (!it.tex) continue;
    const r = byTex.get(it.tex);
    const left =
      it.anchor === 'middle' ? it.anchorX - r.width / 2 : it.anchor === 'end' ? it.anchorX - r.width : it.anchorX;
    const top = it.baselineY - r.baseline;
    // 匹配到的 span 从 <text 开始、不含行首缩进，所以往前退到行首整行重写，
    // 否则残留的空白会和下面补的 indent 叠成两倍。
    let start = spans[i].index;
    while (start > 0 && (out[start - 1] === ' ' || out[start - 1] === '\t')) start--;
    const indent = out.slice(start, spans[i].index);
    const n = (x) => +x.toFixed(2);
    // 对齐方式与锚点写进注释：片段本身只剩绝对坐标，不记下来就再也认不出原来对齐在哪
    const align = it.anchor === 'middle' ? '居中' : it.anchor === 'end' ? '右对齐' : '左对齐';
    const f =
      `${indent}<!-- MathJax 排版：${it.tex}（基准 ${FONT_SIZE}px，与正文同字号，${align}于 x=${n(it.anchorX)}） -->\n` +
      `${indent}<svg${r.xlink} class="mjx" aria-hidden="true" x="${n(left)}" y="${n(top)}" ` +
      `width="${r.width}" height="${r.height}" viewBox="${r.viewBox}" ` +
      `style="color:${it.fill};overflow:visible">${r.inner}</svg>`;
    out = out.slice(0, start) + f + out.slice(spans[i].index + spans[i][0].length);
    touched++;
  }

  writeFileSync(file, out);
  console.log(`✓ ${file}  替换 ${items.filter((it) => it.tex).length} 处公式`);
}

await browser.close();
if (!touched) console.log('没有找到带 data-tex 的 <text>，什么都没做。');
