const siteUrl = process.env.SITE_URL || 'https://ergoplatform.org';

module.exports = {
  siteUrl: siteUrl,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  alternateRefs: [
    ['en', 'cn', 'de', 'it', 'hu', 'ru'] //, 'pt', 'es'
      .filter((locale) => locale !== 'default')
      .map((locale) => ({ href: `${siteUrl}/${locale}`, hreflang: locale })),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
