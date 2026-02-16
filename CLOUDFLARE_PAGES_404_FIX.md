# 修复 Cloudflare Pages 404 错误

## 问题诊断

您的 Cloudflare Pages 部署显示成功，但访问 `https://yuzeng-homepage.pages.dev` 时出现 404 错误。

## 根本原因

虽然构建日志显示成功，但问题在于：

1. **Next.js 14.2.0** 的默认输出是 `.next` 目录（服务端渲染）
2. **Cloudflare Pages** 需要静态 HTML 文件
3. **输出目录配置**可能不匹配

## 解决方案

### 方案 1：更新 Cloudflare Pages 配置（最简单）

在 Cloudflare Pages 控制台中：

1. **进入项目设置**
   - 访问：https://dash.cloudflare.com/
   - Workers & Pages → yuzeng-homepage
   - Settings → Builds & deployments

2. **更改输出目录**
   - 当前可能是：`.next`
   - 尝试更改为：`.next/static` 或 `out`

3. **或者使用公共目录**
   - 将 `public` 目录的内容复制到 `.next`
   - 设置输出目录为：`.next`

### 方案 2：使用 Cloudflare Pages Functions（推荐）

创建 `api/_middleware.ts` 文件来处理 Next.js 路由：

```typescript
export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 处理静态文件
  if (url.pathname.startsWith('/_next') || url.pathname.startsWith('/static')) {
    return context.next();
  }

  // 处理其他路由
  try {
    return await context.next();
  } catch (e) {
    // 返回 index.html 用于 SPA 路由
    return env.ASSETS.fetch(request);
  }
}
```

### 方案 3：添加静态导出（推荐）

在 `next.config.js` 中添加（但需要测试构建兼容性）：

```javascript
const nextConfig = {
  output: 'export',  // 静态 HTML 导出
  images: {
    unoptimized: true,
  },
};
```

然后更新 Cloudflare Pages 设置：
- Build output directory: `out`（不再是 `.next`）

### 方案 4：使用 Next.js 的 standalone 模式

在 `next.config.js` 中：

```javascript
const nextConfig = {
  output: 'standalone',  // 生成独立的服务器
  images: {
    unoptimized: true,
  },
};
```

## 立即尝试的步骤

### 步骤 1：检查 Cloudflare Pages 实际文件

1. 登录 Cloudflare Dashboard
2. 进入 Pages → yuzeng-homepage
3. 点击 "View Build" 查看最新部署
4. 检查 "Uploads" 或 "Files" 标签
5. 确认哪些文件被上传了

### 步骤 2：验证构建输出目录

当前配置应该是：
- Build command: `npm run build`
- Build output directory: `.next`

但可能需要改为：
- Build output directory: `public`
- 或：`out`
- 或：`.next/static`

### 步骤 3：添加 _redirects 文件

在 `public/` 目录创建 `_redirects` 文件：

```
/* /index.html 200
```

这会确保所有路由都指向 index.html（用于 SPA）。

### 步骤 4：检查 index.html

确保在输出目录中有 `index.html` 文件。

## 快速修复命令

如果您有 Cloudflare Pages 的 CLI 访问权限：

```bash
# 检查部署文件
npx wrangler pages deployment list --project-name=yuzeng-homepage

# 查看特定部署的文件
npx wrangler pages deployment tail <deployment-id>
```

## 推荐的配置

### Cloudflare Pages 构建设置：

```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next (或 out)
Root directory: /
Node.js version: 18
```

### 环境变量：

```
NODE_VERSION: 18
```

## 本地测试

在部署前，本地测试构建输出：

```bash
# 清理
rm -rf .next out

# 构建
npm run build

# 检查输出
ls -la .next
ls -la out  # 如果存在

# 确认 index.html 存在
find . -name "index.html"
```

## 联系 Cloudflare 支持

如果以上方案都不行：

1. 收集信息：
   - 构建日志
   - 部署 ID
   - 错误截图

2. 访问：https://developers.cloudflare.com/pages/support/

3. 提交工单，说明：
   - Next.js 14.2.0 项目
   - 构建成功但 404
   - 已经尝试过的解决方案

## 相关资源

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Next.js 静态导出](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
