import { withSentryConfig } from '@sentry/nextjs';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN || '',
    SENTRY_ENV: process.env.SENTRY_ENV || 'development',
    SENTRY_PERF_TRACES_SAMPLE_RATE: process.env.SENTRY_PERF_TRACES_SAMPLE_RATE || '1',
    SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE: process.env.SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE || '1',
    SENTRY_REPLAY_SAMPLE_RATE: process.env.SENTRY_REPLAY_SAMPLE_RATE || '0',
  },
  output: 'standalone',
  reactStrictMode: true,
  // Разрешить конфликт версий require-in-the-middle из @opentelemetry/instrumentation
  serverExternalPackages: ['require-in-the-middle'],
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'devim',

  project: 'frontend-devim-app',

  sentryUrl: 'https://sentry-dev.devim.team/',

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
});
