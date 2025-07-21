import { withSentryConfig } from '@sentry/nextjs';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    SENTRY_ENV: process.env.SENTRY_ENV || 'development',
    SENTRY_DSN: process.env.SENTRY_DSN || '',
    SENTRY_REPLAY_SAMPLE_RATE: process.env.SENTRY_REPLAY_SAMPLE_RATE || '0',
    SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE: process.env.SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE || '1',
    SENTRY_PERF_TRACES_SAMPLE_RATE: process.env.SENTRY_PERF_TRACES_SAMPLE_RATE || '1',
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

export default withVanillaExtract(withSentryConfig(nextConfig, sentryWebpackPluginOptions));
