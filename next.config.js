/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
        port: "",
        pathname: "/**",
      },
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
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  experimental: {
    optimizeCss: true,
  },
  productionBrowserSourceMaps: false,
  // Suppress webpack warnings from third-party dependencies
  webpack: (config, { isServer, dev }) => {
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

    // Fix HMR WebSocket port mismatch in dev mode
    if (dev && !isServer) {
      config.output = config.output || {};
      config.output.publicPath = '/_next/';
    }

    return config;
  },
}

module.exports = nextConfig
