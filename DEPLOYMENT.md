# Hugo 博客发布 SOP

## 1. 目标

把当前 Hugo 项目稳定发布到静态托管平台（任意支持静态文件的平台都可以）。

---

## 2. 发布前需要理解的结构

- `content/`：文章内容源文件
- `layouts/`：页面模板逻辑
- `static/`：原样拷贝资源（如 `favicon.svg`）
- `hugo.toml`：全局配置（`baseURL`、菜单、TOC、分页等）
- `public/`：构建产物目录（真正要上传/部署的文件）

一句话：**你发布的不是源码目录，而是 `public/` 产物**。

---

## 3. 每次发布标准流程（建议按顺序执行）

### Step 1. 切到项目根目录

```powershell
cd E:\Projects\personal-blog
pwd
```

意义：防止在错误目录执行 Hugo 命令。

### Step 2. 检查线上域名配置

编辑 `hugo.toml`，确认：

```toml
baseURL = "https://你的真实域名/"
```

意义：`canonical`、`og:url`、`RSS`、`sitemap` 都依赖它。

### Step 3. 检查内容发布状态

```powershell
hugo list drafts
hugo list future
hugo list expired
```

意义：避免误发草稿，或漏发计划文章。

### Step 4. 生产构建

```powershell
hugo --gc --minify
```

意义：
- `--gc` 清理无用缓存资源
- `--minify` 压缩输出，减少体积

### Step 5. 检查关键产物是否存在

```powershell
Get-ChildItem .\public
```

至少确认这些文件存在：

- `public/index.html`
- `public/404.html`
- `public/robots.txt`
- `public/index.xml`
- `public/sitemap.xml`
- `public/favicon.svg`

### Step 6. 抽查 SEO 元信息

打开 `public/index.html` 和任意文章页 `public/posts/.../index.html`，确认有：

- `rel="canonical"`
- `property="og:title"`
- `property="og:url"`
- `name="twitter:card"`
- `application/rss+xml`

### Step 7. 本地最终预览

```powershell
hugo server
```

手动点一遍：

1. 首页
2. 文章列表
3. 文章详情
4. tags/categories
5. 归档
6. RSS 链接
7. 不存在路径（确认 404）

### Step 8. 部署到平台

把 `public/` 作为发布目录上传，或让平台自动执行：

- Build command: `hugo --gc --minify`
- Output directory: `public`

---

## 4. 常见发布问题与排查

### 问题 A：线上 meta 里还是 localhost

根因：`baseURL` 仍是本地地址。  
修复：改 `hugo.toml` 后重新构建。

### 问题 B：文章线上不显示

根因常见：
- `draft = true`
- `date/publishDate` 在未来
- 文件不在 `content/` 下

排查命令：

```powershell
hugo list drafts
hugo list future
```

### 问题 C：`robots.txt` 的 sitemap 链接不对

根因：`baseURL` 错误，或 `robots` 模板未使用 `absURL`。  
修复：检查 `layouts/robots.txt` 与 `hugo.toml`。

---

## 5. 发布后回归检查（线上）

上线后立刻检查：

1. 首页是否正常加载
2. 文章详情页是否可访问
3. 404 页面是否生效
4. RSS (`/index.xml`) 是否可访问
5. Sitemap (`/sitemap.xml`) 是否可访问

---

## 6. 你的当前项目约定（本仓）

- 已启用：TOC、分页、404、OpenGraph/Twitter cards、RSS 导航、favicon
- 发布入口：`public/`
- 推荐发布命令：`hugo --gc --minify`
