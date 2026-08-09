---
marp: true
theme: academic
paginate: true
---

<!--
_paginate: false
_class: homePage
-->

# Academic 主题组件体系

## 组件功能 · 变体展示

---

<!-- _header: PPT 文字类组件预览 -->

# 一级主标题 · PPT大标题

## 二级标题 · 章节标题

### 三级小标题 · 模块小标题

#### 四级小标题

---

<!-- _header: PPT 文字类组件预览 -->

# 正文文本组件

正文段落文本，用于PPT主体描述，预设合理行间距，适配幻灯片阅读。支持常规叙述内容排版，保证页面清爽不拥挤。

<note>数据来源：示例年度统计报告</note>

<note footnote>脚注辅助小字：适用备注、数据来源、补充说明信息。</note>

---

<!-- _header: PPT 文字类组件预览 -->

# 条目列表组件

有序列表：
1. 完成项目第一阶段目标
2. 梳理核心流程方案
3. 落地试点验证工作

圆点无序列表：
- 需求调研与收集
- 方案设计与评审
- 上线持续迭代优化

---

<!-- _header: PPT 文字类组件预览 -->

# 高亮文本 / 引用组件

重点信息可以使用 <mark>行内高亮文本</mark> 进行突出展示。

> 引用框组件：适合放置观点、总结摘要、客户语录、核心结论。

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
