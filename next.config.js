const withReactSvg = require('next-react-svg');
const path = require('path');

const { i18n } = require('./next-i18next.config');

module.exports = withReactSvg({
  devIndicators: false,
  i18n,
  include: path.resolve(__dirname, 'icons'),
  images: {
    domains: ['raw.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'minio-s3',
      },
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
      },
    ]
  },
  env: {
    METRICS_ENABLED: process.env.METRICS_ENABLED,
  },

  ...(process.env.CDN_ENABLED === 'true' && process.env.CDN_DOMAIN && {
    // https://nextjs.org/docs/app/api-reference/config/next-config-js/assetPrefix
    // asset prefix for JavaScript and CSS files that it loads from /_next/
    assetPrefix: `https://${process.env.CDN_DOMAIN}`
  }),

  output: "standalone",

  images: {
    ...(process.env.CDN_ENABLED === 'true' && process.env.CDN_DOMAIN && {
      // https://nextjs.org/docs/app/api-reference/components/image#domains
      domains: [process.env.CDN_DOMAIN],
      path: `https://${process.env.CDN_DOMAIN}/_next/image`
    }),

    // lifetime in seconds for cached optimized images
    // https://nextjs.org/docs/pages/api-reference/components/image#minimumcachettl
    // 1 hour
    minimumCacheTTL: 3600,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'minio-s3',
      },
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',

        // Todo: need specify production bucket name 
        // pathname: '/bucketName/**',
      },
      ...(process.env.CDN_ENABLED === 'true' && process.env.CDN_DOMAIN ? [
        {
          protocol: 'https',
          hostname: process.env.CDN_DOMAIN,
          pathname: '/_next/**'
        }
      ] : [])
    ]
  },
  
  webpack(webpackConfig) {
    webpackConfig.resolve.fallback = { fs: false };

    return webpackConfig;
  },
});
