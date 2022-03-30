/** @type {import('next').NextConfig} */

const path = require('path')
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  i18n: {
    locales: [
    'en',
    'es',
    // 'de',
    // 'fr',
    // 'hi',
    // 'it',
    // 'tr',
    // 'pt',
    // 'ro',
    // 'sk',
    // 'zh',
  ],
    defaultLocale: 'en',
    localeDetection: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: ['storage.googleapis.com'],
  },
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

module.exports = withPWA(withMDX(nextConfig))