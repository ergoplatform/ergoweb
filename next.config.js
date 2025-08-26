/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/cn/:path*',
        destination: '/zh/:path*',
        permanent: true,
      },
      {
        source: '/docs/:path*',
        destination: 'https://storage.googleapis.com/ergo-cms-media/docs/:path*',
        permanent: true,
      },
      {
        source: '/img/:path*',
        destination: 'https://storage.googleapis.com/ergo-cms-media/img/:path*',
        permanent: true,
      },
      {
        source: '/about/',
        destination: '/discover/#DiscoverERG',
        permanent: true,
      },
      {
        source: '/basics/',
        destination: '/discover/#DiscoverERG',
        permanent: true,
      },
      {
        source: '/wallets/',
        destination: '/get-erg/#Wallets',
        permanent: true,
      },
      {
        source: '/exchanges/',
        destination: '/get-erg/#Exchanges',
        permanent: true,
      },
      {
        source: '/contribute/',
        destination: '/community/#Contribute',
        permanent: true,
      },
      {
        source: '/software/',
        destination: '/discover/#DiscoverERG',
        permanent: true,
      },
      {
        source: '/use_cases/',
        destination: '/#UniqueErgo',
        permanent: true,
      },
      {
        source: '/foundation/',
        destination: '/community/#Foundation',
        permanent: true,
      },
      {
        source: '/hall_of_fame/',
        destination: '/community/#HallOfFame',
        permanent: true,
      },
      {
        source: '/documents/',
        destination: '/discover/#Documents',
        permanent: true,
      },
      { source: '/faq/', destination: '/discover/#FAQ', permanent: true },
      {
        source: '/mining/',
        destination: '/get-erg/#Mining',
        permanent: true,
      },
      {
        source: '/privacy/',
        destination: '/privacy-policy/',
        permanent: true,
      },
      {
        source: '/mobile-wallets/',
        destination: '/ergo-wallet-app/',
        permanent: true,
      },
      {
        source: '/news',
        destination: '/blog?type=news',
        permanent: true,
      },
      {
        source: '/news/:slug*',
        destination: '/blog?type=news',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  trailingSlash: true,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: false,
  webpack: (config, { isServer }) => {
    // Only enable client source maps during development
    if (!isServer && process.env.NODE_ENV !== 'production') {
      config.devtool = 'source-map';
    }

    // Add PostCSS loader with PurgeCSS for production builds
    if (process.env.NODE_ENV === 'production') {
      const cssRule = config.module.rules.find(
        (rule) => rule.test && rule.test.toString().includes('.scss'),
      );

      if (cssRule) {
        cssRule.use.push({
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('@fullhuman/postcss-purgecss')({
                  content: [
                    './pages/**/*.{js,ts,jsx,tsx}',
                    './components/**/*.{js,ts,jsx,tsx}',
                    './sections/**/*.{js,ts,jsx,tsx}',
                    './content/**/*.{js,ts,jsx,tsx,mdx}',
                    './docs/**/*.{js,ts,jsx,tsx,mdx}',
                    './public/**/*.{js,ts,jsx,tsx,mdx}',
                    './scripts/**/*.{js,ts,jsx,tsx,mdx}',
                    './stories/**/*.{js,ts,jsx,tsx,mdx}',
                    './styles/**/*.{js,ts,jsx,tsx,mdx}',
                    './utils/**/*.{js,ts,jsx,tsx,mdx}',
                  ],
                  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                  safelist: {
                    standard: [/^swiper-/, /^Toastify__/, /^dark/],
                  },
                }),
              ],
            },
          },
        });
      }
    }
    return config;
  },
  async headers() {
    return [
      // Immutable caching for Next static assets and images
      {
        source: '/_next/(static|image)/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Immutable caching for public assets (fonts, images, videos)
      {
        source: '/(fonts|assets)/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Security headers and default cache for HTML
      {
        source: '/(.*)',
        headers: [
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
  i18n: {
    locales: ['default', 'en', 'es', 'de', 'it', 'pl', 'pt', 'sk', 'zh', 'hu', 'ru', 'id', 'tr'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Reduce bundle size by rewriting named imports to per-module paths
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
    'lodash-es': {
      transform: 'lodash-es/{{member}}',
    },
    // Example: import { FaBeer } from 'react-icons/fa' -> 'react-icons/fa/FaBeer'
    'react-icons/?(((\\w*)?/?)*)': {
      transform: 'react-icons/{{ matches.[1] }}/{{ member }}',
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ergo-platform-cms-nvbpfiue6q-ez.a.run.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

let withBundleAnalyzer = (config) => config;
try {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (e) {
  // Optional: bundle analyzer not installed; ignore unless ANALYZE is used
}
module.exports = withBundleAnalyzer(withMDX(nextConfig));
