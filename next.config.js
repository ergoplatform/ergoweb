/** @type {import('next').NextConfig} */

const path = require('path')
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  i18n: {
    locales: ['en', 'es', 'pt', 'ru', 'it', 'zh'],
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
}

module.exports = withPWA(nextConfig)