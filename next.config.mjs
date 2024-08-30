/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.cache = false; // 禁用 Webpack 缓存
    return config;
  }
};

export default nextConfig;
