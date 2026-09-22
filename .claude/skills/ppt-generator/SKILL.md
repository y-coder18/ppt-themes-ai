---
name: ppt-generator
description: 在 Marp-PPT 项目中生成演示文稿。当用户要求创建 PPT、幻灯片、演示文稿时使用此 skill。负责按照项目规范编写 Marp Markdown 源文件，使用 Academic 主题和自定义组件。
---

# PPT 生成器

此 skill 用于在本项目中生成 Marp 演示文稿，提供项目约定和最佳实践参考。

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

**线条封面（`homePageCUST`，长沙理工大学皮肤）示例：**

```markdown
<!--
_class: homePageCUST
-->

# 研究生工作月报

## 依托工程现场工作与桥梁损伤识别科研进展

<flex center>

<iconitem icon="话筒">汇报人：×××</iconitem>

<iconitem icon="人员">指导教师：××× 教授</iconitem>

</flex>
```

> `iconitem` 是基座里的**图标条目**原子组件：左边一个圆底图标，右边一段文字。**任何皮肤、任何页面（封面 / 内容页 / 章节页……）都能用**，不是线条封面专属。
> 它只管自己这一条怎么排，不管摆放——要横排几条、怎么对齐，外面套 `flex` / `grid` 即可；条目之间要用空行隔开。
> 位置由所在页面决定：线条封面 `homePageCUST` 里整行 `flex` 被绝对定位钉在底部，在基座 `homePage` 里就是紧跟在副标题后的一行。
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

### 慎用 compact 类

`_class: compact` 会缩小页面间距和组件间距，**只在页面内容确实放不下时才用**。大部分页面用默认间距即可，不要每页都加 `compact`。

典型需要 compact 的场景：
- timeline 有 6 个以上节点，且每个节点都有详细描述和 blockquote

不需要 compact 的场景：
- 普通卡片布局（grid + card）
- 3-4 个节点的 timeline
- 图文混排页面
- 表格页

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

## 构建命令

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
