import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
    
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  
  images: {
    remotePatterns: [
      // Backend produksi (Railway) — tempat foto profile & thumbnail proyek
      // sebenarnya di-upload dan disimpan.
      {
        protocol: "https",
        hostname: "portfolio-ficode-production.up.railway.app",
        pathname: "/uploads/**",
      },
      // Backend lokal, untuk development di komputer sendiri.
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
