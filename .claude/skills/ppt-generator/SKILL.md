---
name: ppt-generator
description: 在 Marp-PPT 项目中生成演示文稿。当用户要求创建 PPT、幻灯片、演示文稿时使用此 skill。负责按照项目规范编写 Marp Markdown 源文件，使用 Academic 主题和自定义组件。
---

# PPT 生成器

此 skill 用于在本项目中生成 Marp 演示文稿，提供项目约定和最佳实践参考。

> 要**改主题组件本身**（新增组件、调组件样式、加变体），看 `ppt-component-design` skill —— 那里是 CSS 组件层的设计准则。这份文档只讲怎么把组件用对。

## 约定与规范

### Marp 指令格式（非常重要！）

Marp 的页面指令（`_class`、`_header` 等）**必须写在 HTML 注释 `<!-- -->` 中**，不能裸写在 `---` 分隔符之间。裸写的指令不会被 Marp 正确解析。

**正确格式：**

```markdown
---
marp: true
theme: academic_template
paginate: false
---

<!--
_class: homePage
-->

# 标题

## 副标题

---

<!--
_header: 页眉文字
_class: contentPage
-->

## 内容页标题

正文内容...
```

> **约定：页码只走 frontmatter 的 `paginate: false`，页面里不要写 `_paginate`。**
>
> 每一页的 `<!-- -->` 注释块里只写 `_class` / `_header`，**不要加 `_paginate: false` 或 `_paginate: true`**。既不要逐页重复 `false`，也不要按页开 `true`——页码开关在 frontmatter 里统一定，用户明确要求页码时才改那一处。

**错误格式（指令不会生效）：**

```markdown
---

_class: homePage
_header: 页眉文字

---

# 标题
```

**不要写 logo！** logo 已与主题绑定，由主题 CSS 提供。封面页（`homePage`）、致谢页（`thanksPage`）、页眉和章节页的 logo 全部来自主题里的 `--logo` 变量，正文 Markdown 里**不需要也不应该**再写 `![...](logo.png)`——写了会变成两个 logo，页眉和章节页的 logo 也不会跟着换。

换 logo / 换背景图请改皮肤文件（`themes/academic/academic_*.css`），只改变量块即可：

```css
:root {
  --logo: url("../../themes/academic/定制皮肤/XXX/XXXlogo.png");
  --logo-home-h: 120px;    /* 封面 logo 高度，0px = 封面不放 */
  --logo-thanks-h: 80px;   /* 致谢页 logo 高度，0px = 致谢页不放 */
  --home-bg: url("...");      /* 封面整页背景图 */
  --contents-bg: url("...");  /* 目录页左侧竖图 */
  --thanks-bg: url("...");    /* 致谢页整页背景图 */
}
```

### 页面类型一览

| `_class` | 用途 | 说明 |
|---|---|---|
| `homePage` | 封面 | 全屏图片背景 + 蓝色渐变遮罩，h1 通栏标题栏 |
| `contents` | 目录页 | 深蓝背景 + 左侧图片面板，列表项用 `**01**` 格式的数字 |
| `chapterPage` | 章节标题页 | 左侧纯色深蓝面板（编号水印 + logo）+ 右侧白底标题区 |
| `contentPage` | 内容页 | 白底 + 页眉，最常用的工作页面 |
| `thanksPage` | 感谢页 | 深蓝背景 + 图片，居中致谢文字 |
| `homePageCUST` | 封面（另一版） | **仅 academic_CUST 皮肤**。白底彩色 logo + 通栏蓝带（左侧白色线条主视觉、右侧标题/分隔线/副标题）+ 底部信息行（`<flex center>` 包若干基座的 `iconitem` 组件） |
| `thanksPageCUST` | 致谢页（另一版） | **仅 academic_CUST 皮肤**。与 `homePageCUST` 同一副骨架（logo / 蓝带 / 三角指示 / 信息行位置都一样），但蓝带里没有线条主视觉与云朵，标题、分隔线、副标题与底部信息行**整体居中**——适合放在结尾页，与左对齐的封面区分开 |

**章节页示例：**

```markdown
---

<!--
_class: chapterPage
-->

<div class="chapter-num">01</div>

## 章节标题

### 章节描述或副标题

---
```

> **章节编号需手写**：左侧面板的编号由 `<div class="chapter-num">01</div>` 手动指定，主题没有实现 CSS 自动计数器。不写这一行时左侧面板只显示 logo。

**线条页（`homePageCUST` 封面 / `thanksPageCUST` 致谢页，长沙理工大学皮肤）示例：**

```markdown
<!--
_class: homePageCUST
-->

# 研究生工作月报

## 依托工程现场工作与桥梁损伤识别科研进展

<flex center>

<iconitem icon="话筒">汇报人：XXX</iconitem>

<iconitem icon="人员">指导教师：××× 教授</iconitem>

</flex>
```

> `iconitem` 是基座里的**图标条目**原子组件：左边一个圆底图标，右边一段文字。**任何皮肤、任何页面（封面 / 内容页 / 章节页……）都能用**，不是线条封面专属。
> 它只管自己这一条怎么排，不管摆放——要横排几条、怎么对齐，外面套 `flex` / `grid` 即可；条目之间要用空行隔开。
> 写法两页通用：把上面的 `_class` 换成 `thanksPageCUST` 就是结尾页那一版——同样的 `h1` / `h2` / 信息行，只是整体居中。
> 位置由所在页面决定：线条页（`homePageCUST` / `thanksPageCUST`）里整行 `flex` 被绝对定位钉在底部，在基座 `homePage` 里就是紧跟在副标题后的一行。
> `icon` 属性填素材名（不带 `.svg`），现收录 18 个：`话筒` `人员` `日历` `位置` `链接` `时钟` `闹钟` `教育` `灵感` `文件夹` `列表` `列表分类` `网格分类` `显示器` `消息` `直播` `耳机` `等待`；
> 不写 `icon` 就只有文字、没有圆底图标。
> 图标是基座自带的白色线条图形（`themes/academic/images/icon/`），蓝圆底 + 白图标，任何皮肤开箱即有。
> 变体：`[plain]` 去圆底（白色图标，只适合深色页面）、`[large]` / `[small]` 改尺寸、`[compact]` 紧凑。

### 关于 `<br>` 标签

项目中的组件间距由 CSS 主题内置提供，不需要使用 `<br>` 标签来制造间距。Markdown 原生的空行已经足够分隔不同块级元素。

### 图片路径中的空格

Markdown 图片语法 `![alt](路径)` 的路径中**不能有裸空格**——空格会导致图片语法解析失败，图片会退化成字面文本而不是被渲染出来。引用带空格的文件夹（如 `半年 15 人 642 次更新...`）时最容易踩这个坑。

**解决：把路径中的空格编码为 `%20`。** 全角冒号等其它字符不影响解析。

```markdown
<!-- 错误：路径含裸空格，图片无法渲染 -->
![首页](资料/半年 15 人 642 次更新/media/首页.png)

<!-- 正确：空格编码为 %20 -->
![首页](资料/半年%2015%20人%20642%20次更新/media/首页.png)
```

> 提示：`w:` / `h:` 尺寸指令（如 `![w:880px 描述](路径)`）正常生效，不受路径编码影响。
> 但**写在 `<figure>` 里时要加 `auto`**（`<figure auto>`），否则图片会被拉伸，见下文。

### 图注不要写「图 N」编号

图片下方的说明文字**不要带 `**图 1**`、`**图 2**` 这类编号**，直接写说明本身。图片、`<figure>` 容器、来源脚注（`<note footnote>`）都保留，只去掉编号标注。

```markdown
<!-- 错误：带编号 -->
![主桥立面布置与测点断面位置](media/bridge-elevation.svg)

**图 3** 主桥立面布置（85 m + 160 m + 85 m）与 4 个测试断面位置

<!-- 正确：只有说明文字 -->
![主桥立面布置与测点断面位置](media/bridge-elevation.svg)

主桥立面布置（85 m + 160 m + 85 m）与 4 个测试断面位置
```

### `<figure>` 里用 `w:` / `h:` 要加 `auto`

`<figure>` 默认让图片撑满整行（`figure img { width: 100% }`）。Marp 的尺寸指令是写成**行内** `style="height:380px"` 的，行内样式覆盖不掉，于是高度锁死、宽度被撑满——**方图会被横向拉伸**。卡片内插图、需要控制尺寸的小图，都要写成 `<figure auto>`：

```markdown
<!-- 错误：h:380px 的方图被拉成扁的 -->
<figure>

![h:380px 箱梁内壁应变计安装](media/strain-gauge.jpg)

应变计粘贴于箱梁内壁并接入引线

</figure>

<!-- 正确：auto 让图片按 h:380px 等比缩放并居中，图注样式照旧 -->
<card>

<figure auto>

![h:380px 箱梁内壁应变计安装](media/strain-gauge.jpg)

应变计粘贴于箱梁内壁并接入引线

</figure>

</card>
```

- `<figure auto>` 要配 `w:` / `h:` 一起用；不写尺寸指令时图片按原始像素渲染，可能超出容器。
- 卡片内插图统一用 `<figure auto>` + 图注，不要用 `<note center>` 当图注——两者字号、颜色不同，图注样式对不上全文其它插图。
- 反过来，整页大图或 SVG 示意图**不要**加 `auto`，撑满整行才是想要的。

### 图文条目用 `<imginfo>`，别用 `card` 装照片

`<imginfo>` 是**卡片里放图 + 标题与说明**的条目组件。人和物通用：人像（照片 + 姓名 + 生平）、书籍（封面 + 书名 + 简介）、概念（示意图 + 名称 + 解释）、产品（截图 + 名称 + 说明）都用它。它**只给一层皮肤**——圆角、细框、投影、内边距，加上标题 / 副标题行 / 卡内引用这套文字样式；**里面怎么排由你写**：

```markdown
<imginfo>

<flex>

![h:240px 西格蒙德·弗洛伊德](media/freud.jpg)

<flex column>

### 弗洛伊德

#### 1856–1939 · 奥地利精神分析学派创始人

他把人的现在，追溯到童年与无意识——过去解释现在。

</flex>

</flex>

</imginfo>
```

- 上面是图左文右。**图在右**：把两块内容掉个个儿，图写在 `<flex column>` 后面。**图在上、文在下**：外面那层写成 `<flex column>`。组件不预设任何一种排法，所以同一页里两张卡各排各的也不会打架。
- **图的大小要自己给**：`h:240px` / `w:200px`，不给就按原图像素渲染，很容易把卡片撑破。同一排的几张要统一高度，否则对不齐——这里没有定死的图框替你兜底。
- 标题下**紧挨着的第二个标题**（如上面的 `####`）自动降级成小一号的浅灰「副标题行」，放生卒年 / 作者 / 版本号这类元信息；不写也不影响。`>` 引用在卡内换成「3px 强调色竖线 + 极浅同色底」的金句样式，一页最多一条，别当正文用。
- 变体：`[green|red|yellow|gray]` 换强调色、`[compact]` 收紧内边距与字号（**图的大小不跟着收**，那是你写在图片上的值）。
- `<imginfo>` 标签与内部内容之间**必须空行**（和 `<figure>` 一样），否则里面几行会被当作原始 HTML 原样输出，图片不会渲染。

### 慎用 compact 类

`_class: compact` 会缩小页面间距和组件间距，**只在页面内容确实放不下时才用**。大部分页面用默认间距即可，不要每页都加 `compact`。

典型需要 compact 的场景：
- timeline 有 6 个以上节点，且每个节点都有详细描述和 blockquote

不需要 compact 的场景：
- 普通卡片布局（grid + card）
- 3-4 个节点的 timeline
- 图文混排页面
- 表格页

## 公式（非常重要！）

**正文里的数学一律用 LaTeX，不要写裸字符。** `√5`、`x²/4`、`θ`、`≤` 这种直接敲出来的字符，字号和字形跟正文混在一起、根号没有横盖、分数没有分数线，投影时尤其难看。

```markdown
<!-- 错误：裸字符 -->
已知 |b| < √5，故 -4√5/5 < x_M < 4√5/5

<!-- 正确：LaTeX -->
已知 $|b| < \sqrt{5}$，故 $-\frac{4\sqrt{5}}{5} < x_{M} < \frac{4\sqrt{5}}{5}$
```

- 行内公式用 `$…$`，独立成行用 `$$…$$`。
- frontmatter 里写 **`math: mathjax`**（Marp 的默认引擎就是 MathJax，写出来是为了换环境时默认值变了也不会悄悄换引擎）。
- **变量也要进公式**：`$x$`、`$y$`、`$\theta$`、`$r$`——正体中文里夹一个不倾斜的 x，就和后文公式里的 $x$ 不是一个东西了。
- 标题、图注里的公式同样要写 LaTeX，不能只有正文讲究。
- **`<summary>` 是唯一相反的地方：那里不要出现公式。** 页脚横条是行高最紧、字号最小的一块，公式进去后基线、行高都和周围的粗体中文对不上，投影时最显眼。把话改成中文说出来：

```markdown
<!-- 错误 -->
<summary bold><tag>要点</tag> $\theta$ 仍是**参数**，伸缩之后它不再等于终边的几何夹角</summary>

<!-- 正确：把符号说成话 -->
<summary bold><tag>要点</tag> 角**仍是参数**，伸缩之后它不再等于终边的几何夹角</summary>
```

  数字答案也一样，正文/卡片里已经用 `<mark>` 标过一次了，summary 里复述时用「切点就是取到最大值的点」这样的说法，而不是再抄一遍坐标。
- 唯一的例外是图片 `alt` 文字（`![…](…)` 的方括号里）——那里是纯文本，写不了公式，用中文描述即可。
- 强调用 `<mark>` 包住公式（Marp 不解析 `==…==`）：`<mark>$x + y$ 的最大值为 5</mark>`。

### 单个课件改基准字号

主题的基准字号是 `:root` 里的 20px（`compact` 是 22px）。要某个课件整体换一档（例如投影用 24px），写在这个课件自己的 `<style>` 里：

```css
:root {
  --marpit-root-font-size: 24px;  /* 主题里所有 calc(var(...) * k) 尺寸的基准 */
  font-size: 24px;                /* 同义的另一种写法，见下 */
}
```

主题里的 rem 全被 Marpit 编译成了 `calc(var(--marpit-root-font-size, 1rem) * k)`——标题、图注、`<tag>`、`<summary>`、metric 数字与正文段落挂在同一条链上，所以**改这一个变量就整体缩放**。这两条属性 Marpit 会把它们补成同一个值：实测只写变量、或只写 `font-size`，量出来的字号完全一样（`h2` 31.39px、正文 24px），因此**写哪条都行、不必都写**；两条都留着只是把「基准是多少」写得更显式。

放大字号会挤掉纵向余量，而 `padding`（80/30/10）和插图的像素尺寸是固定的，通常要配合收一收块间距：

```css
:root { --gap: 28px; }   /* 默认 32px */
```

**插图要跟着改**：`media/*.svg` 是独立文档、字号写死在里面，正文一变图里的字就小一截（见下文）。

### 行内用斜杠，独立成行才用 `\frac`

`\frac` 在行内会被压扁：分子分母都要缩小排、整块实测 30px 高（正文一行才 20px），把行距撑开又看不清。所以**行内一律写成斜杠形式**，只有独立成行的 `$$…$$` 和步骤结果才用 `\frac` 堆叠（`<summary>` 里根本不写公式，见上）。

```markdown
<!-- 行内：斜杠 -->
把直线代入 $x^{2}/4 + y^{2} = 1$，整理得

<!-- 独立成行：堆叠 -->
$$5x^{2} + 8bx + 4(b^{2} - 1) = 0$$
```

反直觉的一点：**堆叠的 `\frac` 反而比斜杠形式窄**（分母短、省掉了斜线），窄容器里该用堆叠而不是斜杠。同一式子 20px 实测：`-\frac{4\sqrt{5}}{5} < x_{M} < \frac{4\sqrt{5}}{5}` 宽 203.88px，写成斜杠形式 `-4\sqrt{5}/5 < x_{M} < 4\sqrt{5}/5` 反而要 257.78px。

### 插图（`media/*.svg`）里的公式要预排

插图是**独立文档**，Marp 的公式排版进不去——公式直接写在 `<text>` 里只会得到裸字符。所以插图里的公式要用 **`scripts/svg-math.mjs`** 事先排成矢量再嵌回去：

```bash
node scripts/svg-math.mjs PPT/数学课件/media/*.svg
```

用法是在 `<text>` 上加 `data-tex`：位置（锚点 / 基线 / 对齐 / 颜色）全部从原 `<text>` 的 `x`、`y`、`text-anchor`、`fill` 推出来，不用手算坐标。

```svg
<text x="235" y="328" text-anchor="middle"
      data-tex="x = r\cos\theta,\ y = r\sin\theta">x = r cosθ，y = r sinθ</text>
```

- 字号默认 **20px**，与主题根字号一致；课件覆盖过基准字号（如上文的 24px）时用 `SVG_MATH_PX=24 node scripts/svg-math.mjs …` 跟上，否则图里的字会比正文小一截。图里的中文标签同理，它们的字号写在各张图自己的 `.tt` 类上。
- 片段的注释里记了对齐方式与锚点（`…（基准 24px，与正文同字号，居中于 x=315） -->`）。那不是备注，是**将来整体放大插图时唯一的依据**——片段只剩绝对坐标，原来的 `x` / `text-anchor` 已经没了：`y' = y − (K−1)·基线偏移`（基线偏移 = `−viewBoxY × height/viewBoxHeight`，基线不动）、`x' = 锚点 − K·宽 × f`（f：左 0 / 中 0.5 / 右 1）。锚点认不出来的话，可用「片段 x 只保留 2 位小数，三个候选锚点里只有作者手写的那个是整数/整半」反推。
- **排成矢量的片段，碰撞检查看不见**：`check-slides.mjs` 只遍历 `text` / `line` / `path`，而 MathJax 是 `<defs>` 字形 + `<use>` 引用，所以它给出的 ✓ 不代表图内公式没压字。放大插图后要肉眼过一遍，或把单张插图渲染出来看（Playwright 裁 `svg` 的 bounding box 截图）。
- 原 `<text>` 会被整条删掉，**无障碍信息要挪到根元素的 `aria-label` 上**。
- 想先看单条公式的效果并拿尺寸，用 `scripts/tex2svg.mjs <字号> '<TeX>'`。
- **`data-tex` 是 XML 属性值，不能出现裸的 `<` 和 `&`**：大于小于写 `\lt` `\gt`，与号写 `\amp`；文本内容里用 `&lt;`。写了裸字符整个插图会解析失败、`<img>` 直接不出图（`svg-math.mjs` 发现 `<text>` 条数对不上会报警跳过）。
- **MathJax 里加粗不可用**：离线包没有 `\boldsymbol`，会触发联网 autoload 然后以 `MathJax retry` 失败。插图里的公式靠**颜色**强调，别指望加粗。
- **中文别塞进 MathJax**：`（θ 为参数）`、`x 方向：× a/r` 这类中英混排标签留在普通 `<text>` 里（沿用插图自己的字体）就好，整体交给 MathJax 会变豆腐块。

### 导出到 PPTX 之后

- MathJax 排出来的公式在 PPTX 里是**矢量图形**（custGeom 形状），**不在文本层**——在 PowerPoint 里改不了公式内容，要改只能回 Markdown 重新导出。插图里的图形同样会变成原生矢量形状。
- 换 KaTeX 引擎虽然能把字符留在文本层，但顺序是乱的，一样不算可编辑，所以仍旧用 MathJax。
- 单字符的窄公式（如 `$\theta$`，约 10×17px）在 LibreOffice 往返重渲染时可能丢字形——**那是 LibreOffice 的问题，PPTX 本身没毛病**。要确认就解压 pptx、在 slide XML 里按填充色找 custGeom 形状，别凭 LibreOffice 渲出来的 PNG 下结论。

## 解题步骤排成「步骤表」，不要排成散文

上课用的课件里，「解」这种分步推导**不要**写成一串 `**① 设参**　设直线 $l$：…` 的流式段落。这样写出来的三个毛病，投影时全都会被放大：

1. 步骤名长短不一（「设参」两字、「消参并定范围」六字），后面正文的起点就跟着参差；
2. 一行折回来会掉到卡片最左边，和上一行的正文对不上，看着像一句掉队的散句；
3. 行内 `\frac` 被压得很小，几步之间的行高还不一样。

改成「标签 + 内容」两列，用网格排（放在课件自己的 `<style>` 里，`card.solve` 是给卡片起的名字）：

```css
card.solve .steps {
  display: grid;
  grid-template-columns: max-content 1fr; /* 标签列自动取最宽的那个，不用手数几个字 */
  column-gap: 0;        /* 列距改成内容格的左内边距，线的起点才落在内容列上 */
  align-items: stretch; /* 两格等高，线才落在行底，而不是各自内容的底下 */
}
/* 横线只画在内容格下面、从内容列的左边缘起：标签落在线的外侧，读起来是一串缩进的条目 */
card.solve .steps > :nth-child(even) {
  padding: 2px 0 2px 12px;              /* 左内边距 = 标签与正文之间的那段留白 */
  border-bottom: 1px solid #e2e8f0;     /* 主题里那条中性的细线 */
}
/* 最后一步压着卡片自己的下边框，不用再画一条 */
card.solve .steps > :nth-last-child(-n + 2) { border-bottom: 0; }
card.solve .steps > :nth-child(odd) {
  color: #003f88;
  font-weight: 700;
  white-space: nowrap;
  display: flex;
  align-items: flex-start;  /* 标签对齐内容首行，见下 */
  padding-top: 2px;         /* 与内容格上内边距同值，两边基准线才对得上 */
}
card.solve .steps > :nth-child(even) > * + * { margin-top: 6px; }  /* 卡片里段落 margin 是 0，靠 gap 分隔，进网格后要补回来 */
/* 行间公式默认在整格里居中，见下 */
card.solve .steps mjx-container[display] > svg { width: auto !important; }
```

不想让每一步下面有分隔线时，把内容格里的 `border-bottom` 和 `:nth-last-child` 那一条删掉、`padding` 收成 `0 0 0 12px` 即可；标签那几条（颜色、加粗、对齐）不用动——标签列怎么排，跟有没有线是两回事。

源码里每一步写成一格标签 + 一格内容，**标签单独一行、前后不留空行**（不留空行才不会被包进 `<p>`），**内容前后留空行**（留了空行才按 Markdown 排版，`$…$`、`<mark>`、`$$…$$` 才生效）：

```markdown
<card class="solve">

### 解

<div class="steps">

<div>① 设参</div>

<div>

设直线 $l$：$y = x + b$

</div>

<div>② 代入</div>

<div>

代入 $x^{2}/4 + y^{2} = 1$，整理得

$$5x^{2} + 8bx + 4(b^{2} - 1) = 0$$

</div>

</div>

</card>
```

几条配套的经验：

- **步骤名统一两个字**，它同时就是页尾 `<summary>` 里那条流程（`设参 → 代入 → 判别 → 韦达 → 消参`）的词，学生一眼能把卡片和流程对上。
- **该堆叠的分数挪到 `$$…$$` 独立成行**（如韦达定理那步的两个 $x_{M}$、$y_{M}$）：行内 `\frac` 在 24px 下小到投影看不清，而独立成行后是正常大小。步骤表里公式块会自然落在内容列上，不再另起一行贴左边。
- **行间公式的居中是 Marp 给的，不是 `text-align`**：Marp 给行间公式的 `<svg>` 写了行内样式 `width: 100%`，元素撑满整格，图再靠 `preserveAspectRatio` 在盒子里居中（`max-height` 恰好等于公式自身高度，所以图其实是原尺寸）。要让它跟内容列左对齐，只能覆盖 svg 的宽度：`width: auto !important`（回退到 MathJax 写的 `width="…ex"`），盒子一贴合，图就落到左边缘，尺寸不变。
- **要加行分隔线，先想清楚「线跟着哪个盒子走」**：`border-bottom` 画在格子上，而格子默认**不**跟行等高（`align-items: baseline` / `center` 时只跟自己内容一样高），同一行的标签格和内容格就各画各的，线会断成高低两截——所以要 `align-items: stretch` 让两格等高，线才会落在行底。横向上想要「线从内容列起笔、不伸到标签下面」（像缩进的条目，而不是一张表格）就 `column-gap: 0`，把列距换成内容格的 `padding-left`：留着列距，线到内容之间会空出一道缝。高度上用一个行距 `2px + 1px 线 + 2px = 5px` 顶掉原来的 `row-gap: 6px`，整页高度几乎不变。
- **标签别用 `align-items: center`**：标签格跟行等高之后，`center` 会让它竖排在整行的半腰——某一步里有 `$$…$$` 公式时行很高，标签就飘到公式中间去了，正是「不好看」的来源。改成 `align-items: flex-start`，再给标签格一个和内容格上内边距同值的 `padding-top`，两边基准线才齐。
- **别加隔行淡底**：`#f8fafc` 的斑马底放到白卡片上只差 2.7%，投影看不见——实测把「有底」和「无底」两版放大截图并排比，肉眼分不出差别，白多一层噪声（PPTX 里还多一层矩形）。看不清的装饰就是没有装饰。
- **验证要落到 PPTX**：这一套在 PPTX 里保得住（转换器是量了 DOM 位置再逐块输出文本框的），但别只看 HTML 就下结论——解压 pptx 看 slide XML 里各形状的 `a:off`，标签与内容在不在同一个 x 列上一目了然。分隔线同理：**一行线就是一个又扁又宽的形状**（`fill` 是那个 `#e2e8f0`，`cx` 就是内容列的宽、`x` 落在内容列左边缘），行数少了最后一行没有；筛法按 `a:ext` 的 `cy` 小于 4、`cx` 大于几百来找。
- **长句子里嵌 `<mark>`，小心高亮被折到两行**：一段话里只要有 `$…$` 行内公式，Marp 给 MathJax 的盒子是固定宽的、不会跟着缩，整段就撑破内容格，`<mark>` 正好被切在两行中间（`当 $\sin(\theta+\varphi)=1$ 时，<mark>$x+y$ 的最大值为 5</mark>` 在 437px 的内容格里要 484px）。别去抠字（差几十像素，改两个字不保险），**把结论拆成独立一段**，让高亮整个落到下一行。量法：给段落临时 `width='max-content'` 读 `getBoundingClientRect().width`，跟内容格的可用宽一比就知道差多少。
- 顺带一个坑：`execSync` 在 Windows 上默认走 `cmd.exe`，脚本里 `rm -rf x && mkdir -p x` 会因为 `-p` 被当成目录名而失败，目录操作用 `node:fs` 的 `rmSync` / `mkdirSync`。

## 页面内容量

不必把同一主题的内容强行挤在一页，拆成多页往往更清晰。以下是一些常见的拆分参考：

- 多个带代码块的卡片，可以考虑分页展示
- 同一页堆叠了多种不同类型的展示组件时
- timeline 节点较多且每个都有详细子项时

### timeline 左右分栏

当 timeline 步骤过多导致纵向放不下时，核心思路是**用宽度换高度**：把步骤拆成两组，用 `<grid cols="2">` 左右并排两个 timeline，垂直高度直接减半。

```markdown
<grid cols="2">

<timeline>

- 第一步：...
  - 事项 1

- 第二步：...
  - 事项 2

</timeline>

<timeline>

- 第三步：...
  - 事项 3

- 第四步：...
  - 事项 4

</timeline>

</grid>
```

同理，如果三列更合适也可以用 `<grid cols="3">`。关键是页面高度不够时，**不要只想着分页，先看看能不能用宽度来消化**。

## 写完后做检查

PPT 写完后：

1. 快速浏览每页的 Markdown，看看有没有内容会超出页面展示范围。该拆分就拆分，PPT是可以随时切换的，可读性要强，没必要所有内容都放在一页。
2. 检查有没有 `<br>` 标签，有的话去掉，Markdown 原生的空行已经足够分隔不同块级元素。
3. 检查有没有 `_paginate` 页面指令、图注里的 `**图 N**` 编号，有的话都去掉（见上面的约定）。
4. 搜一遍裸写的数学字符（`√` `≤` `≥` `≠` `θ` `π`，以及 `x2` `x^2` 这类伪上标），全部改写成 `$…$`；再确认插图里没有残留带裸公式的 `<text>`。
5. 反过来搜一遍 `<summary>`：**里面不该有任何 `$…$`**，有就改写成中文说法。
   `node -e "…"` 在 Git Bash 里会被反斜杠转义坑到，用 Grep 工具搜 `<summary[\s\S]{0,300}?\$[^$]+\$`（多行模式）就够。

## 构建命令

> 本仓库的 bash（Windows 上的 Git Bash）里 `npx marp` **要带 `--no-stdin`**，否则它会一直等 stdin 而不返回。

```bash
# 实时预览
npm run dev

# 导出 HTML（基座 + 要用的皮肤，皮肤放最后靠层叠覆盖）
npx marp <file.md> --theme-set themes/academic/academic_template.css themes/academic/academic_CUST.css \
  --html --allow-local-files -o <output.html>

# 导出 PPTX
npx marp <file.md> --theme-set themes/academic/academic_template.css themes/academic/academic_CUST.css \
  --html --pptx-editable -o <output.pptx>
```
