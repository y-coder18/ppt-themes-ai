// 把 TeX 公式渲染成可以直接嵌进插图的独立 SVG。
//
//   node scripts/tex2svg.mjs <基准字号px> <tex> [<tex> ...]
//
// 为什么需要它：插图（media/*.svg）是独立文档，Marp 的公式排版进不去，
// 根号会退化成裸字符「√5」而不是带横盖的完整根式。这个脚本用 marp-core
// 自带的 MathJax（node_modules/mathjax-full）离线渲染，输出纯路径的 SVG，
// 再手工贴进插图即可。
//
// 输出 JSON 数组，每项：
//   tex      原样返回
//   svg      <svg>…</svg> 片段，width/height 已换成量到的像素值
//   width    渲染宽度 px
//   height   渲染高度 px
//   baseline 从 SVG 顶边到数学基线的距离 px
//
// 定位方法：MathJax 的 viewBox y 轴以 0 为基线，所以把 SVG 顶边放在
//   top = 目标基线 y − baseline
// 处，公式的基线就正好落在目标基线上，和旁边的文字对齐。
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const [fontSizeArg, ...texList] = process.argv.slice(2);
const fontSize = Number(fontSizeArg) || 20;

if (texList.length === 0) {
  console.error('用法: node scripts/tex2svg.mjs <基准字号px> <tex> [<tex> ...]');
  process.exit(2);
}

// MathJax 的浏览器打包文件（marp-core 的依赖，随项目安装）
const bundle = path.resolve('node_modules/mathjax-full/es5/tex-svg.js');
try {
  readFileSync(bundle);
} catch {
  console.error(`找不到 MathJax: ${bundle}\n先跑一次 npm install。`);
  process.exit(2);
}

const browser = await chromium.launch();
const page = await browser.newPage();

// 必须在打包文件执行前设好，否则 MathJax 会自己去扫页面
await page.addInitScript(() => {
  window.MathJax = { startup: { typeset: false } };
});
await page.addScriptTag({ path: bundle });
await page.waitForFunction(() => window.MathJax?.tex2svg);

const results = await page.evaluate(
  ({ texList, fontSize }) => {
    const host = document.createElement('div');
    host.style.cssText = `position:absolute;left:-9999px;top:0;font-size:${fontSize}px`;
    document.body.appendChild(host);

    return texList.map((tex) => {
      const node = window.MathJax.tex2svg(tex, { display: false });
      host.replaceChildren(node);
      const svg = host.querySelector('svg');
      const rect = svg.getBoundingClientRect();

      // viewBox = "xMin yMin width height"，其中 y 轴以 0 为基线
      const [, vbY, , vbH] = svg
        .getAttribute('viewBox')
        .trim()
        .split(/\s+/)
        .map(Number);
      const scale = rect.height / vbH;

      svg.setAttribute('width', rect.width.toFixed(2));
      svg.setAttribute('height', rect.height.toFixed(2));
      // 在插图里靠坐标定位，vertical-align 是 HTML 的排版概念，去掉免得混淆
      svg.removeAttribute('style');

      return {
        tex,
        svg: svg.outerHTML,
        width: +rect.width.toFixed(2),
        height: +rect.height.toFixed(2),
        baseline: +(-vbY * scale).toFixed(2),
      };
    });
  },
  { texList, fontSize }
);

await browser.close();
console.log(JSON.stringify(results, null, 2));
