---
marp: true
theme: academic
paginate: true
---

<!--
_paginate: false
_class: homePage
-->

# Academic 主题颜色体系

## 组件配色 · 变体展示

---

<!-- _header: Card 卡片 — 默认（蓝色） -->

<card>

## 默认卡片（蓝色主题）

卡片组件 card，适用于信息分组、要点归纳、侧边栏等场景。

- 蓝色边框 + 标题底纹
- blockquote 用于重点结论

> 这是卡片内的重点结论，浅蓝背景 + 深蓝文字

| 特性 | 说明 |
|------|------|
| 边框 | `#003f88`，左侧加粗 |
| 标题 | 蓝色文字 |

</card>

---

<!-- _header: Card 卡片 — green 绿色 -->

<card green>

## 绿色卡片 card green

成功、正面、完成类信息展示。

- 绿色边框 + 标题底纹
- blockquote 自动切换为绿色主题

> 绿色卡片内的重点结论，绿底 + 深绿文字

| 特性 | 说明 |
|------|------|
| 边框 | `#006400` 绿色 |
| 表头 | 绿色背景 |

</card>

---

<!-- _header: Card 卡片 — red 红色 -->

<card red>

## 红色卡片 card red

危险、警告、问题类信息展示。

- 红色边框 + 标题底纹
- blockquote 自动切换为红色主题

> 红色卡片内的重点结论，红底 + 暗红文字

| 特性 | 说明 |
|------|------|
| 边框 | `#c00000` 红色 |
| 表头 | 红色背景 |

</card>

---

<!-- _header: Card 卡片 — yellow 黄色 -->

<card yellow>

## 黄色卡片 card yellow

注意、提醒、待确认类信息展示。

- 黄色边框 + 标题底纹
- blockquote 自动切换为暖黄主题

> 黄色卡片内的重点结论，暖黄底 + 深褐文字

| 特性 | 说明 |
|------|------|
| 边框 | `#b87a14` 暖黄褐 |
| 表头 | 黄色背景 |

</card>

---

<!-- _header: Card 卡片 — gray 灰色 -->

<card gray>

## 灰色卡片 card gray

中性、归档、辅助说明类信息展示。

- 灰色边框 + 标题底纹
- blockquote 自动切换为灰调主题

> 灰色卡片内的重点结论，灰底 + 深灰文字

| 特性 | 说明 |
|------|------|
| 边框 | `#455a64` 灰蓝 |
| 表头 | 灰色背景 |

</card>

---

<!-- _header: Badge 状态标签 — 全部变体 -->

### 默认

这里没有空行，有空行的时候会渲染 `p` 节点

<flex>
<tag>默认</tag>
<tag green>已完成</tag>
<tag yellow>进行中</tag>
<tag red>已取消</tag>
<tag gray>已归档</tag>
</flex>

### 在卡片中使用

<card>

## 项目状态一览

当前阶段 <tag yellow>开发中</tag>

核心模块 <tag green>已完成</tag>

遗留问题 <tag red>待修复</tag>

已归档项 <tag gray>3 项</tag>

</card>

---

<!-- 
_header: DataTable 数据表 — 默认（蓝色） 
_class: compact
-->

<grid cols="2" rows="2">

<datatable>

### 默认蓝色主题

| 参数 | 配置值 |
|------|--------|
| CPU | 4 核 2.8 GHz |
| 网络 | 千兆以太网 |

</datatable>

<datatable green>

### 绿色主题 — 服务器运行正常

| 指标 | 当前值 |
|------|--------|
| 磁盘 I/O | 正常 |
| 网络延迟 | 12ms |

</datatable>

<datatable red>

### 红色主题 — 异常告警汇总

| 告警项 | 状态 |
|--------|------|
| 数据库连接池 | 耗尽 |
| 消息队列 | 积压 2.8K |

</datatable>

<datatable yellow>

### 黄色主题 — 需关注的指标

| 指标 | 当前值 |
|------|--------|
| 磁盘使用率 | 82% |
| 内存使用率 | 78% |

</datatable>

</grid>

<datatable gray>

### 灰色主题 — 辅助参考数据

| 项目 | 数值 |
|------|------|
| 历史均值 | 45% |
| 同期对比 | +3.2% |

</datatable>

---

<!-- _header: Metric 指标卡片 -->

<flex>

<metric>

#### 2,847

月活跃用户数

<tag>↑ 12.5%</tag>

</metric>

<metric green>

#### 99.7%

服务可用性

<tag>达标</tag>

</metric>

<metric red>

#### 3

待处理告警

<tag>需关注</tag>

</metric>

</flex>

<flex>

<metric yellow>

#### 76%

预算执行率

<tag>注意</tag>

</metric>

<metric gray>

#### 1,024

历史归档数

<tag>已归档</tag>

</metric>

</flex>

---

<!-- _header: Summary 通栏总结 — 各变体 -->

<summary>

核心结论：系统整体运行平稳，已完成全部部署任务。注意：Q3 预算剩余 23%，**请关注支出节奏**。

<flex>
<tag>已发布</tag>
<tag green>通过</tag>
<tag yellow>审核中</tag>
<tag red>阻塞</tag>
<tag gray>已归档</tag>
</flex>

</summary>

<summary>

正文内容同样居中展示，tag 在深蓝背景上自动切换为高亮配色。

</summary>

---

<!-- 
_header: Checklist 清单 — 全色系 
_class: compact
-->

<flex>

<card>

### checklist blue（默认）

<checklist blue>

- API 接口定义完成
- **前端开发进行中**
- 数据库设计完成

</checklist>

</card>

<card green>

### checklist green

<checklist green>

- 集成测试通过
- 部署上线完成
- 系统稳定运行

</checklist>

</card>

</flex>

<flex>

<card red>

### checklist red

<checklist red>

- **安全漏洞修补**
- 回归测试执行
- 系统性能优化

</checklist>

</card>

<card yellow>

### checklist yellow

<checklist yellow>

- 第三方服务即将过期

  > 请在过期前续费，否则将无法使用该服务。

- 域名证书需续费

</checklist>

</card>

</flex>

<card gray>

### checklist gray + done

<checklist gray>

- 更多信息请联系管理员
- 已归档

</checklist>

<checklist done>

- ~~需求文档 v1~~
- ~~域名证书需续费~~

</checklist>

</card>

---

<!-- _header: DList 描述列表 — 全色系 -->

### dlist blue（默认）

<dlist blue label-width="4">

- 08:00

  起床洗漱，准备开始新的一天

- 配色

  主色 `#205691`，正文 `#334155`

</dlist>

<flex>

<dlist green label-width="4">

- Q1

  完成核心功能开发

- Q2

  系统上线并稳定运行

</dlist>

<dlist red label-width="4">

- 高危

  SQL 注入漏洞，需立即修复

- 中危

  敏感信息泄露风险

</dlist>

</flex>

<flex>

<dlist yellow label-width="4">

- 注意

  第三方服务即将过期

- 提醒

  月度预算已使用 82%

</dlist>

<dlist gray label-width="4">

- 备注

  以上数据截止 2026-07-31

- 参考

  详见附录 A 完整报告

</dlist>

</flex>

---

<!-- _header: Outline 外框 — 全色系 + solid -->

<outline blue>

### outline blue（默认虚线）

适用于轻量分组，虚线边框 + 蓝底标题。

> 引用文字同样支持蓝左边框强调

</outline>

<flex>

<outline green>

### outline green

绿色虚线外框，展示成功/正面信息。

> 部署上线完成，系统稳定

</outline>

<outline red>

### outline red

红色虚线外框，展示危险/告警信息。

> 数据库连接池耗尽需处理

</outline>

</flex>

<flex>

<outline yellow solid>

### outline yellow solid

黄色实线通栏标题 + 居中。

> 注意月度预算已使用 82%

</outline>

<outline gray solid>

### outline gray solid

灰色实线通栏标题 + 居中。

> 以上数据截止 2026-07-31

</outline>

</flex>

---

<!-- _header: Compare 对比组件 — before → after -->

<compare>

<before>

### 优化前

系统启动耗时较长，资源占用偏高：

- 冷启动 **8.2 秒**
- 内存占用 420 MB
- 首屏渲染 3.5 秒
- 并发处理 200 QPS

</before>

<arrow>

v2.0 → v3.0

</arrow>

<after>

### 优化后

重构核心模块，性能全面提升：

- 冷启动 **2.1 秒**
- 内存占用 180 MB
- 首屏渲染 0.8 秒
- 并发处理 850 QPS

</after>

</compare>

---

<!-- _header: Timeline 时间线 — blue / green -->

<flex auto>

<timeline blue>

- 短期目标（Q3–Q4 2026）

  > 2026 Q3–Q4

  - 数据库慢查询减少 60%
  - 缓存命中率 > 85%

- 中长期目标（2027）

  > 2027 H1–H2

  - 微服务拆分，独立部署

</timeline>

<timeline green>

- 已完成（Q1–Q2 2026）

  系统核心功能全部上线。

  > 2026 Q1–Q2

  - 用户系统重构完成
  - 支付模块通过验收

- 运营稳定期

  > 2026 Q3 起

  - SLA 保持 99.9%

</timeline>

<timeline red>

- 紧急问题（本周）

  线上故障需立即修复。

  > 本周

  - 数据库连接池耗尽
  - 缓存服务不可用

- 遗留债务

  - 旧版 API 版本下线

</timeline>

</flex>

<flex auto>

<timeline yellow>

- 注意事项（8 月）

  第三方服务续费提醒。

  > 2026-08

  - 域名证书 8/15 到期
  - CDN 流量包需扩容

</timeline>

<timeline gray>

- 历史归档（2025）

  项目一期总结归档。

  > 2025

  - 完成需求调研与原型
  - 通过技术评审

</timeline>

</flex>

---

<!-- _header: Tree 树形图 -->

<tree>

- Program（根程序）
  - ImportDeclaration
    - `import React from 'react'`
  - FunctionDeclaration
    - `function App()`
    - BlockStatement
      - ReturnStatement
        - JSXElement `<div>`
  - ExportDeclaration
    - `export default App`

</tree>

---

<!-- 
_header: 表格 — 全色系
_class: compact
-->

<grid cols="2">

<card green>

### table green

| 项目 | 说明 |
|------|------|
| 表头 | `#1a5c2a` |
| 偶数行 | `#f0fdf4` |

</card>

<card red>

### table red

| 项目 | 说明 |
|------|------|
| 表头 | `#a51010` |
| 偶数行 | `#fef2f2` |

</card>

<card yellow>

### table yellow

| 项目 | 说明 |
|------|------|
| 表头 | `#b87a14` |
| 偶数行 | `#fdf8ed` |

</card>

<card gray>

### table gray

| 项目 | 说明 |
|------|------|
| 表头 | `#455a64` |
| 偶数行 | `#f7f8f9` |

</card>

</grid>

<card>

### table 默认主题

| 挑战 | 应对策略 |
|------|---------|
| 数据量大，查询缓慢 | 引入 Elasticsearch 全文检索 |
| 缓存穿透严重 | 布隆过滤器 + 空值缓存 |
| 微服务调用链复杂 | 链路追踪 + 统一日志平台 |

</card>

---

<!-- _header: Note 辅助小字 — 全色系 + footnote -->

<note>默认灰色小字：适用于备注、数据来源、补充说明信息。</note>

<note blue>蓝色小字：与主题蓝色搭配，适合补充描述。</note>

<note green>绿色小字：表示正面/成功类补充信息。</note>

<note red>红色小字：表示警告/注意类补充信息。</note>

<note yellow>黄色小字：表示提醒/待确认类补充信息。</note>

<note footnote>脚注模式（footnote）：带顶部分隔线，适合幻灯片底部放置引用来源。</note>

---

<!-- _header: 全部颜色变体速查 -->

<card>

### 组件颜色变体

| 组件 | 可用变体 |
|------|---------|
| Card | 默认 / green / red / yellow / gray |
| Badge | 默认 / green / yellow / red / gray |
| DataTable | 默认 / green / red / yellow / gray |
| Metric | blue / green / red / yellow / gray |
| Checklist | blue / green / red / yellow / gray / done |
| DList | blue / green / red / yellow / gray / card 内自动适配 |
| Outline | blue / green / red / yellow / gray + solid 可组合 |
| Table | blue / green / red / yellow / gray |
| Timeline | blue / green / red / yellow / gray |
| Note | 默认 / blue / green / red / yellow / gray / footnote |
| Summary | bold / white / 内嵌 tag |

</card>