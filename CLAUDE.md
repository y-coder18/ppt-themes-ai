# 项目记忆

## 排版验证方式（重要）

**非必要不要截图看效果！！！** 优化排版 / 布局时，优先通过阅读以下内容来推断效果：

- 主题样式：`themes/academic/academic_template.css`（组件间距、栅格、字号都由它控制）
- 组件体系文档：`themes/academic/academic组件体系.md`
- Marp Markdown 源文件本身

只有在确实无法从代码 / 结构判断（例如内容疑似溢出、间距异常需要精确测量）时，才询问用户，是否需要截图。

## Marp 主题加载

### `@import` 不解析文件路径，多主题用cli构建必须用 `--theme-set`

正确做法是用 `--theme-set` 把所有主题文件列全，靠 CSS 层叠覆盖（被覆盖的在前，覆盖的在后）：

```bash
marp xxx.md --theme-set themes/academic/academic_template.css themes/academic/academic_CUST.css \
  --html --allow-local-files
```

## 品牌资源（logo / 背景图）由主题提供

**正文 Markdown 里不要写 logo**，`homePage` / `thanksPage` 也不写。logo 与整页背景图都绑在主题变量上，改皮肤只改变量块（见 `themes/academic/academic_CUST.css`）：

| 变量 | 作用 |
|---|---|
| `--logo` | 页眉 / 章节页 / 封面 / 致谢页共用的 logo。基座默认 `none`（不放 logo），皮肤里覆盖这一个变量即可四处同时换图 |
| `--logo-home-h` / `--logo-thanks-h` | 封面 / 致谢页 logo 的占位高度，`0px` = 该页不放 logo（默认 0，不占位） |
| `--home-bg` / `--contents-bg` / `--thanks-bg` | 封面 / 目录 / 致谢页的整页背景图 |

封面与致谢页的 logo 是弹性项（`::before`），高度走上面的变量；正文里再写一遍 logo 图会变成两个 logo。