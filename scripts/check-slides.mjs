// 幻灯片排布自检：把 marp 产出的 HTML 丢进 Chromium，
// 量一遍每页内容是否溢出 720px 版面、图实际渲染多高，以及每张 SVG 里文字是否越界 / 互相压字。
//
// 用法：node scripts/check-slides.mjs <deck.html> [svg 目录] [slid 关键字...]
import { chromium } from 'playwright';
import { readdirSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const [deckPath, svgDir, ...filters] = process.argv.slice(2);
if (!deckPath) {
  console.error('用法: node scripts/check-slides.mjs <deck.html> [svg 目录] [标题关键字 ...]');
  process.exit(1);
}

const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

await page.goto(pathToFileURL(path.resolve(deckPath)).href);
await page.waitForLoadState('networkidle');

/* ---------------- 1. 版面溢出 ---------------- */
const slides = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('section').forEach((s, i) => {
    const cs = getComputedStyle(s);
    // 内容盒底边相对 section 顶部的偏移
    const availBottom =
      s.clientHeight - parseFloat(cs.paddingBottom) - parseFloat(cs.borderBottomWidth);
    const top = s.getBoundingClientRect().top;
    let deepest = 0;
    let deepestEl = '';

    const walk = (el) => {
      const st = getComputedStyle(el);
      if (st.position === 'absolute' || st.position === 'fixed') return;
      if (st.display === 'none' || st.visibility === 'hidden') return;
      const bottom = el.getBoundingClientRect().bottom - top;
      if (bottom > deepest) {
        deepest = bottom;
        deepestEl =
          el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : '');
      }
      for (const c of el.children) walk(c);
    };
    for (const c of s.children) walk(c);

    // 只看顶层子元素的自然高度，方便核算纵向预算
    const children = [...s.children].map((c) => {
      const r = c.getBoundingClientRect();
      return {
        tag: c.tagName.toLowerCase() + (c.className ? '.' + String(c.className).split(' ')[0] : ''),
        h: Math.round(r.height),
      };
    });

    const title = (s.querySelector('h1, h2')?.textContent || '').trim().slice(0, 30);
    out.push({
      index: i + 1,
      title,
      availBottom: Math.round(availBottom),
      deepest: Math.round(deepest),
      deepestEl,
      children,
    });
  });
  return out;
});

console.log('\n=== 版面溢出检查（内容盒底边 / 实际最深内容）===\n');
let bad = 0;
for (const s of slides) {
  const over = s.deepest - s.availBottom;
  const flag = over > 0 ? '溢出' : over > -12 ? '临界' : 'ok  ';
  if (over > -12) bad++;
  console.log(
    `${flag}  p${String(s.index).padStart(2)}  ${String(s.availBottom).padStart(4)} / ${String(s.deepest).padStart(4)}` +
      `  (余 ${String(-over).padStart(4)}px)  ${s.title}  ← ${s.deepestEl}`
  );
}
console.log(`\n共 ${slides.length} 页，${bad} 页需要关注。`);

if (filters.length) {
  console.log('\n=== 指定页的纵向预算（顶层子元素自然高度）===\n');
  for (const s of slides) {
    if (!filters.some((f) => s.title.includes(f))) continue;
    console.log(`p${s.index}  ${s.title}`);
    for (const c of s.children) console.log(`     ${String(c.h).padStart(4)}px  ${c.tag}`);
    console.log('');
  }
}

/* ---------------- 2. 图的实际渲染尺寸 ---------------- */
console.log('\n=== 插图渲染尺寸 ===\n');
const imgs = await page.evaluate(() =>
  [...document.querySelectorAll('section img')]
    // 例稿的插图目录可能叫 media/ 也可能叫 images/，两种都认，免得改了目录名就静默漏检
    .filter((im) => /(?:^|\/)(?:media|images)\//.test(im.getAttribute('src') || ''))
    .map((im) => {
      const sec = im.closest('section');
      const r = im.getBoundingClientRect();
      return {
        file: im.getAttribute('src'),
        natural: `${im.naturalWidth}×${im.naturalHeight}`,
        rendered: `${Math.round(r.width)}×${Math.round(r.height)}`,
        loaded: im.complete && im.naturalWidth > 0,
        slide: (sec?.querySelector('h1, h2')?.textContent || '').trim().slice(0, 24),
      };
    })
);
for (const im of imgs) {
  console.log(
    `${im.loaded ? '✓' : '✗ 未渲染'}  ${im.file}  natural=${im.natural}  页面渲染=${im.rendered}  「${im.slide}」`
  );
}

/* ---------------- 3. SVG 内部文字越界 / 压字 ---------------- */
if (svgDir) {
  const files = readdirSync(svgDir).filter((f) => f.endsWith('.svg'));
  console.log('\n=== SVG 文字检查 ===\n');
  for (const f of files) {
    const raw = readFileSync(path.join(svgDir, f), 'utf8');
    const report = await page.evaluate((svgText) => {
      const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
      const err = doc.querySelector('parsererror');
      if (err) return { error: err.textContent.replace(/\s+/g, ' ').slice(0, 160) };

      const host = document.createElement('div');
      host.style.cssText = 'position:fixed;left:-9999px;top:0;width:1220px';
      host.innerHTML = svgText;
      document.body.appendChild(host);
      const svg = host.querySelector('svg');
      const vb = svg.viewBox.baseVal;

      const boxes = [...svg.querySelectorAll('text')].map((t) => {
        const b = t.getBBox();
        return { t: t.textContent.trim().slice(0, 20), x: b.x, y: b.y, w: b.width, h: b.height };
      });
      const outside = boxes.filter(
        (b) =>
          b.x < vb.x - 1 ||
          b.y < vb.y - 1 ||
          b.x + b.w > vb.x + vb.width + 1 ||
          b.y + b.h > vb.y + vb.height + 1
      );
      const hits = [];
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i],
            c = boxes[j];
          const ox = Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x);
          const oy = Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y);
          if (ox > 2 && oy > 2)
            hits.push(`「${a.t}」×「${c.t}」 叠 ${Math.round(ox)}×${Math.round(oy)}px`);
        }
      }

      // 连线 / 曲线是否穿过文字。先排掉被「后绘制的遮挡物」盖住的那一段：
      // 文字标签常用白色矩形压住底下的线，实心圆也常盖住穿过的连线，这类不算问题。
      const order = new Map();
      [...svg.querySelectorAll('*')].forEach((el, i) => order.set(el, i));
      const masks = [...svg.querySelectorAll('rect, circle, ellipse')]
        .filter((el) => {
          const f = getComputedStyle(el).fill;
          return f && f !== 'none' && !f.startsWith('rgba(0, 0, 0, 0)');
        })
        .map((el) => {
          if (el.tagName === 'circle' || el.tagName === 'ellipse') {
            const cx = +el.getAttribute('cx') || 0,
              cy = +el.getAttribute('cy') || 0,
              r = el.tagName === 'circle' ? +el.getAttribute('r') : 0;
            return { i: order.get(el), inside: (x, y) => Math.hypot(x - cx, y - cy) <= r };
          }
          const x = +el.getAttribute('x') || 0,
            y = +el.getAttribute('y') || 0,
            w = +el.getAttribute('width') || 0,
            h = +el.getAttribute('height') || 0;
          return { i: order.get(el), inside: (px, py) => px >= x && px <= x + w && py >= y && py <= y + h };
        });
      const masked = (x, y, oi) => masks.some((m) => m.i > oi && m.inside(x, y));

      const struck = new Set();
      const probe = (x, y, oi, label) => {
        const t = boxes.find((b) => x >= b.x - 1 && x <= b.x + b.w + 1 && y >= b.y - 1 && y <= b.y + b.h + 1);
        if (!t || masked(x, y, oi)) return;
        struck.add(`${label} 穿过「${t.t}」`);
      };
      [...svg.querySelectorAll('line')].forEach((l) => {
        const x1 = +l.getAttribute('x1'),
          y1 = +l.getAttribute('y1'),
          x2 = +l.getAttribute('x2'),
          y2 = +l.getAttribute('y2');
        const n = Math.ceil(Math.hypot(x2 - x1, y2 - y1) / 3);
        for (let k = 0; k <= n; k++)
          probe(x1 + ((x2 - x1) * k) / n, y1 + ((y2 - y1) * k) / n, order.get(l), 'line');
      });
      [...svg.querySelectorAll('path')].forEach((pa) => {
        if (pa.closest('marker')) return;
        const L = pa.getTotalLength(),
          n = Math.ceil(L / 3);
        for (let k = 0; k <= n; k++) {
          const pt = pa.getPointAtLength((L * k) / n);
          probe(pt.x, pt.y, order.get(pa), 'path');
        }
      });

      host.remove();
      return { outside, hits, struck: [...struck], count: boxes.length };
    }, raw);

    if (report.error) {
      console.log(`✗ ${f}\n   XML 解析失败: ${report.error}`);
      continue;
    }
    const problems = report.outside.length + report.hits.length + report.struck.length;
    console.log(`${problems ? '✗' : '✓'} ${f}  (${report.count} 处文字)`);
    for (const o of report.outside)
      console.log(`     越界: 「${o.t}」 x=${Math.round(o.x)} y=${Math.round(o.y)}`);
    for (const h of report.hits) console.log(`     压字: ${h}`);
    for (const s of report.struck) console.log(`     压线: ${s}`);
  }
}

await browser.close();
