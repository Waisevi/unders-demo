import { withSentryConfig } from '@sentry/nextjs';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

const sentryWebpackPluginOptions = {
  silent: true,
};

export default withVanillaExtract(withSentryConfig(nextConfig, sentryWebpackPluginOptions));
