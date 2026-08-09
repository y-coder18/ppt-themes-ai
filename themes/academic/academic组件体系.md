---
marp: true
theme: academic
paginate: false
---

<!--
_paginate: false
_class: homePage
-->

# Academic 主题组件体系

## 组件功能 · 变体展示

---

<!-- _header: Markdown 标准语法 — 标题与文本样式 -->

# 一级主标题 · PPT 大标题

正文段落文本，用于 PPT 主体描述，支持常规叙述内容排版，保证页面清爽不拥挤。

## 二级标题 · 章节标题

### 三级小标题 · 模块小标题

#### 四级小标题 · 子模块标题

##### 五级小标题（极少使用）

---

<!--
_class: text-center
_header: Markdown 标准语法 — 行内文本样式
-->

# 行内文本样式 · CommonMark 标准

**粗体文本 Bold** — `**text**` 双星号

*斜体文本 Italic* — `*text*` 单星号

**_粗斜体 Bold Italic_** — `***text***` 三星号

`行内代码 Inline Code` — `` `code` `` 反引号

---

<!-- _header: GFM 扩展语法 — 删除线、表格、任务列表 -->

**删除线：**

~~删除线 Strikethrough~~ — `~~text~~` 双波浪

**表格：**

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容 A | 内容 B | 100 |
| 长文本 | 居中 | 999 |

```markdown
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容 A | 内容 B | 100 |
| 长文本 | 居中 | 999 |
```

---

<!-- _header: Markdown 标准语法 — 列表系统 -->

# 列表系统

**有序列表：**
1. 完成项目第一阶段目标
2. 梳理核心流程方案
3. 落地试点验证工作

**无序列表：**
- 需求调研与收集
- 方案设计与评审
- 上线持续迭代优化

**嵌套列表：**
- 第一层级
  1. 第二层级有序
  2. 继续第二层级
    - 第三层级无序
    - 又一个第三层级
- 回到第一层级

---

<!-- _header: Markdown 标准语法 — 引用块 -->

> **一层引用（核心引述）**：适合放置观点、总结摘要、客户语录、核心结论。悬浮卡片样式，大圆角 + 淡蓝底，是整页的视觉重心。
>
> 引用内支持 **加粗**、*斜体*、<u>下划线</u>、~~删除线~~，以及 `行内代码`，保留完整 Markdown 格式。
>
>> **二层引用（论证展开）**：白底卡片 + 细边框，用于补充论据、数据支撑或反面观点，与一层形成"框中框"的嵌套关系。
>>
>> 适合在核心观点之下展开具体论证，让信息层次一目了然。
>>
>>> **三层引用（细节补充）**：淡色底 + 斜体，视觉退居第三位。适合放置引用来源、脚注说明、次要备注等辅助信息。
>>>
>>> 三层及以上的内容不再抢占视觉注意力，读者可选择性阅读。
>>>
>>>> **四层引用（深层嵌套）**：纯透明底，仅靠缩进和字号区分。极少使用，仅在需要展示多级引用关系时作为兜底。

---

<!-- _header: Markdown 标准语法 — 代码展示 -->

# 行内代码

使用 `const App = () => {}` 定义 React 组件。

# 代码块

```python
def fibonacci(n: int) -> int:
    """计算第 n 个斐波那契数"""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b
```

```javascript
const greeting = (name) => {
  console.log(`Hello, ${name}!`);
};
```

---

<!-- _header: KaTeX / Marp 扩展 — 数学公式 -->

# 数学公式 LaTeX

> 数学公式并非标准 Markdown 语法，而是 Marp 内置的 **KaTeX** 渲染支持。

**行内公式（Inline Math）：**

质能方程 $E = mc^2$ 由爱因斯坦提出；圆的面积公式为 $A = \pi r^2$。

**块级公式（Block Math / Display Math）：**

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}}
       \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

$$
R_{\mathrm{Sun}} = \|\boldsymbol{s}\|
$$

$$
E_{\mathrm{Local}}
= \arcsin\left(-\frac{s_{z,\mathrm{LH}}}{R_{\mathrm{Sun}}}\right)
$$

---

<!-- _header: Markdown 标准语法 — 链接、图片与分割线 -->

# 链接与图片

**超链接：**
- 外部链接：[Marp 官方文档](https://marp.app/)
- 带标题的链接：[GitHub](https://github.com "点击访问 GitHub")

**图片：**

![图片占位](https://placehold.co/600x200/2563eb/white?text=Image+Placeholder)

**分割线 Horizontal Rule：**

内容区域上方

---

内容区域下方

---

<!-- _header: Markdown 补充 — 脚注（部分平台支持）与转义 -->

# HTML 标签（Markdown 内嵌 HTML）

Markdown 允许在文档中直接书写 HTML 标签，以下为常用内联元素：

<mark>高亮文本 &lt;mark&gt;</mark> — 重点信息突出（Academic 主题组件）

<sup>上标</sup> 与 <sub>下标</sub> — `&lt;sup&gt;` / `&lt;sub&gt;`

<kbd>Ctrl</kbd> + <kbd>C</kbd> — 键盘按键 `&lt;kbd&gt;`

> `<mark>` 是你自定义的 Academic 主题组件，实际基于 CSS 样式实现。
> HTML 标签本身不是 Markdown 语法，但 Markdown 规范允许内嵌 HTML。

# 脚注 Footnotes

Marp 是基于 Markdown 的演示文稿工具[^1]，支持将 Markdown 文件转换为 PPT 和 HTML[^2]。

[^1]: Marp 是一个开源的 Markdown 演示文稿生态系统。
[^2]: 支持导出为 PDF、PPTX、HTML 等多种格式。

> 脚注 `[^id]` 并非标准 CommonMark 语法，部分 Markdown 渲染器支持，Marp 中可用。

# 特殊字符转义

\*星号不会被解析为斜体\*

\# 井号不会被解析为标题

\` 反引号不会被解析为代码

\> 大于号不会被解析为引用

\\ 反斜杠本身也需要转义

> 转义符 `\` 是标准 Markdown 语法。

---

<!-- _header: 逻辑流程图 -->

## 横向线性流程（阶段推进）

<flow now="2">

1. 阶段1：需求调研
2. 阶段2：方案设计
3. 阶段3：开发实施
4. 阶段4：上线验收

</flow>

---

<!-- _header: 逻辑流程图 -->

## 竖向线性流程（步骤递进）

<flow vertical now="3">

- 目标制定
- 计划拆解
- 执行落地
- 复盘优化

</flow>

---

<!-- _header: 对比组件 — compare 前后对比 -->

## compare 前后对比

并排展示「之前 vs 之后」，`<before>` 红色系、`<after>` 蓝色系，中间 `<arrow>` 纯文字衔接。

<compare>

<before>

##### 传统方式

- 手动处理日常任务
- 工作流程不统一
- 缺乏自动化支持
- 依赖人工复查核对

</before>

<arrow>VS</arrow>

<after>

##### 新方案

- 自动化流程保障
- 统一规范模板落地
- 全量检查自动执行
- N+ 个场景覆盖

</after>

</compare>

---

<!-- _header: 对比组件 — compare 数值对比 -->

## compare 数值对比

同样适用于数值类前后对比，标题直接使用大号数字。

<compare center>

<before>

##### 100 个

基准年份

<summary>覆盖不足，风险较高</summary>

</before>

<arrow>+300</arrow>

<after>

##### 400 个

当前覆盖

<summary>体系趋于完善</summary>

</after>

</compare>
