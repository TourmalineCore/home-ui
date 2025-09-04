module.exports = {
  siteUrl: `https://tourmalinecore.com`,
  generateRobotsTxt: true,
  exclude: [`/server-sitemap.xml`], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: `*`,
        disallow: [`/components`],
      },
    ],
  },
};
