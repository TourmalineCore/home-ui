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
    ]
  },
  env: {
    METRICS_ENABLED: process.env.METRICS_ENABLED,
  },

  output: "standalone",
  
  webpack(webpackConfig) {
    webpackConfig.resolve.fallback = { fs: false };

    return webpackConfig;
  },
});
