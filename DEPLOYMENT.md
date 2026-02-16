# Deployment Guide for Cloudflare Pages

## Recommended Deployment Method: Cloudflare Pages Direct Integration

This project uses Cloudflare Pages' built-in GitHub integration for automatic deployments. This is the simplest and most secure approach - no API tokens or custom deploy commands needed.

## Initial Setup (One-Time)

### Step 1: Connect Repository to Cloudflare Pages

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/)
2. Click **"Create a project"** or select your existing project
3. Click **"Connect to Git"**
4. Select GitHub and authorize access
5. Choose repository: `fisheryadd-prog/yuzeng-homepage`

### Step 2: Configure Build Settings

In the Cloudflare Pages project settings:

- **Framework preset**: Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/` (leave empty)
- **Node.js version**: `18` or `20`

### Step 3: Environment Variables (Optional)

Add any required environment variables:
- `NODE_VERSION`: `18` (or your preferred version)

## How Deployment Works

Once set up, deployments happen **automatically**:

1. **Automatic**: Every push to `main` branch triggers a new deployment
2. **Preview**: Pull requests create preview deployments
3. **Rollbacks**: Easy rollback to previous deployments

## Project Configuration

This Next.js app is optimized for Cloudflare Pages:

- **Build Output**: `.next` directory
- **Image Optimization**: Disabled (`unoptimized: true` in `next.config.js`)
- **Static Generation**: Pre-renders pages at build time
- **Performance**: Fast static page loads

## Available Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production (.next directory)
npm run start    # Start production server (for testing)
npm run lint     # Run ESLint
```

## Local Testing

Before pushing changes, test locally:

```bash
# Build the project
npm run build

# Test production build locally
npm run start

# Visit http://localhost:3000
```

## Deployment Workflow

### Development Workflow

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```

2. Make changes and test locally:
   ```bash
   npm run dev
   ```

3. Commit and push:
   ```bash
   git add .
   git commit -m "Add your feature"
   git push origin feature/your-feature
   ```

4. Create pull request on GitHub
5. Cloudflare Pages automatically creates a **preview deployment**
6. Test the preview URL
7. Merge to `main` for **production deployment**

### Production Deployment

Simply push to the `main` branch:
```bash
git checkout main
git merge feature/your-feature
git push origin main
```

Cloudflare Pages will automatically deploy! 🚀

## Troubleshooting

### Build Fails

1. Check the build logs in Cloudflare Pages dashboard
2. Ensure `package.json` is up to date
3. Verify all dependencies are installable
4. Test locally first: `npm run build`

### Deployment Stuck

1. Check Cloudflare Pages status page
2. Cancel and retry the deployment
3. Contact Cloudflare support if issue persists

### Preview Not Working

1. Check that the PR is not in draft mode
2. Verify GitHub webhook is configured
3. Check Cloudflare Pages deployment logs

## Alternative: Manual Deployment (Not Recommended)

If you need to deploy manually without GitHub integration:

1. Build locally:
   ```bash
   npm run build
   ```

2. Use Cloudflare Pages dashboard to upload the `.next` directory

**Note**: This is not recommended - use GitHub integration for automatic deployments.

## Migration from Wrangler (Previous Method)

This project previously used `wrangler pages deploy` with API tokens. That approach has been replaced with the direct GitHub integration because:

- ✅ No API token management needed
- ✅ Automatic deployments on git push
- ✅ Preview deployments for pull requests
- ✅ Better security (no tokens to rotate)
- ✅ Simpler configuration

If you still have the old deploy setup configured in CI/CD, remove the deploy command and let Cloudflare Pages handle deployments automatically.

## Performance Tips

- **Bundle Size**: Current bundle is ~93.7 kB (after removing AI assistant)
- **Static Pages**: All pages are pre-rendered for fast loads
- **Images**: Use optimized images (WebP format recommended)
- **Caching**: Cloudflare automatically caches static assets

## Support

For Cloudflare Pages issues:
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [Cloudflare Status](https://www.cloudflarestatus.com/)
