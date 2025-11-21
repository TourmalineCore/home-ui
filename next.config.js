const withReactSvg = require('next-react-svg');
const path = require('path');

const { i18n } = require('./next-i18next.config');

module.exports = withReactSvg({
  // https://nextjs.org/docs/pages/api-reference/config/next-config-js/headers
  async headers() {
    return [
      // Icons are not cached by default, so we do it manually
      {
        source: "/(apple-touch-icon|favicon-96x96.png|favicon.ico|favicon.svg|web-app-manifest-192x192.png|web-app-manifest-512x512.png|site.webmanifest)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, immutable"
          }
        ]
      },

      {
        source: '/(.*)',
        headers: [
          // 1. CORS headers:

          // Indicates whether the browser should include credentials, such as cookies or HTTP authentication, in the cross-origin request
          {
            key: "Access-Control-Allow-Credentials",
            value: "false",
          },

          // Specifies the origin that has access to the resource
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NODE_ENV === "production"
              ? process.env.CORS_ORIGIN
              : process.env.CORS_ORIGIN || "http://localhost:3000",
          },

          // Indicates how the browser should handle opening new windows and tabs in the context of cross-origin requests
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },


          // 2. Security headers:

          // Prevents the site from being opened in an <iframe> (protection against clickjacking)
          {
            key: 'X-Frame-Options',
            value: "SAMEORIGIN",
          },

          // Prevents MIME-sniffing (e.g., ensuring HTML is not treated as JS)
          {
            key: 'X-Content-Type-Options',
            value: "nosniff",
          },

          // Controls what data goes into the Referer header
          {
            key: 'Referrer-Policy',
            value: "no-referrer",
          },

          // Block access to browser features and APIs
          {
            key: 'Permissions-Policy',
            value: "interest-cohort=(), camera=(), microphone=(), geolocation=(), fullscreen=(), payment=(), usb=(), accelerometer=(), display-capture=(), gyroscope=(), magnetometer=(), midi=(), picture-in-picture=(self), xr-spatial-tracking=()",
          }
        ]
      }
    ]
  },
  devIndicators: false,
  i18n,
  include: path.resolve(__dirname, 'icons'),
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
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/TourmalineCore/**'
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
