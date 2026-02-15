/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true, // 启用gzip压缩
  swcMinify: true, // 使用SWC压缩
  experimental: {
    optimizeCss: true, // 优化CSS
  },
};

module.exports = nextConfig;
