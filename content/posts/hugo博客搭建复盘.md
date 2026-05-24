+++
title = "Hugo博客搭建复盘"
date = 2026-05-23T21:40:00+08:00
draft = false
author = "Jiayi"
summary = "从 0 到上线，我们把 Hugo 博客从最小雏形做到可维护：功能补齐、主题迁移修复、Cloudflare 免费部署全部打通。"
title-images = ["/images/hugo-recap-cover.svg"]
tags = ["Hugo", "Cloudflare", "主题迁移", "踩坑"]
categories = ["学习记录"]
table-of-contents = true
+++

## 前言：这次不是“搭个壳子就结束”

这篇是我给自己做的一次阶段复盘。

一开始我只是想先把 Hugo 跑起来，结果一路做下来，已经不只是“写两篇文章”这么简单，而是把一个能本地写作、能线上发布、还能持续维护的博客雏形真正搭起来了。

<!--more-->

---

## 我们做出了什么？

先说结果：这个博客已经具备“能用 + 能看 + 能更新”的基础能力。

1. 不装主题，先手写最小首页，解决 `Page Not Found`
2. 文章页可访问，Markdown 渲染正常
3. 归档页可用，按年分组、按月统计、按时间倒序
4. 标签页、分类页可用，导航高亮正常
5. TOC 可用（桌面端固定、移动端折叠）
6. 目录支持平滑滚动与当前章节高亮（scroll spy）
7. 自定义 shortcodes 可用（时间线、踩坑提醒）
8. 表格样式优化，窄屏支持横向滚动
9. 移动端兼容修复（长内容不再挤出屏幕）

{{< timeline title="关键节点" >}}
{{< titem status="warn" time="阶段 1" >}}本地访问先遇到 404，先做最小首页兜底。{{< /titem >}}
{{< titem status="ok" time="阶段 2" >}}文章、归档、标签、分类全部打通。{{< /titem >}}
{{< titem status="warn" time="阶段 3" >}}主题迁移后，之前做的一些交互和样式丢失。{{< /titem >}}
{{< titem status="ok" time="阶段 4" >}}通过 Hugo 覆盖机制，逐步把关键设计加回。{{< /titem >}}
{{< titem status="ok" time="阶段 5" >}}Cloudflare Pages 免费部署成功。{{< /titem >}}
{{< /timeline >}}

---

## 主题迁移：模板很香，但“丢功能”很真实

后面我们选了 `neopost`。

页面确实更好看了，但很快发现：我之前自己做的很多细节不见了，比如 TOC 交互、时间线短代码、提醒块样式等。

这次最大的收获是：Hugo 不是二选一，不是“用了主题就不能保留自定义”。

正确姿势是：

1. 保留主题整体外观
2. 在项目层通过 `layouts/` 和 `static/` 覆盖主题文件
3. 只恢复关键功能，避免一次改太多

一句话：主题是起点，不是终点。

---

## 免费上线 Cloudflare：踩坑后就很顺

上线时我先误入 Workers 链路，导致构建失败；切到 Pages 项目后就顺利了。

现在流程非常清晰：

1. 本地改内容/样式
2. `git add` + `git commit` + `git push`
3. Cloudflare Pages 自动构建并发布

{{< note type="warn" title="踩坑提醒" >}}
Cloudflare 有 Workers 和 Pages 两条路。Hugo 静态博客优先 Pages。
如果日志里出现 `npx wrangler deploy`，大概率走错链路了。
{{< /note >}}

---

## 如果重来一次，我会这样做

1. 先定主题（先稳定大框架）
2. 再逐步加功能（TOC、shortcode、归档、样式）
3. 每做一批就上线预览，不堆到最后一次性排错

这就是最朴素的工程习惯：小步提交，持续验证。

---

## 收尾

现在这个博客虽然还不是终极形态，但已经是一个可持续维护的版本。

后面我会继续写内容，也会慢慢打磨视觉和写作 workflow。

如果你也在从 0 搭 Hugo，希望这篇能给你一点信心：
先跑起来，再变漂亮，最后再变强大。