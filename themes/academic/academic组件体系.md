---
marp: true
theme: academic_template
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

---

<!-- _header: 主题特色组件 — mark 高亮 -->

<grid cols="2">

<flex column>

## 渲染效果

行内 <mark>高亮关键词</mark> 强调。

<mark>独立成段的高亮</mark>

<mark center>center：块级居中</mark>

<outline>

- mark 无背景色，仅用主题红加粗强调；
- 与 `**粗体**` 的区别是粗体随引用层级递进变色，mark 始终保持主题红。

</outline>

</flex>

<flex column>

## Markdown 源码

```markdown
行内 <mark>高亮关键词</mark> 强调。

<mark>独立成段的高亮</mark>
<mark center>center：块级居中</mark>
<outline>

### 组件内嵌套

<mark>外边距归零</mark>
</outline>
```

</flex>

</grid>

---

<!-- _header: 主题特色组件 — grid 网格 -->

<grid cols="2">

<flex column>

## 渲染效果

<grid cols="3" rows="2">

<card>1</card>

<card>2</card>

<card>3</card>

<card>4</card>

<card>5</card>

<card>6</card>

</grid>

## 紧凑布局

<grid cols="3" compact>

<card>1</card>

<card>2</card>

<card>3</card>

</grid>

<outline>

- grid 只负责「按行/列等分排布」，子元素样式由 `<card>` / `<metric>` / `<outline>` 等决定。

- `cols` / `rows` 设置数字，子元素将等分排列。

</outline>

</flex>

<flex column>

## Markdown 源码

```markdown
<grid cols="3" rows="2">
<card>1</card>
<card>2</card>
<card>3</card>
<card>4</card>
<card>5</card>
<card>6</card>
</grid>
```

```markdown
<grid cols="3" compact>
<card>1</card>
<card>2</card>
<card>3</card>
</grid>
```

</flex>

</grid>

---

<!-- _header: 主题特色组件 — flex 弹性 -->

<grid cols="2">

<flex column>

## 渲染效果

横向 flex 的子元素自动等分撑满，并且自动添加间距。

## 默认横向（一行内排布）

<flex>

<card>块 1</card>

<card>块 2</card>

</flex>

## column 纵向堆叠

<flex column>

<card>块 1</card>

<card>块 2</card>

<card>块 3</card>

</flex>

</flex>

<flex column>

## Markdown 源码

```markdown
<flex>
<card>块 1</card>
<card>块 2</card>
</flex>
```

```markdown
<flex column>
<card>块 1</card>
<card>块 2</card>
<card>块 3</card>
</flex>
```

<outline>

- 一行/列内排布，优先使用 `<flex>`。

- 多行多列（多维）使用 `<grid>`。

</outline>

</flex>

</grid>

---

<!-- _header: 主题特色组件 — datatable 数据表（全色系） -->

<grid cols="2" rows="2">

<datatable>

### 默认蓝色

| 参数 | 配置值 |
|------|--------|
| CPU | 4 核 2.8 GHz |
| 网络 | 千兆以太网 |

</datatable>

<datatable green>

### 绿色

| 指标 | 当前值 |
|------|--------|
| 磁盘 I/O | 正常 |
| 网络延迟 | 12ms |

</datatable>

<datatable red>

### 红色

| 告警项 | 状态 |
|--------|------|
| 连接池 | 耗尽 |
| 消息队列 | 积压 |

</datatable>

<datatable yellow>

### 黄色

| 指标 | 当前值 |
|------|--------|
| 磁盘使用率 | 82% |
| 内存使用率 | 78% |

</datatable>

</grid>

<datatable gray>

### 灰色 — 辅助参考数据

| 项目 | 数值 |
|------|------|
| 历史均值 | 45% |
| 同期对比 | +3.2% |

</datatable>

---

<!-- _header: 主题特色组件 — datatable 数据表（写法） -->

<flex>

<flex column>

## 渲染效果

<datatable red>

### 标题即标题栏

| 列 1 | 列 2 |
|------|------|
| 数据 | 内容 |
| 数据 | 内容 |
| 数据 | 内容 |
| 数据 | 内容 |

</datatable>

</flex>

<flex column>

## Markdown 源码

```markdown
<datatable red>

### 标题即标题栏

| 列 1 | 列 2 |
|------|------|
| 数据 | 内容 |

</datatable>
```

</flex>

</flex>

<outline>

- 颜色属性：`blue | green | red | yellow | gray`，默认 `blue`
- `compact` 可收紧标题栏与单元格。

</outline>

---

<!-- _header: 主题特色组件 — code 代码块（浅色 · 默认） -->

<grid cols="2">

<flex column>

## 渲染效果

```python
import math

def circle_area(r: float) -> float:
    """计算圆的面积"""
    # 注释 · 关键字 · 字符串 · 数字
    return math.pi * r ** 2

print(circle_area(2.0))  # 12.57
```

</flex>

<flex column>

## Markdown 源码

````markdown
```python
import math

def circle_area(r: float) -> float:
    """计算圆的面积"""
    # 注释 · 关键字 · 字符串 · 数字
    return math.pi * r ** 2

print(circle_area(2.0))  # 12.57
```
````

</flex>

</grid>

- 浅色风格是默认主题，语言标记（python / js / cpp …）触发 highlight.js 语法高亮。
- 颜色语义：关键字红、字符串蓝、函数紫、数字蓝、注释灰；内联代码与 diff 增删行同用这套变量。

---

<!--
_header: 主题特色组件 — code 代码块（深色 code-dark）
_class: code-dark
-->

<grid cols="2">

<flex column>

## 渲染效果

```python
import math

def circle_area(r: float) -> float:
    """计算圆的面积"""
    # 注释 · 关键字 · 字符串 · 数字
    return math.pi * r ** 2

print(circle_area(2.0))  # 12.57
```

</flex>

<flex column>

## Markdown 源码

````markdown
<!-- _class: code-dark -->

```python
<你的代码>
```
````

```
---
theme: academic_template
class: code-dark
---
```

</flex>

</grid>

- **全局**：在文件头部 front matter 加 `class: code-dark`，作用于整份 PPT；
- **局部**：在幻灯片顶部加 `<!-- _class: code-dark -->`，仅当前页生效。

---

<!-- _header: 主题特色容器组件 — card 卡片（默认 · 结构） -->

<grid cols="2">

<flex column>

## 渲染效果

<card>

## 默认卡片（蓝色）

适用于信息分组、要点归纳。

- 蓝色边框 + 标题底纹
- blockquote 用于重点结论

> 这是卡片内的重点结论，浅蓝背景 + 深蓝文字

| 特性 | 说明 |
|------|------|
| 边框 | 左侧 3px 加粗 |
| 标题 | 蓝色底纹 |

</card>

</flex>

<flex column>

## Markdown 源码

```markdown
<card>

## 默认卡片（蓝色）

- 蓝色边框 + 标题底纹
- blockquote 用于重点结论
> 这是卡片内的重点结论

| 特性 | 说明 |
|------|------|
| 边框 | 左侧 3px 加粗 |

</card>
```

</flex>

</grid>

- 任意标题（h1–h6）自动变成带底纹的标题栏
- 内嵌表格表头/斑马纹等元素随卡片配色。

---

<!-- _header: 主题特色组件 — card 卡片（全色系） -->

<grid cols="2" rows="2">

<card green>

## 绿色 card green

成功、正面、完成类信息。

> 绿底 + 深绿文字

</card>

<card red>

## 红色 card red

危险、警告、问题类信息。

> 红底 + 暗红文字

</card>

<card yellow>

## 黄色 card yellow

注意、提醒、待确认类信息。

> 暖黄底 + 深褐文字

</card>

<card gray>

## 灰色 card gray

中性、归档、辅助说明类信息。

> 灰底 + 深灰文字

</card>

</grid>

- 默认蓝色 + `green | red | yellow | gray`；
- `compact` 可收紧内边距与表格，适合内容超出需排布密集场景。

---

<!-- _header: 主题特色组件 — outline 外框（默认 · 结构） -->

<grid cols="2">

<flex column>

## 渲染效果

<outline>

### 默认蓝色（虚线外框）

适用于轻量分组，虚线边框 + 蓝底标题。

> 引用文字同样支持蓝色左边框强调

</outline>

- outline 是虚线外框，与 card 结构相同效果不同
- 任意标题自动变成「蓝底白字」标签

</flex>

<flex column>

## Markdown 源码

```markdown
<outline>

### 默认蓝色（虚线外框）

适用于轻量分组。

> 引用文字同样支持蓝色左边框强调

</outline>
```

</flex>

</grid>

---

<!-- _header: 主题特色组件 — outline 外框（全色系 + solid） -->

<grid cols="2" rows="2">

<outline green>

### outline green

> 绿色虚线外框，展示成功/正面信息

</outline>

<outline red>

### outline red

> 红色虚线外框，展示危险/告警信息

</outline>

<outline yellow>

### outline yellow

> 黄色虚线外框，展示注意/提醒信息

</outline>

<outline gray>

### outline gray

> 灰色虚线外框，展示中性/归档信息

</outline>

</grid>

<outline blue solid>

### outline blue solid

实线通栏标题 + 居中，标题从「标签」变为「通栏横幅」。

</outline>

- 颜色属性：`blue | green | red | yellow | gray`，默认 `blue`（虚线）；
- `solid` 叠加任意颜色变实线，标题从「标签」变「通栏居中」；
- `compact` 收紧内边距与标题字号。

---

<!-- _header: 主题特色组件 — feature 左对齐卡片 -->

## 渲染效果

<grid cols="3">

<feature num="01">

### 描述成本

客户需要反复讲清楚「想要什么样的风格」

<tag>口头陈述</tag>

</feature>

<feature num="02" green>

### 定制

按用途与受众重新设计每一页

<tag>专属</tag>

</feature>

<feature num="03" yellow>

### 省心

统一视觉体系，成品即可使用

<tag>成品可用</tag>

</feature>

</grid>

- `feature` 是**容器盒子**，本身不绑定语义，只代表「标题左对齐 + 正文分级」这一种处理方式。和其他盒子的取舍见下页。
- `num` 渲染右上角的序号水印（`opacity: 0.12` 的淡色大号数字），不写该属性则完全不渲染。
- 颜色属性：`green | red | yellow | gray`，默认蓝色，同时决定左边框与标题颜色；`compact` 收紧内边距与字号。

---

<!--
_header: 主题特色容器组件 — 盒子怎么选
_class: compact
-->

## 都是容器盒子

<datatable>

### 按内容形状挑盒子

| 装进去的内容 | 用哪个 | 视觉处理 |
|------|------|------|
| 一个数或一个词 | `metric` | 居中，标题放大到 1.538rem |
| 标题下面跟一句成段解释 | `feature` | 左对齐，标题与正文分级 |
| 标题下面是列表 / 表格 / 引用 | `card` | 左对齐，标题带底纹栏 |
| 结构同上，但想更轻、不抢眼 | `outline` | 虚线框 + 标签式标题 |

</datatable>

- `card` / `outline` / `metric` / `feature` **都是容器盒子，本身不绑定语义**——没有哪个天生是「要点卡」或「指标卡」，区别只在对齐方式、字号层级和内边距。
- 选哪个看装进去的内容是什么形状；同一排里混用也完全可以，各按各的内容挑。

---

<!--
_header: 主题特色组件 — funnel 转化漏斗
_class: compact
-->

## 渲染效果

<funnel>

- 兴趣：刷到内容

  - 内容平台

- 信任：看懂案例

  - 完整生成过程

- 行动：发出邀请

  - 把 Word 发给我

</funnel>

- 每层自上而下**逐级收窄、逐级加深**，把「层层转化、逐级收敛」表达出来。
- 与 `flow` 的对比：两者都吃一份列表，`flow` 每格等宽等高，`funnel` 逐级收窄、颜色逐级加深。内容本身有「一层比一层少」的收敛关系就用 `funnel`，只是并列的先后步骤就用 `flow`。
- 颜色属性：`green | red | yellow | gray`，每种颜色配一条由浅入深的色阶；`compact` 收紧层高与间距。

---

<!-- _header: 主题特色组件 — figure 插图 -->

## 渲染效果

<figure>

![h:200px 示例截图](https://placehold.co/600x200/2563eb/white?text=Image+Placeholder)

示例截图

</figure>

- 图片撑满整行，带 1px 细描边与 4px 圆角；下方一行图注居中、小一号、中性灰，排法对齐 Word / 论文插图。
- 图注里写 `**图 1** 说明文字` 可把图号单独染成主题蓝，不写也照常居中显示。
- **`<figure>` 标签与内部内容之间必须空行**，否则里面几行会被当成原始 HTML 原样输出，图片不会渲染。
- `plain` 去掉图片描边，适合截图自带边框或整页大图的场景；`compact` 收紧图片与图注的间距并缩小图注字号。

---

<!-- _header: 主题特色组件 — figure[auto] 卡片内插图 -->

## 渲染效果

<card>

<figure auto>

![h:200px 卡片内示例图](https://placehold.co/600x200/2563eb/white?text=Image+Placeholder)

图片按 h:200px 等比缩放并居中，图注照常居中显示

</figure>

</card>

- `auto`：图片按 Marp 的 `w:` / `h:` 指令**等比缩放并居中**，不再撑满整行——卡片内插图、需要控制尺寸的小图用这个。
- 图注样式与全文其它 `figure` 一致，不必再手工写 `<note center>` 绕开。
- 不写 `auto` 时 `figure img { width: 100% }` 会跟 Marp 的尺寸**叠加**：Marp 把尺寸写成行内 `style="height:380px"`，优先级高于样式表、覆盖不掉，于是高度锁死、宽度撑满，方图会被横向拉伸。
- `auto` 要配 `w:` / `h:` 一起用；不写尺寸指令时图片按原始像素渲染，可能超出容器。

---

<!-- _header: 主题特色组件 — iconitem 图标条目 -->

## 渲染效果

<flex center>

<iconitem icon="话筒">汇报人：×××</iconitem>

<iconitem icon="人员">指导教师：××× 教授</iconitem>

</flex>

<flex>

<iconitem large icon="日历">large</iconitem>

<iconitem icon="时钟">默认</iconitem>

<iconitem small icon="闹钟">small</iconitem>

</flex>

<summary>

<flex center>

<iconitem plain icon="灵感">plain 去圆底：白图标，只在深色底上成立</iconitem>

</flex>

</summary>

- 一个 `iconitem` = 左边一个圆底图标 + 右边一段文字，**只管自己这一条怎么排**；要横排几条、怎么对齐，外面套 `flex` / `grid` 决定。
- `icon` 属性填素材名（不带 `.svg`），现收录 18 个：`话筒` `人员` `日历` `位置` `链接` `时钟` `闹钟` `教育` `灵感` `文件夹` `列表` `列表分类` `网格分类` `显示器` `消息` `直播` `耳机` `等待`；不写 `icon` 就只有文字、没有圆底图标。
- 变体：`large` / `small` 改尺寸、`plain` 去圆底、`compact` 紧凑。

---

<!-- _header: 主题特色组件 — iconitem 图标条目（写法） -->

## Markdown 源码

```markdown
<flex center>

<iconitem icon="话筒">汇报人：×××</iconitem>

<iconitem icon="人员">指导教师：××× 教授</iconitem>

</flex>
```

- 变体写在标签里：`<iconitem large icon="日历">`、`<iconitem plain icon="灵感">`。另外还有 `small` 与 `compact`。
- 条目之间**要空行隔开**（如上面那样），几个条目才不会挤进同一个段落里纵向堆叠；标签与文字写在同一行没问题，基座会把包住它的 `<p>` 收缩成内容宽度。
- 一行放不下时给外面的 `flex` 加 `wrap`（`<flex wrap center>`）折行，否则会硬挤在一行里溢出。
