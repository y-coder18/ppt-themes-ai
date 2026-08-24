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

## Markdown 通用语法 · 标准组件

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
_class: chapterPage
-->

## Markdown 标准语法

### 标题 · 文本 · 表格 · 列表 · 引用 · 代码 · 公式 · 链接

---

<!-- _header: Markdown 标准语法 — 标题与文本样式 -->

<grid cols="2">

<flex column>

# 一级标题

正文段落文本，用于描述内容排版。

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

</flex>

<flex column>

```markdown
# 一级标题

正文段落文本，用于描述内容排版。

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题
```

</flex>

</grid>

---

<!--
_class: text-center
_header: Markdown 标准语法 — 行内文本样式
-->

# 行内文本样式

**粗体文本 Bold** — `**text**` 双星号

*斜体文本 Italic* — `*text*` 单星号

**_粗斜体 Bold Italic_** — `***text***` 三星号

~~删除线 Strikethrough~~ — `~~text~~` 双波浪

`行内代码 Inline Code` — `` `code` `` 反引号

---

<!-- _header: GFM 扩展语法 — 表格 -->

# 表格

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容 A | 内容 B | 100 |
| 长文本 | 居中 | 999 |

用 `|` 分隔列，`:---` 控制左对齐、`:---:` 居中、`---:` 右对齐。

```markdown
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容 A | 内容 B | 100 |
| 长文本 | 居中 | 999 |
```

---

<!-- _header: Markdown 标准语法 — 列表系统 -->

<flex>

<flex column>

### 有序列表
1. 完成项目第一阶段目标
2. 梳理核心流程方案

### 无序列表
- 需求调研与收集
- 方案设计与评审

### 嵌套列表
- 第一层级
  1. 第二层级有序
  2. 继续第二层级
    - 第三层级无序
    - 又一个第三层级
- 回到第一层级

</flex>

<flex column>

```markdown
### 有序列表
1. 完成项目第一阶段目标
2. 梳理核心流程方案

### 无序列表
- 需求调研与收集
- 方案设计与评审

### 嵌套列表
- 第一层级
  1. 第二层级有序
  2. 继续第二层级
    - 第三层级无序
    - 又一个第三层级
- 回到第一层级
```

</flex>

</flex>

---

<!-- _header: Markdown 标准语法 — 引用块 -->

# 引用块效果

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
>>>> **四层引用（深层嵌套）**：纯透明底，仅靠缩进和字号区分。极少使用，仅在需要展示多级引用关系时作为兜底。

---

<!-- _header: Markdown 标准语法 — 引用块 -->

# 引用块源码

```markdown

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
>>>> **四层引用（深层嵌套）**：纯透明底，仅靠缩进和字号区分。极少使用，仅在需要展示多级引用关系时作为兜底。

```

---

<!-- _header: Markdown 标准语法 — 行内代码 -->

# 行内代码

> 用 `` ` `` 反引号包裹，嵌入正文中，适合短小的代码片段。

**渲染效果：**

使用 `std::vector<int> nums = {1, 2, 3};` 初始化一个整数向量。

**Markdown 源码：**

```markdown
使用 `std::vector<int> nums = {1, 2, 3};` 初始化向量。
```

---

<!-- _header: Markdown 标准语法 — 块级代码 -->

# 块级代码

> 用 ` ``` ` 围栏包裹，可指定语言标识实现语法高亮。

<grid cols="2">

<flex column>

**渲染效果：**

```cpp
int sum(int n) {
    int s = 0;
    for (int i = 1; i <= n; ++i) s += i;
    return s;
}
```

</flex>

<flex column>

**Markdown 源码：**

```markdown
​```cpp
int sum(int n) {
    int s = 0;
    for (int i = 1; i <= n; ++i) s += i;
    return s;
}
​```
```

</flex>

</grid>

---

<!-- _header: KaTeX / Marp 扩展 — 数学公式 -->

# 数学公式 LaTeX

**行内公式（Inline Math）：**

质能方程 $E = mc^2$ 由爱因斯坦提出；

```latex
$E = mc^2$
```

**块级公式（Block Math / Display Math）：**

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}}
       \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

```latex
$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}}
       \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$
```


---

<!-- _header: Markdown 标准语法 — 链接与图片 -->

# 超链接

- 外部链接：[Marp 官方文档](https://marp.app/)
- 带标题的链接：[GitHub](https://github.com "点击访问 GitHub")

```markdown
- 外部链接：[Marp 官方文档](https://marp.app/)
- 带标题的链接：[GitHub](https://github.com "点击访问 GitHub")
```

# 图片

![h:120px](https://placehold.co/600x200/2563eb/white?text=Image+Placeholder)

```markdown
![h:120px](https://placehold.co/600x200/2563eb/white?text=Image+Placeholder)
```

---

<!-- _header: Markdown 补充 — 内嵌 HTML 与特殊字符转义 -->

## HTML 标签（Markdown 内嵌 HTML）

> HTML 标签本身不是 Markdown 语法，但 Markdown 规范允许内嵌 HTML。

Markdown 允许在文档中直接书写 HTML 标签，以下为常用内联元素：

<sup>上标</sup>文本 与 文本<sub>下标</sub> — `<sup>上标</sup>` / `<sub>下标</sub>`

## 特殊字符转义

通过反斜杠来对特殊字符进行转义

- \*星号不会被解析为斜体\* —— `\*星号不会被解析为斜体\*`
- \# 井号不会被解析为标题 —— `\# 井号不会被解析为标题`
- \> 大于号不会被解析为引用 —— `\> 大于号不会被解析为引用`
- \\ 反斜杠本身也需要转义 —— `\\ 反斜杠本身也需要转义`
