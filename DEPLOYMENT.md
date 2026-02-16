# Deployment Guide for Cloudflare Pages

## Quick Fix for Current Deployment Error

The error `Missing entry-point to Worker script or to assets directory` occurs because the deployment is using `npx wrangler deploy` which is for Cloudflare Workers, not Cloudflare Pages.

### Solution

Change your deploy command in Cloudflare Pages settings from:
```bash
npx wrangler deploy
```

To:
```bash
npm run deploy
```

Or directly:
```bash
npx wrangler pages deploy .next
```

## Project Configuration

This Next.js app is configured for static site generation, perfect for Cloudflare Pages:

- **Build Output**: `.next` directory
- **Static Export**: Configured in `next.config.js`
- **Image Optimization**: Disabled for static export
- **Wrangler Config**: Set up in `wrangler.toml`

## Deployment Methods

### Method 1: Cloudflare Pages GitHub Integration (Recommended)

1. Connect your GitHub repository to Cloudflare Pages
2. Set build configuration:
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Node.js version**: `18` or `20`

### Method 2: Manual Deployment with Wrangler

Deploy manually using:
```bash
npm run build
npm run deploy
```

### Method 3: CI/CD Pipeline

If using a custom CI/CD pipeline, ensure the deploy command is:
```bash
npx wrangler pages deploy .next --project-name=yuzeng-homepage
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to Cloudflare Pages
- `npm run lint` - Run ESLint

## Troubleshooting

### Build succeeds but deployment fails

Make sure you're using `wrangler pages deploy` not `wrangler deploy`.

### Missing assets error

Ensure the `.next` directory exists after build:
```bash
ls -la .next
```

### Permission errors

Make sure you're authenticated with Cloudflare:
```bash
npx wrangler login
```
