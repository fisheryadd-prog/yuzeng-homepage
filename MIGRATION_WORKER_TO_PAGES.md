# 从 Cloudflare Workers 迁移到 Cloudflare Pages 指南

## 当前状态分析

您的项目已经基本配置为 Cloudflare Pages 模式，但需要一些调整以确保完全兼容。

## Workers vs Pages 的主要区别

### Cloudflare Workers
- 运行 JavaScript/V8 worker 脚本
- 需要部署命令: `wrangler deploy`
- 使用 `wrangler.toml` 配置
- 适合动态 API 和边缘计算

### Cloudflare Pages
- 部署静态站点（HTML/CSS/JS）
- 自动从 GitHub 构建
- 使用 Cloudflare Pages 仪表板配置
- 适合 Next.js、React 等前端框架

## 迁移步骤

### 步骤 1: 确认 Next.js 配置

您的 `next.config.js` 已经正确配置了静态导出所需的设置：
- ✅ `images.unoptimized: true` - 已禁用图片优化
- ✅ `trailingSlash: false` - 无尾部斜杠
- ✅ 静态导出就绪

### 步骤 2: 验证 package.json

当前配置：
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "deploy": "echo 'Build complete - Cloudflare Pages will handle deployment'",
    "start": "next start",
    "lint": "next lint"
  }
}
```

✅ 构建脚本正确
✅ 部署脚本已更新为无操作（让 Cloudflare Pages 处理）

### 步骤 3: Cloudflare Pages 项目配置

在 Cloudflare Pages 仪表板中：

1. **访问项目设置**
   - 登录: https://dash.cloudflare.com/
   - 进入: Pages → yuzeng-homepage
   - 点击: Settings → Builds & deployments

2. **配置构建设置**
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (留空)
   - **Deploy command**: `npm run deploy` (设置为我们的 echo 脚本)

3. **环境变量**（可选）
   - `NODE_VERSION`: `18` 或 `20`

### 步骤 4: 清理旧配置

删除以下文件（如果存在）：
- ❌ `wrangler.toml` - Workers 配置文件
- ❌ 任何 `wrangler` 相关的部署脚本

### 步骤 5: 测试构建

本地测试构建流程：

```bash
# 清理旧的构建
rm -rf .next

# 运行构建
npm run build

# 验证输出目录
ls -la .next
```

应该看到：
- `.next/server` - 服务器端代码
- `.next/static` - 静态资源
- 各种 JSON manifest 文件

## 关键配置文件

### 1. next.config.js ✅
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Cloudflare Pages 需要
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  trailingSlash: false,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
};

module.exports = nextConfig;
```

### 2. package.json ✅
包含必要的脚本，无需 wrangler

### 3. .gitignore ✅
确保 `.next/` 在 .gitignore 中（因为 Cloudflare 会构建）

## Cloudflare Pages 仪表板配置截图位置

需要更新的设置在：
```
https://dash.cloudflare.com/
  → Pages
  → yuzeng-homepage
  → Settings
  → Builds & deployments
  → Build configurations
```

## 验证迁移成功

部署后检查：

1. **部署日志**
   ```
   ✓ Installing dependencies
   ✓ Building: npm run build
   ✓ Deploying to Cloudflare Pages
   ```

2. **网站访问**
   - 访问您的 Pages URL
   - 检查所有页面是否正常加载
   - 验证图片和静态资源

3. **控制台检查**
   - 打开浏览器开发者工具
   - 检查没有 404 错误
   - 验证所有资源加载成功

## 常见问题排查

### 问题 1: 构建成功但部署失败

**原因**: Build output directory 配置错误

**解决**:
- 确认设置为: `.next`
- 不是 `out` 或 `public`

### 问题 2: 图片不显示

**原因**: 图片优化未禁用

**解决**: 确认 `next.config.js` 中有:
```javascript
images: {
  unoptimized: true
}
```

### 问题 3: 路由 404

**原因**: 静态导出配置问题

**解决**:
- 确认没有使用 API routes
- 确认所有页面都是静态的

### 问题 4: Deploy command 必需错误

**原因**: Cloudflare Pages 要求 deploy command

**解决**: 使用我们的 echo 脚本:
```bash
npm run deploy
```

## 迁移后的好处

✅ **自动化部署**: 推送到 GitHub 自动触发构建
✅ **预览部署**: Pull request 自动创建预览环境
✅ **无需 API Token**: 不需要管理 Cloudflare API token
✅ **更简单**: 无需 wrangler 命令
✅ **更快速**: 直接静态文件服务

## 性能优化建议

1. **图片优化**
   - 使用 WebP 格式
   - 压缩图片文件
   - 使用 CDN (Cloudflare 自动提供)

2. **代码分割**
   - Next.js 自动处理
   - 动态导入非首屏组件

3. **缓存策略**
   - Cloudflare Pages 自动缓存静态资源
   - 使用长缓存期版本化文件名

4. **监控**
   - 在 Cloudflare Pages 仪表板查看分析
   - 监控构建时间和失败率

## 下一步

1. ✅ 确认 Cloudflare Pages 配置正确
2. ✅ 清理任何 wrangler 相关配置
3. ✅ 推送代码触发新部署
4. ✅ 验证网站正常工作
5. ✅ 享受自动化部署！🎉

## 需要帮助？

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Cloudflare 社区](https://community.cloudflare.com/)
