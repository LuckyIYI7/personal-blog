+++
title = "Codex 安装踩坑记录"
date = 2026-05-22T20:00:00+08:00
draft = false
tags = ["Codex", "安装", "踩坑"]
categories = ["学习记录"]
+++

## 前言：为什么选 OpenRouter

一开始打算直接用 ChatGPT 账号，第一步登录就卡住了——用国内手机号显示 invalid。。后来搜了一圈，知道可以用虚拟号码接收验证码，大概有几个平台可以用：

- [5sim](https://5sim.com/zh)：推荐越南节点
- [hero-sms](https://hero-sms.com/cn)：推荐东南亚国家（泰国）
- [Pingme Lite](https://pingmelite.com/cn/sms-verification-code-helper-2/)：推荐英国节点

但一个虚拟号码大概要5r，登上去之后还要充值，充值 ChatGPT 本身又是个麻烦事（代充要给账号密码、海外信用卡门槛高、虚拟卡平台跑路的多。。），所以最后决定不折腾了，改用 **OpenRouter 提供的第三方 API**。OpenRouter 支持国内支付方式，也是个比较大的中转站，感觉比较靠谱。。

{{< timeline title="安装关键节点" >}}
{{< titem status="warn" time="2026-05-22 14:00" >}}开始安装，发现 `codex` 命令不可用。{{< /titem >}}
{{< titem status="ok" time="2026-05-22 15:00" >}}定位为 CLI 未安装 + 环境变量未完整配置。{{< /titem >}}
{{< titem status="error" time="2026-05-22 17:00" >}}Desktop App 出现 401，原因是 API base URL 与 key 不匹配。{{< /titem >}}
{{< titem status="ok" time="2026-05-22 19:00" >}}修正 `config.toml`，最终可用。{{< /titem >}}
{{< /timeline >}}

---

## 一、OpenRouter 准备

### 充值

OpenRouter 虽然支持国内支付，但如果地区选在国内，御三家模型（GPT/Claude/Gemini）仍然显示不可用。。解决方法是把地区改到**美国免税州**，我改的是俄勒冈州波特兰——让 DeepSeek 随机生成了一个波特兰的地址信息填进去，最后成功支付了。

### 拿到 API Key

充值完成后在 OpenRouter 控制台生成 API Key，格式是 `sk-or-v1-xxxx`，后面配置环境变量和 config.toml 都要用到。

---

## 二、Codex CLI 安装

### 环境变量配置

在 PowerShell 里输入 `codex` 发现根本不认识这个命令，这才意识到我下载的是 Desktop App（GUI 桌面应用），并没有安装 CLI（命令行 Agent 工具，类似 Claude Code 那样在终端工作）。

先配置环境变量：Win+S 打开 Windows 环境变量页面，在**用户变量**里新增以下三个：

| 变量名 | 变量值 |
|---|---|
| `OPENAI_API_KEY` | `sk-or-v1-xxxx`（你的 OpenRouter key） |
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` |
| `OPENAI_MODEL` | `openai/gpt-5` |

顺带说一下，Claude Code 用的是 `ANTHROPIC_AUTH_TOKEN` 和 `ANTHROPIC_BASE_URL`，和 Codex 的变量名完全不同，所以两者互不干扰。

### 安装 CLI

配置完环境变量后，在 PowerShell 执行全局安装：

```powershell
npm install -g @openai/codex
```

安装后可以用以下命令验证：

```powershell
npm list -g --depth=0
```

如果能看到 `@openai/codex` 说明安装成功。如果已经有 `@openai/codex` 但 `codex` 命令仍然不可用，那就是 PATH 没设置好，检查环境变量里的 path。

---

## 三、Codex Desktop App 配置

CLI 装好之后，Desktop App 还是有问题，测试输入后报错：

```
unexpected status 401 Unauthorized: Incorrect API key provided: sk-or-v1-***000c.
url: https://api.openai.com/v1/responses
auth error: 401, auth error code: invalid_api_key
```

错误原因是 Desktop App 默认请求的是 `api.openai.com`，并不认识 OpenRouter 的 key。需要修改 `config.toml` 文件来告诉它用 OpenRouter。

在 YouTube 和 Google 搜 "codex with openrouter integration" 找到了 OpenRouter 官方文档：https://openrouter.ai/docs/cookbook/coding-agents/codex-cli

文档给的配置只适用于 CLI，Desktop App 的 config.toml 还有别的字段不能乱动。。我让 ChatGPT 帮我合并了一下，最终可用的 config.toml 内容如下：

```toml
model_provider = "openrouter"
model_reasoning_effort = "high"
model = "openai/gpt-5"

[model_providers.openrouter]
name = "openrouter"
base_url = "https://openrouter.ai/api/v1"
env_key = "OPENROUTER_API_KEY"

[windows]
sandbox = "elevated"

[marketplaces.openai-primary-runtime]
last_updated = "2026-05-22T07:54:27Z"
source_type = "local"
source = '\\?\C:\Users\64169\.cache\codex-runtimes\codex-primary-runtime\plugins\openai-primary-runtime'

[plugins."documents@openai-primary-runtime"]
enabled = true

[plugins."spreadsheets@openai-primary-runtime"]
enabled = true

[plugins."presentations@openai-primary-runtime"]
enabled = true

[projects.'c:\users\64169\documents\test project']
trust_level = "trusted"

[projects.'c:\users\64169']
trust_level = "trusted"

[projects.'e:\projects\snake-game']
trust_level = "trusted"

[projects.'c:\users\64169\documents\codex\2026-05-22\new-chat']
trust_level = "trusted"

[tui.model_availability_nux]
"openai/gpt-5" = 3

[desktop]
conversationDetailMode = "STEPS_COMMANDS"
```

修改保存后，Desktop App 正式可用。

---

## 附：一个误区澄清

一开始我以为 Codex Desktop App 必须依赖 Codex CLI，就像 PyCharm 依赖 Python 一样。。其实不是。

之所以产生这个误解，是因为两个问题连续出现：PowerShell 不认识 `codex`，Desktop App 又刚好报错，让我以为后者是因为前者没装好导致的。但实际上：
- **CLI 的问题**是没有全局安装
- **Desktop App 的问题**是 OpenRouter 的 config.toml 没配置正确

它们是两个相对独立的客户端，Desktop App 更偏图形界面，CLI 更偏终端 Agent workflow，并不是严格的"前后端关系"。

{{< note type="warn" title="踩坑提醒" >}}
Desktop App 和 CLI 是两个相对独立的客户端，不要混为同一个故障来源。
{{< /note >}}
