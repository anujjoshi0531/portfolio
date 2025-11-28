/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "notion.so",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.notion.so",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  experimental: {
    optimizeCss: true,
  },
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Optimize font loading
  optimizeFonts: true,
  // Suppress webpack warnings from third-party dependencies
  webpack: (config, { isServer }) => {
    // Suppress the critical dependency warning from keyv (used by notion-client)
    config.module = config.module || {};
    config.module.exprContextCritical = false;
    
    // Alternative: Ignore specific warnings using webpack's ignoreWarnings
    config.ignoreWarnings = [
      {
        module: /node_modules\/keyv\/src\/index\.js/,
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ];
    
    return config;
  },
}

module.exports = nextConfig
