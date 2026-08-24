---
name: ppt-generator
description: 在 Marp-PPT 项目中生成演示文稿。当用户要求创建 PPT、幻灯片、演示文稿时使用此 skill。负责按照项目规范编写 Marp Markdown 源文件，使用 Academic 主题和自定义组件。
---

# PPT 生成器

此 skill 用于在本项目中生成 Marp 演示文稿，提供项目约定和最佳实践参考。

## 约定与规范

### Marp 指令格式（非常重要！）

Marp 的页面指令（`_class`、`_header`、`_paginate` 等）**必须写在 HTML 注释 `<!-- -->` 中**，不能裸写在 `---` 分隔符之间。裸写的指令不会被 Marp 正确解析。

**正确格式：**

```markdown
---
marp: true
theme: academic
paginate: false
---

<!--
_paginate: false
_class: homePage
-->

![h:120px](../../themes/academic/images/logo.svg)

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

**错误格式（指令不会生效）：**

```markdown
---

_class: homePage
_header: 页眉文字

---

# 标题
```

另外，封面页（`homePage`）需要包含 logo 图片：

```markdown
![h:120px](../../themes/academic/images/logo.svg)
```

### 页面类型一览

| `_class` | 用途 | 说明 |
|---|---|---|
| `homePage` | 封面 | 全屏图片背景 + 蓝色渐变遮罩，h1 通栏标题栏 |
| `contents` | 目录页 | 深蓝背景 + 左侧图片面板，列表项用 `**01**` 格式的数字 |
| `chapterPage` | 章节标题页 | 左侧纯色深蓝面板（编号水印 + logo）+ 右侧白底标题区 |
| `contentPage` | 内容页 | 白底 + 页眉，最常用的工作页面 |
| `thanksPage` | 感谢页 | 深蓝背景 + 图片，居中致谢文字 |

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

### 关于 `<br>` 标签

项目中的组件间距由 CSS 主题内置提供，不需要使用 `<br>` 标签来制造间距。Markdown 原生的空行已经足够分隔不同块级元素。

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

## 构建命令

```bash
# 实时预览
npm run dev

# 导出 HTML
npx marp <file.md> --theme-set themes/academic/index.css --html --allow-local-files -o <output.html>

# 导出 PPTX
npx marp <file.md> --theme-set themes/academic/index.css --html --pptx-editable -o <output.pptx>
```
