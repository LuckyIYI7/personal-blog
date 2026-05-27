+++
title = "用土区礼品卡充值 ChatGPT Plus"
date = 2026-05-24T18:00:00+08:00
draft = false

author = "Jiayi"

tags = ["ChatGPT", "Apple ID", "踩坑"]
categories = ["学习记录"]

+++

## 前言

最近用 OpenRouter 的 API 辅助搭建 Hugo 博客，这两天竟然花了十几块美刀。。OpenRouter 作为国际性中转站质量确实不错，但真的太贵了。所以还是想直接充值官方的 ChatGPT Plus 会员。

{{< timeline title="关键节点" >}}
{{< titem status="warn" time="2026-05-24 14:00" >}}研究直充方案，排除代充、虚拟卡、实体 Visa 卡。{{< /titem >}}
{{< titem status="ok" time="2026-05-24 15:00" >}}确定方案：开土区 Apple ID + seagm 购买礼品卡。{{< /titem >}}
{{< titem status="warn" time="2026-05-24 16:00" >}}切换 Apple ID 时踩坑，差点在 Settings 里操作导致数据丢失。{{< /titem >}}
{{< titem status="ok" time="2026-05-24 17:00" >}}在 App Store 正确切换账号，礼品卡充值成功，ChatGPT Plus 到手。{{< /titem >}}
{{< /timeline >}}

## 为什么选土区礼品卡

直充 ChatGPT Plus 有几种常见方式，挨个排除了一遍：

- **代充**：要把账号密码交给陌生人，安全性太差，直接排除。
- **虚拟卡**：没有口碑稳定的大平台，怕商家跑路。
- **办实体卡**（Visa / 招行万事达 / 工行星座卡）：可能要跑线下，还有几天审核流程，太麻烦。

最后想到自己用的是 iPhone，干脆发挥 iOS 设备的优势——开个外区 Apple ID，买礼品卡充值。土耳其区目前是最便宜的，大概一个月 80r，所以就定了土区。

## 操作步骤

### 1. 开土区 Apple ID

完全参考了这位 B 站 UP 主的视频，跟着一步一步操作即可：

> https://www.bilibili.com/video/BV1sYG76oE4g

一开始还担心手机没有魔法怎么改地区，后来发现可以用 **UU 加速器**改地区，不需要额外准备。顺手也下载了 Surfshark，以后手机也可以自由访问了。hh

### 2. 在 seagm 购买土区礼品卡

因为没有 Visa 卡，没走 oyunfor 平台，改用 **seagm** 购买土区 Apple 礼品卡。具体流程参考了这位 UP 主的视频：

> https://www.bilibili.com/video/BV1GLLV6eEjr

{{< note type="warn" title="踩坑提醒：切换 Apple ID 不要在 Settings 里操作" >}}
切换到土区 Apple ID 时，iPhone 一直提示会丢失数据，问要不要提前备份，未同步至 iCloud 的数据会直接没了。。多留了个心眼查了一下才知道：**要在 App Store 里切换账号，而不是在 Settings 里切换**。在 App Store 切换果然顺利很多，不会有数据丢失的提示。
{{< /note >}}

## 结果验证

- 土区 Apple ID 注册成功，UU 加速器改区可用
- seagm 礼品卡购买成功，充值到土区 Apple ID
- ChatGPT Plus 订阅成功，约 80r/月

## 总结

整个过程其实比想象中顺利，唯一的坑就是切换 Apple ID 要在 App Store 而不是 Settings 里操作。现在终于可以用上最先进的 AI agent 了。hhh
