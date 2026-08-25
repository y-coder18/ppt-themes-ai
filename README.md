# AI 驱动的 Marp PPT 工作流

一个让 **AI 帮你做 PPT** 的项目：你用自然语言描述需求，AI 遵循本项目规范生成 Marp Markdown 源文件，再统一渲染成专业排版的演示文稿。

> 核心理念：**写，而非画**。一份 PPT 的本质是纯文本的 `.md` 源文件——可预览、可修改、可 diff、可版本管理。AI 产出的是「你能掌控的源码」，而不是一个改不动、不可控的二进制成品。

---

## 这个项目解决什么问题？

传统 AI 做 PPT 的两大痛点，正是本项目的出发点：

| 痛点 | 本项目的解法 |
|---|---|
| **不可控** | AI 不直接输出「成品 pptx」，而是按照 `.claude/skills/ppt-generator/SKILL.md` 的规范写出 Marp Markdown 源码。每页用了什么布局、什么组件，打开源码一目了然；不满意就让 AI 改，改哪里、怎么改都清清楚楚。 |
| **不好修改** | 内容与样式完全分离：内容写在 `.md` 里，样式由 Academic 主题统一控制。改文字就是改 Markdown，换风格只动主题、不动内容。纯文本天然支持 Git diff，每一次修改都可追溯。 |

一句话：**AI 负责把想法写成「看得懂、改得动」的 Markdown，而不是甩给你一个没法改的 pptx。**

## 核心能力：三层架构

| 层 | 内容 | 说明 |
|---|---|---|
| 第一层：Academic 主题 | `themes/academic/index.css` | 统一的专业视觉风格：深蓝主色 `#003f88`、中文适配、封面/目录/章节/内容/致谢 5 种页面布局、页眉页脚页码、代码块双主题 |
| 第二层：组件库 | `themes/academic/index.css`（与主题同文件） | 15+ 个语义化 HTML 组件：`card` `grid` `flex` `timeline` `tree` `metric` `compare` `outline` `tag` `summary` `mark` `note` `checklist` `dlist` `flow` `datatable` 等，**全部样式定义在 CSS 中**，像搭积木一样组合出丰富的布局。各组件的用法与效果演示见 `themes/academic/academic组件体系.md`（该文件只是展示 PPT，组件本身由 CSS 提供） |
| 第三层：AI 工作流 | `.claude/skills/ppt-generator/SKILL.md` | 把 AI 接入写作流程：描述需求 → AI 按规范生成 Markdown → Marp 渲染 → 多格式输出。AI 自动使用组件和主题，产出即符合规范 |

配套能力：

- **多格式输出**：HTML（在线浏览）/ PPTX（可继续编辑）/ PDF
- **Git 原生版本管理**：Markdown 源码可 diff、可合并、可回滚

## 项目结构

```text
.
├── .claude/skills/ppt-generator/SKILL.md   # AI 生成 PPT 的规范（核心！）
├── themes/academic/                        # Academic 主题
│   ├── index.css                           # 全部样式：主题 + 组件库（所有组件样式都定义在这里）
│   ├── academic组件体系.md                 # 组件展示 PPT（仅演示组件效果，组件本身在 index.css 里）
│   ├── academic颜色体系.md                 # 配色体系文档
│   └── images/                             # 主题用到的图片素材
├── Examples/                               # 示例演示文稿
│   └── 分享/AI驱动的PPT生成方案.md          # 项目介绍 PPT
├── ppt/                                    # 你的 PPT 源文件（独立 git 仓库管理）
├── .vscode/settings.json                   # 已配置 Marp 插件自动加载主题
├── package.json                            # 已内置 marp-cli 与常用命令
├── CLAUDE.md                               # 项目记忆（给 AI 的排版约定）
└── .gitignore                              # 根仓库已忽略 ppt/ 与导出产物
```

---

## 快速开始

### 0. 环境要求

| 依赖 | 用途 | 必需？ |
|---|---|---|
| [Node.js](https://nodejs.org/) ≥ 12 | 运行 marp-cli | ✅ 必需 |
| [VS Code](https://code.visualstudio.com/) | 编辑与实时预览 | 推荐 |
| Chrome / Chromium | PPTX 渲染 | 导出 PPTX 时需要 |
| [LibreOffice Impress](https://www.libreoffice.org/) | 生成**可编辑** PPTX | 仅 `--pptx-editable` 时需要 |

### 1. 安装 Marp for VS Code 插件（可选，用于本地预览）

1. 安装 [Visual Studio Code](https://code.visualstudio.com/)
2. 在扩展市场搜索并安装 **Marp for VS Code**（`marp-team.marp-vscode`，[市场地址](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)）
3. 打开任意 `.md` 文件，点击编辑器右上角工具栏的 Marp 图标，选择 `Toggle Marp feature for current Markdown`
4. 打开 Markdown 预览，即可实时看到幻灯片效果；保存自动刷新

> 本仓库的 `.vscode/settings.json` 已把主题指向 `themes/academic/index.css` 并开启 HTML 渲染，克隆后开箱即用。

### 2. 安装 Marp CLI

本仓库已在 `package.json` 中内置 `@marp-team/marp-cli`，克隆后执行：

```bash
npm install
npx marp --version   # 验证安装
```

也可以全局安装（[Marp 官方安装文档](https://marp.app/docs/introduction/install)）：

```bash
# Node.js 全局安装（官方不推荐，但简单直接）
npm install -g @marp-team/marp-cli

# Windows 可用 Scoop
scoop install marp

# macOS 可用 Homebrew
brew install marp-cli
```

> 更多用法与参数见 [Marp 官网](https://marp.app/) 与 [marp-cli 仓库](https://github.com/marp-team/marp-cli)。

### 3. 预览与导出命令

```bash
# 实时预览（浏览器打开，改动热更新）
npx marp <你的PPT.md> --theme-set themes/academic/index.css --html --preview --allow-local-files

# 导出 HTML
npx marp <你的PPT.md> --theme-set themes/academic/index.css --html --allow-local-files -o <输出.html>

# 导出 PPTX（图片式，还原度高）
npx marp <你的PPT.md> --theme-set themes/academic/index.css --html -o <输出.pptx>

# 导出可编辑 PPTX（文字/图形可在 PowerPoint 中继续改，需要 LibreOffice）
npx marp <你的PPT.md> --theme-set themes/academic/index.css --html --pptx-editable -o <输出.pptx>
```

### 4. 生成可编辑的 PPTX（`--pptx-editable`）

常规 PPTX 是「渲染好的图片」，无法在 PowerPoint 里改文字。加上 `--pptx-editable` 后，导出的 PPTX 中文字、形状、图片都是**真实可编辑的元素**，可以继续用 PowerPoint / WPS / LibreOffice 修改：

```bash
marp PPT/成绩分析/初一1班英语期末成绩分析.md --theme themes/academic/index.css --html --preview --allow-local-files --pptx-editable
```

前提是机器上装好了 **Chrome（或 Chromium）** 和 **LibreOffice Impress**。

> 注意：`--pptx-editable` 是 Marp 的实验性特性，复杂样式可能降低还原度，且不支持演讲者备注。日常修改请在 `.md` 源码上进行（改完重新导出即可），不要把编辑 PPTX 当主流程。

---

## 用 AI 生成 PPT（核心用法）

本项目是 **AI 优先** 设计的——**安装好环境后，命令不需要你亲手跑，让 AI 自己跑**。你只需要描述需求，AI 负责写源码、跑预览、导出成品。

### 第 1 步：让 AI 加载 Skill

在 AI 会话中让 AI 读取本项目规范：

- **Claude Code**：会自动识别 `.claude/skills/ppt-generator/SKILL.md` 这个 Skill，直接说「帮我做一份 PPT」即可触发
- **其它 AI 工具（Cursor / Copilot 等）**：把 `.claude/skills/ppt-generator/SKILL.md` 的内容粘贴给 AI，或让 AI 阅读该文件

Skill 里包含全部约定：页面类型（封面/目录/章节/内容/致谢）、组件用法、指令必须写在 `<!-- -->` 注释中、图片路径空格要编码成 `%20`、不要滥用 `compact` 等——AI 照此规范产出的 Markdown，渲染出来就是符合主题的成品。

### 第 2 步：描述需求

```text
帮我写一份项目季度汇报 PPT，面向管理层，15 页左右，
主题是「xx 项目进展」，需要目录页和章节页，风格专业。
```

AI 会根据 Skill 规范生成结构化 Markdown（自动使用 `card` / `grid` / `metric` 等组件，自动组织逻辑结构）。

### 第 3 步：让 AI 预览、迭代、导出

**不需要你手动敲命令**——让 AI 在项目目录下自己执行：

```bash
# 预览
npx marp ppt/<你的PPT>.md --theme-set themes/academic/index.css --html --preview --allow-local-files

# 微调：直接让 AI 改 Markdown 源码，改完重新预览
# 导出成品
npx marp ppt/<你的PPT>.md --theme-set themes/academic/index.css --html --allow-local-files -o ppt/<你的PPT>.html
npx marp ppt/<你的PPT>.md --theme-set themes/academic/index.css --html -o ppt/<你的PPT>.pptx

# 需要可编辑 PPTX 时（需安装 LibreOffice）
npx marp ppt/<你的PPT>.md --theme-set themes/academic/index.css --html --pptx-editable -o ppt/<你的PPT>.pptx
```

整个流程里你要做的只有：**提需求 → 看效果 → 说修改意见**。AI 改的是源码，改完重新导出，永远可控、可回退。

---

## 推荐的仓库组织方式（重要）

**根仓库只放「模板工程」，你的 PPT 放独立的 `ppt/` 仓库**：

```text
根仓库（本仓库，版本管理主题与规范）
└── themes/ Examples/ .claude/ ...        # 主题、组件、Skill、示例

ppt/ 目录（另一个独立 git 仓库，如 git@xxx:me/my-ppt.git）
└── 你的各份 PPT 的 .md 源文件与配图
```

原因与配套配置：

- 根仓库的 `.gitignore` **已忽略 `ppt/` 目录**，两个仓库互不干扰
- `ppt/` 目录里自带 `.gitignore`，已忽略导出的 `*.pptx / *.pdf / *.html`（生成物由 `.md` 重新导出即可，不入库避免撑大仓库）
- **好处**：主题 / Skill 升级不影响你的 PPT 内容；每份 PPT 的修改历史独立、可 diff；二进制产物不进任何仓库

建议的落地步骤：

```bash
# 1. 在 ppt/ 下初始化独立仓库（首次）
cd ppt
git init
git remote add origin <你的仓库地址>
git add . && git commit -m "init" && git push -u origin main

# 2. 日常：AI 改完源码后，直接提交到 ppt 仓库即可追溯版本
```

---

## 参考演示文稿（建议先看这两个）

| 演示文稿 | 文件 | 内容 |
|---|---|---|
| **项目介绍 PPT** | `Examples/分享/AI驱动的PPT生成方案.md` | 讲清「为什么需要这个方案」：传统 PPT 的痛点、Marp 是什么、本项目三层能力、组件生态一览、AI 辅助工作流、快速上手 |
| **组件展示 PPT** | `themes/academic/academic组件体系.md` | 每个组件的现场演示：grid / flex / card / outline / metric / timeline / compare / tree / tag / summary 等的用法与效果（注意：组件本身定义在 `themes/academic/index.css` 中，这份 PPT 只是展示效果） |

查看方式（任选其一）：

```bash
# 方式一：命令行预览（浏览器打开）
npx marp Examples/分享/AI驱动的PPT生成方案.md --theme-set themes/academic/index.css --html --preview
npx marp themes/academic/academic组件体系.md --theme-set themes/academic/index.css --html --preview

# 方式二：用 VS Code 直接打开这两个 .md 文件，Marp 插件实时预览
```

## 相关文档与链接

- `CLAUDE.md` — 项目记忆：AI 的排版验证方式与项目结构速览
- `themes/academic/academic颜色体系.md` — 配色体系
- [Marp 官网](https://marp.app/) — 官方文档：安装、指令、主题、语法
- [Marp CLI](https://github.com/marp-team/marp-cli) — 命令行工具
- [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode) — VS Code 插件
