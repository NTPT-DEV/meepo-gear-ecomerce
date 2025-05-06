import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    config.resolve.fallback = {
      ...config.resolve.fallback,
      async_hooks: false, 
    };

    return config;
  },
};

export default nextConfig;
