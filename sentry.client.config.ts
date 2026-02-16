import * as Sentry from '@sentry/nextjs';

import { IS_PRODUCTION } from './src/const/env';

Sentry.init({
  dsn: IS_PRODUCTION ? import.meta.env.SENTRY_DSN : process.env.SENTRY_DSN,
  enabled: true,
  environment: IS_PRODUCTION ? import.meta.env.SENTRY_ENV : process.env.SENTRY_ENV,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      blockAllMedia: true,
      maskAllText: true,
      maxReplayDuration: 5 * 60 * 1000,
    }),
  ],
  normalizeDepth: 5,
  replaysOnErrorSampleRate: IS_PRODUCTION
    ? Number(import.meta.env.NEXT_PUBLIC_SENTRY_REPLAY_SAMPLE_RATE)
    : Number(process.env.NEXT_PUBLIC_SENTRY_REPLAY_SAMPLE_RATE),
  replaysSessionSampleRate: IS_PRODUCTION
    ? Number(import.meta.env.NEXT_PUBLIC_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE)
    : Number(process.env.NEXT_PUBLIC_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE),
  tracesSampleRate: IS_PRODUCTION
    ? Number(import.meta.env.NEXT_PUBLIC_SENTRY_PERF_TRACES_SAMPLE_RATE)
    : Number(process.env.NEXT_PUBLIC_SENTRY_PERF_TRACES_SAMPLE_RATE),
});
