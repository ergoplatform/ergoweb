const siteUrl = process.env.SITE_URL || 'http://localhost:80';

module.exports = {
  siteUrl: siteUrl,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  alternateRefs: [
    ['en', 'de', 'it', 'hu', 'ru', 'cn']
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
