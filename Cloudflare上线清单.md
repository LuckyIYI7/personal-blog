# Cloudflare Pages 上线清单（Hugo）

## 0. 你当前项目的状态
- 主题：`neopost`
- Hugo 可执行文件（本机）：`E:\DevTools\Hugo\hugo.exe`
- 本地生产构建已通过：`hugo --gc --minify`

---

## 1. 本地准备（为什么）
- 目的：把“源码仓库”和“构建产物”分开，避免 `public/` 干扰版本管理。
- 我已为你新增 `.gitignore`，忽略 `public/`、`resources/`、`.hugo_build.lock`。

---

## 2. 推送到 GitHub（Cloudflare Pages 需要）

在项目根目录执行（PowerShell）：

```powershell
git status
git add .
git commit -m "chore: prepare hugo site for cloudflare pages deployment"
```

然后在 GitHub 网页新建一个空仓库（不要初始化 README）。

新建后执行：

```powershell
git remote add origin https://github.com/<你的GitHub用户名>/<仓库名>.git
git push -u origin feat/theme-neopost-migration
```

说明：
- 你现在在 `feat/theme-neopost-migration` 分支，所以先推这个分支最稳。
- Cloudflare 里可以直接把这个分支设为 Production branch。

---

## 3. Cloudflare Pages 控制台配置（关键参数）

1. 进入 Cloudflare Dashboard -> Workers & Pages -> Create application -> Pages
2. 选择 `Import an existing Git repository`
3. 选择你刚推送的 GitHub 仓库
4. Build 配置填写：

- Production branch: `feat/theme-neopost-migration`
- Framework preset: `Hugo`（若未自动识别）
- Build command: `hugo --gc --minify -b $CF_PAGES_URL`
- Build output directory: `public`
- Root directory: 留空（仓库根目录）

为什么 build command 要这样写：
- `--gc --minify`：清理并压缩产物
- `-b $CF_PAGES_URL`：自动把本次部署 URL 作为 baseURL，避免 canonical/OG 链接错误

---

## 4. 环境变量（建议）

在 Pages 项目 -> Settings -> Environment variables 添加：

- `HUGO_VERSION = 0.161.1`

说明：
- 作用是固定 Hugo 版本，避免未来平台默认版本变化导致构建差异。
- 建议在 Production 和 Preview 都加同样值。

---

## 5. 首次上线后的检查

部署成功后访问：

- `https://<你的项目名>.pages.dev/`
- `https://<你的项目名>.pages.dev/posts/`
- `https://<你的项目名>.pages.dev/archives/`
- `https://<你的项目名>.pages.dev/index.xml`
- `https://<你的项目名>.pages.dev/robots.txt`
- `https://<你的项目名>.pages.dev/404.html`

若都正常，再做一步“长期配置”：
- 把 `hugo.toml` 里的 `baseURL` 从 `https://example.com/` 改成你的正式域名或 `pages.dev` 地址。

---

## 6. 后续更新博客（本地 -> 线上）

```powershell
git add .
git commit -m "feat: publish new post"
git push
```

Cloudflare 会自动拉取并重新构建发布。
