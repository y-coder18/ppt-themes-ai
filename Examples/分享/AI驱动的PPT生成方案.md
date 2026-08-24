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

# 基于 Marp 的智能演示文稿工作流

## AI 驱动的 PPT 生成方案

2026 年 8 月

---

<!--
_class: contents
-->

## 目录

- **01** 为什么需要新方案？
- **02** Marp 是什么？
- **03** 本项目做了什么？
- **04** 组件生态一览
- **05** AI 辅助工作流
- **06** 快速上手

---

<!--
_header: 为什么需要新方案？
_class: contentPage
-->

## 传统 PPT 的四大痛点

<flex>

<card red>

### 格式调整耗时

大量时间花在调字体、对齐、配色上，而非内容的深度思考。

</card>

<card red>

### 版本管理困难

`汇报方案v1.pptx` → `汇报方案v2.pptx` → `汇报方案最终版.pptx`，难以追溯变更历史。

</card>

</flex>

<flex>

<card red>

### 内容复用性差

不同 PPT 之间复制粘贴样式和内容，格式常常错乱，重复劳动多。

</card>

<card red>

### 多人协作冲突

二进制文件无法 diff，合并冲突时只能人工逐页比对，效率极低。

</card>

</flex>

<summary bold>

你是否也经历过：调格式调到凌晨，却还没开始打磨内容？

</summary>

---

<!--
_header: Marp 是什么？
_class: contentPage
-->

## Marp：用 Markdown 写 PPT

<flex>

<card>

### 核心原理

**Markdown** 是程序员最熟悉的纯文本标记语言。Marp 将其扩展为演示文稿引擎：

- 用 `#` 写标题，`-` 写列表，` ``` ` 写代码
- 用 `---` 分隔幻灯片
- 自动应用主题样式，**内容和样式完全分离**

> 你只负责写内容，Marp 负责把它变好看。

</card>

<card>

### 一段 Markdown → 一张幻灯片

```markdown
# 这是标题
## 这是副标题
- 要点一
- 要点二
> 引用或备注
```

> 这段文本会被自动渲染为一张排版好的PPT。

</card>

</flex>

<summary bold>

<tag>核心思想</tag> 用写代码的方式写 PPT —— 纯文本、可版本控制、可复用、可自动化

</summary>

---

<!--
_header: Marp 的核心优势
_class: contentPage
-->

<grid cols="3">

<metric>

#### 纯文本

Markdown 格式存储

<tag>Git 友好</tag>

</metric>

<metric>

#### 版本控制

每次修改可 diff

<tag>可追溯</tag>

</metric>

<metric>

#### 多格式输出

HTML / PPTX / PDF

<tag>一键导出</tag>

</metric>

</grid>


<compare>

<before>

### 传统 PPT 流程

<timeline >

- 打开 PowerPoint / WPS
- 选择模板、调整母版
- 逐页添加文本框、图片
- 手动调整字体、颜色、对齐
- 导出 PDF 或分享 `.pptx`

</timeline>

</before>

<arrow>VS</arrow>

<after>

### Marp PPT 流程

<timeline>

1. 打开编辑器，创建 `.md` 文件
2. 声明主题，开始写 Markdown
3. 一条命令生成 HTML / PPTX / PDF
4. 提交 Git，完成版本管理

</timeline>

</after>

</compare>

---

<!--
_header: 传统方式 vs Marp 方式
_class: contentPage
-->

<compare>

<before>

##### 传统方式

- 手动拖拽排版
- 二进制文件 `.pptx`
- 样式散落在各处
- 复用靠复制粘贴
- 协作靠口头沟通

</before>

<arrow>VS</arrow>

<after>

##### Marp 方式

- 纯文本编写
- 文本文件 `.md`
- 主题统一定义
- 复用靠组件调用
- 协作靠 Git 工作流

</after>

</compare>

<summary bold>

<tag>关键转变</tag> 从「画」PPT 到「写」PPT

</summary>

<compare>

<before>

##### 设计师思维

关注像素、颜色、位置……在「怎么做」上消耗大量精力。

</before>

<arrow>VS</arrow>

<after>

##### 工程师思维

关注结构、逻辑、内容……把样式交给主题，专注于「说什么」。

</after>

</compare>

---

<!--
_header: 本项目做了什么？
_class: contentPage
-->

## 本项目：在 Marp 基础上构建的三层能力

<flex>

<outline solid>

### 第一层：Academic 主题

统一的专业视觉风格——配色、字体、页眉页脚、封面/目录/致谢页面模板。

- 深蓝色调 (`#003f88`)，适配中文
- 4 种页面布局
- 代码块浅色/深色双主题

</outline>

<outline solid>

### 第二层：组件库

12+ 个语义化 HTML 组件，像搭积木一样组合出丰富的幻灯片布局。

`<card>` `<grid>` `<flex>` `<timeline>` `<tree>` `<metric>` `<compare>` `<outline>` `<tag>` `<summary>` `<mark>`

</outline>

</flex>

<card green>

### 第三层：AI 工作流

把 AI 大模型接入写作流程——描述需求 → AI 生成 Markdown → Marp 渲染 → 多格式输出。**你描述想法，AI 帮你实现。**

</card>

<summary bold>

从「写 Markdown」到「描述想法」，让 PPT 制作效率再提升一个量级

</summary>

---

<!--
_header: Academic 主题
_class: contentPage
-->

## Academic 主题一览

<flex>

<card>

### 4 种页面布局

- **封面 `homePage`** — 全幅背景图 + 居中标题
- **目录 `contents`** — 深蓝底 + 编号目录
- **内容 `contentPage`** — 白色背景 + 页眉栏
- **致谢 `thanksPage`** — 深蓝底 + 感谢语

> 每页可带页眉、页脚、页码，无需手动设置。

</card>

<card>

### 设计规范内置

<dlist>

- 配色

  主色 `#003f88`，辅助绿/红/黄/灰

- 字体

  Microsoft YaHei，正文 24px

- 标题

  蓝色竖线装饰
  
- 表格

  蓝色表头 + 交替行色
  
- 代码

  GitHub 浅色 + Catppuccin 深色双主题

</dlist>

</card>

</flex>

<summary bold>

你看到的这个 PPT 本身就是 Academic 主题的现场演示

</summary>

---

<!--
_header: 组件生态 — grid 网格布局
_class: contentPage
-->

## grid 网格布局

通过 `cols` / `rows` 属性定义行列数，子元素自动等分排列。

<grid cols="3">

<metric>

#### 3 列

<tag>cols="3"</tag>

</metric>

<metric>

#### 等宽

<tag>自动</tag>

</metric>

<metric>

#### 对齐

<tag>一致</tag>

</metric>

</grid>


<grid cols="4">

<metric>

#### 一

<tag>cols="4"</tag>

</metric>

<metric>

#### 行

<tag>四列</tag>

</metric>

<metric>

#### 自动

<tag>等分</tag>

</metric>

<metric>

#### 排列

<tag>整齐</tag>

</metric>

</grid>

<summary bold white>

`<grid>` 支持 `cols="2|3|4"` 和 `rows="2|3|4"`，嵌套在卡片中效果更佳

</summary>

---

<!--
_header: 组件生态 — flex 弹性布局
_class: contentPage 
-->

默认水平排列，加 `column` 属性变为垂直。子元素自动等宽拉伸。

<flex>

<card>

#### 左侧卡片

flex 默认水平排列，两张卡片等宽

</card>

<card green>

#### 右侧卡片

图片和 tree/timeline 组件自动不拉伸

</card>

</flex>


<flex column>

<card>

#### 加上 `column` 属性

变为垂直排列

</card>

<card>

#### 垂直堆叠

适合逐行展示内容

</card>

</flex>

<summary bold white>

`<flex>` 和 `<grid>` 可以嵌套使用，构建任意复杂布局

</summary>

---

<!--
_header: 组件生态 — card 卡片
_class: contentPage
-->

## card 卡片

最常用的内容容器。蓝色左边框，标题自动带底色横条。支持颜色变体。

<flex>

<card>

### 默认蓝色卡片

适合常规内容分组展示。

- 标题自动带浅蓝底色
- 左边框为蓝色强调线
- 支持嵌套表格、代码块

</card>

<card green>

### 绿色卡片 `green`

正面信息、成功案例、优势展示。

<tag green>推荐</tag>

</card>

</flex>

<card red>

### 红色卡片 `red`

警示信息、痛点问题、风险提示。也支持 `` 紧凑模式缩小内边距。

</card>

---

<!--
_header: 组件生态 — outline 提纲框
_class: contentPage
-->

## outline 提纲框

虚线边框容器，标题显示为蓝色药丸标签。适合展示方法论、步骤列表。

<outline>

### 默认虚线样式 (default)

适合展示方法论、步骤列表等结构化内容。标题自动渲染为蓝色药丸标签。

</outline>


<outline solid>

### solid 实线变体

实线边框 + 全宽蓝色标题栏，适合更正式的信息展示。

</outline>

<summary bold>

`<outline>` 还支持 `` 紧凑模式，适合空间有限的场景

</summary>

---

<!--
_header: 组件生态 — metric 指标卡
_class: contentPage
-->

## metric 指标卡

展示 KPI 数字 + 说明文字 + 状态标签。支持多种颜色变体。

<flex>

<metric>

#### 12+

自定义组件

<tag>丰富</tag>

</metric>

<metric green>

#### 2 套

已有完整 PPT

<tag>落地验证</tag>

</metric>

<metric yellow>

#### 4 种

页面布局类型

<tag>专业</tag>

</metric>

<metric red>

#### 10x

效率提升

<tag>显著</tag>

</metric>

</flex>

<summary bold>

`<metric>` 支持 `green` / `red` / `yellow` 颜色变体和 `` 紧凑模式

</summary>

---

<!--
_header: 组件生态 — 内联组件
_class: contentPage
-->

## tag 行内标签

<flex>
<tag>默认蓝</tag>
<tag green>已完成</tag>
<tag red>重要</tag>
<tag yellow>进行中</tag>
<tag gray>已废弃</tag>
</flex>

五种颜色，适合标记状态、分类、优先级。


## mark 高亮文字

在段落中 <mark>高亮强调</mark> 某个关键词或结论。支持 `center` 属性居中显示：

<mark center>这是一条居中显示的高亮文字</mark>

---

<!--
_header: 组件生态 — summary 横幅
_class: contentPage
-->

## summary 全宽横幅

全宽渐变蓝色背景 + 金色文字，适合放在页面底部作为小结或关键信息。

<summary>
默认样式：渐变蓝底 + 金色文字
</summary>


<summary bold>
bold 属性：文字加粗，更加醒目
</summary>


<summary bold white>
white 属性：白色文字，对比更强烈
</summary>


<summary left>
left 属性：内容左对齐（默认居中）
</summary>

---

<!--
_header: 组件生态 — timeline 时间线
_class: contentPage 
-->

使用纯 Markdown 列表语法，自动渲染为带节点的垂直时间线。

<timeline>

- 需求分析

  > 第一阶段

  - 明确 PPT 主题与受众
  - 收集素材与数据

- Markdown 编写

  > 第二阶段

  - 编写幻灯片结构
  - 嵌入组件与代码块

- 构建输出

  > 第三阶段

  - 生成 HTML / PPTX
  - 发布与分享

</timeline>

---

<!--
_header: 组件生态 — compare 前后对比
_class: contentPage
-->

## compare 前后对比

并排展示「之前 vs 之后」，中间的 `<arrow>` 自动渲染为蓝色药丸标签。

<compare>

<before>

##### 传统开发

- 手动编写测试
- 编码格式冲突
- 无自动化保障
- 回归全靠人工

</before>

<arrow>升级</arrow>

<after>

##### 本方案

- CI/CD 自动测试
- 统一编码规范
- 全量回归验证
- 58 个测试案例落地

</after>

</compare>

<summary white bold>

`<compare>` 由 `<before>` / `<arrow>` / `<after>` 三部分组成，适合展示改进成果

</summary>

---

<!--
_header: 组件生态 — tree 树形结构
_class: contentPage
-->

## tree 树形结构

使用嵌套列表语法，自动渲染为带连线层级的树形图。

<tree>

- Marp PPT 项目
  - 主题层
    - Academic 主题 CSS
    - 页面布局样式
    - 代码高亮配色
  - 组件层
    - 布局组件：grid / flex
    - 内容组件：card / outline / metric
    - 流程组件：timeline / compare / tree
    - 内联组件：tag / summary / mark
  - 工具层
    - AI 辅助生成
    - 构建脚本
    - 一键多格式输出

</tree>

---

<!--
_header: 代码块 — 浅色主题
_class: contentPage
-->

## 代码块：浅色主题（默认）

GitHub 风格，适合浅色背景的内容页。

```javascript
// 异步加载并渲染 PPT
async function buildPPT(config) {
  const { theme, slides, output } = config;
  // 应用 Academic 主题
  const engine = new MarpEngine({
    themeSet: 'themes/academic/index.css',
    html: true
  });
  // 渲染所有幻灯片
  const result = await engine.render(slides);
  return result.write(output);
}
```

> Marp 内置语法高亮，支持 JavaScript、Python、TypeScript、C++ 等主流语言

---

<!--
_header: 代码块 — 深色主题
_class: contentPage code-dark
-->

## 代码块：深色主题 (code-dark)

Catppuccin Mocha 风格，适合深色背景或需要强对比的场景。只需添加 `<!-- _class: code-dark -->` 即可切换。

```python
# AI 辅助生成 PPT 内容
class PPTGenerator:
    """基于 LLM 的 PPT Markdown 生成器"""

    def generate(self, topic: str, style: str = "academic") -> str:
        prompt = self.build_prompt(topic, style)
        markdown_content = self.llm.complete(prompt)
        return self.validate_and_format(markdown_content)

    def build_prompt(self, topic: str, style: str) -> str:
        return f"生成一份关于 {topic} 的 PPT，使用 {style} 风格"
```

> 同一份 Markdown 可以在**不同幻灯片**使用**不同代码主题**

---

<!--
_header: AI 辅助工作流
_class: contentPage
-->

## AI 辅助工作流：四步完成 PPT

<flow now="2">

1. 描述需求

   > 你只需要做这一步

   - 用自然语言告诉 AI：主题、受众、风格、篇幅
   - 例如：「帮我写一份项目季度汇报，面向管理层，15 页」

2. AI 生成 PPT

   > 自动化完成

   - AI 根据需求生成结构化 Markdown
   - 自动使用组件（card / grid / metric 等）
   - 自动组织幻灯片逻辑结构

3. Marp 渲染

   > 一条命令

   - 运行 npx marp 命令
   - 自动应用 Academic 主题


</flow>

---

<!--
_header: AI 辅助 — 效率对比
_class: contentPage
-->

## 效率对比：传统方式 vs AI + Marp

<compare>

<before>

##### 传统方式

> 从头开始做一份 20 页 PPT

- 找模板：30 分钟
- 排版调整：2 小时
- 内容编写：3 小时
- 格式统一：1 小时

<summary>总计：约 6-7 小时</summary>

</before>

<arrow>转变为</arrow>

<after>

##### AI + Marp 方式

> 描述需求 + AI 生成 + 微调

- 描述需求：10 分钟
- AI 生成：2 分钟
- 人工微调：30 分钟

<br>

<summary>总计：约 40 分钟</summary>

</after>

</compare>

<summary bold white>

效率提升约 **10 倍**，把时间从调格式中解放出来，投入到内容质量上

</summary>

---

<!--
_header: 多格式输出
_class: contentPage
-->

## 一键输出多种格式

<grid cols="3">

<metric>

#### HTML

网页格式

<tag>在线浏览</tag>

</metric>

<metric green>

#### PPTX

可编辑演示文稿

<tag>Office/WPS</tag>

</metric>

<metric yellow>

#### PDF

静态文档

<tag>打印分发</tag>

</metric>

</grid>

<datatable>

#### 只需一条命令，即可生成对应格式

| 命令 | 用途 |
|------|------|
| `npm run dev` | 实时预览 |
| `npm run build:html` | 导出 HTML |
| `npm run build:pptx` | 导出可编辑的 PPTX |
| `npm run build:all` | 同时导出 HTML + PPTX |

</datatable>

---

<!--
_header: 输出格式对比
_class: contentPage
-->

## HTML vs PPTX：两种输出格式对比

<flex>

<card>

### HTML 输出特点

- 保留所有动画与交互效果
- 零依赖部署，单个文件即可
- 响应式自适应各种屏幕尺寸
- 分享链接即可在线浏览
- 适合部署到内部 Wiki 或 Pages 服务

</card>

<card green>

### PPTX 输出特点

- **文本可编辑**（非截图！）
- 保留表格结构与样式
- 兼容 PowerPoint 与 WPS
- 可进一步手动微调排版
- 适合需要离线编辑的场景

</card>

</flex>

<summary bold>

<tag>按场景选择</tag> 线上分享用 `HTML`，线下编辑用 `PPTX`，存档分发用 `PDF`

</summary>

---

<!--
_header: 实际案例
_class: contentPage
-->

## 实际案例：已有两套完整 PPT

<flex>

<outline solid>

### 案例一：工作汇报

**ATK 软件模块开发与测试工作汇报**
- 25 张幻灯片
- 使用全部组件类型
- KPI 看板 + 对比展示 + 时间线规划
- 生成 HTML + PPTX 双格式

</outline>

<outline solid>

### 案例二：技术分享

**广义建模思想在航天软件中的应用**
- 40 张幻灯片
- 复杂的嵌套布局
- 树形 AST 结构展示
- 语言对比表格 + 标签系统

</outline>

</flex>

<summary bold>

<tag>2 套</tag> 完整 PPT 已落地验证，覆盖工作汇报与技术分享两大场景

</summary>

---

<!--
_header: 快速上手 — 步骤 1-2
_class: contentPage
-->

## 快速上手：创建与预览

<flex>

<card>

### 第一步：创建 Markdown 文件

```text
---
marp: true
theme: academic
paginate: true
---
# 我的第一页 PPT
- 要点一
- 要点二
---
## 第二页标题
继续写内容...
```

</card>

<card>

### 第二步：预览效果

```bash
npx @marp-team/marp-cli my-slides.md \
  --theme-set themes/academic/index.css \
  --html --preview
```

浏览器自动打开，实时预览渲染效果。修改 Markdown 保存后，页面自动刷新。

<dlist>

- --theme-set

  指定自定义主题 CSS 文件路径

- --html

  启用 HTML 标签渲染能力

- --preview

  本地预览服务器，文件变更热更新

</dlist>

</card>

</flex>

---

<!--
_header: 快速上手 — 步骤 3 + AI
_class: contentPage
-->

## 快速上手：导出与 AI 辅助

<flex>

<card>

### 第三步：导出成品

```bash
# 导出 HTML
npx marp my-slides.md \
  --theme-set themes/academic/index.css \
  --html -o output.html

# 导出 PPTX
npx marp my-slides.md \
  --theme-set themes/academic/index.css \
  --html --pptx-editable -o output.pptx
```

</card>

<card green>

### 还可以用 AI 写初稿

```text
帮我写一份技术分享 PPT，
主题是「Marp + AI 打造高效的 PPT 工作流」，
面向从未接触过 Marp 的工程师，
15 页左右，专业风格。
```

把 AI 生成的 Markdown 保存为 `.md` 文件，就能直接预览！

- 可先让 AI 生成**大纲**，确认结构后再展开每页内容
- 配合本项目 Skill，AI 自动识别组件语法和主题

</card>

</flex>

<summary bold>

<tag>不必从零开始</tag> AI 帮你完成 80% 的初稿工作，你只需聚焦内容的打磨与优化

</summary>

---

<!--
_header: 核心理念回顾
_class: contentPage
-->

## 核心理念回顾

<grid cols="2">

<card green>

### 写，而非画

把精力从「怎么做」转移到「说什么」——用 Markdown 表达思想，让主题负责呈现。

</card>

<outline solid>

### 组件化思维

像搭积木一样组合组件，而不是每次都从空白页开始。组件是可复用的、可组合的。

</outline>

<card>

### Git 原生的版本管理

每一次修改都是一次 commit，每一次发布都是一个 tag。告别「最终版」「最终版2」「真的最终版」。

</card>

<outline solid>

### AI 加持的效率革命

AI 理解需求 → 生成结构化文本 → 自动应用主题 → 多格式输出。你只负责思考和把关。

</outline>

</grid>

---

<!--
_header: 适用场景
_class: contentPage
-->

## 适用场景

<flex>

<card>

### 技术团队

<checklist>

- 工作汇报 / 周报
- 技术方案评审
- 项目复盘总结
- 架构设计文档
- 技术分享 / 演讲

</checklist>

</card>

<card green>

### 个人效率

<checklist>

- 会议材料准备
- 课程讲义制作
- 技术博客转 PPT
- 开源项目介绍
- 面试作品展示

</checklist>

</card>

</flex>


<outline solid>

### 一句话总结

如果你会写 Markdown，你就能用这个项目做出专业级的 PPT。<br>如果再加上 AI，你只需要**描述想法**，就能得到一份排版精美的演示文稿。

</outline>

---

<!--
_paginate: false
_class: thanksPage
-->

![h:80px](../../themes/academic/images/logo.svg)

# 感谢聆听，欢迎交流

## 用 Markdown 写 PPT，让 AI 帮你加速

