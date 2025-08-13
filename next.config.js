/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  async redirects() {
    return [
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
    ];
  },
  reactStrictMode: true,
  trailingSlash: true,
  compress: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  webpack: (config, { isServer }) => {
    // For client-side bundles, ensure source maps are generated
    if (!isServer) {
      config.devtool = 'source-map';
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' ${
              process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''
            }; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://storage.googleapis.com; media-src 'self' blob:; connect-src 'self' https://api.ergoplatform.com https://ergo-platform-cms-nvbpfiue6q-ez.a.run.app https://storage.googleapis.com; frame-src 'self' https://docs.google.com; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'`,
          },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  i18n: {
    locales: [
      'default',
      'en',
      //'es',
      'de',
      'it',
      //'pt',
      'hu',
      'ru',
      'cn',
      'id',
      // 'hi',
      'tr',
      // 'ro',
      // 'sk',
      // 'zh',
    ],
    defaultLocale: 'default',
    localeDetection: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['storage.googleapis.com', 'ergo-platform-cms-nvbpfiue6q-ez.a.run.app'],
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

module.exports = withMDX(nextConfig);
