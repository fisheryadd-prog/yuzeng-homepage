/** @type {import('next').NextConfig} */
const nextConfig = {
  // 图片优化配置 - 静态导出时需要禁用优化
  images: {
    unoptimized: true, // 静态导出必须禁用图片优化
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // 移除 trailingSlash 重定向
  trailingSlash: false,

  poweredByHeader: false,
  reactStrictMode: true,
  compress: true, // 启用gzip压缩
  swcMinify: true, // 使用SWC压缩（包含CSS优化）
};

module.exports = nextConfig;
