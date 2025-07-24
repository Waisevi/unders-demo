import * as Sentry from '@sentry/nextjs';
import { IS_PRODUCTION } from './src/const/env';

Sentry.init({
  enabled: true,
  environment: IS_PRODUCTION ? import.meta.env.SENTRY_ENV : process.env.SENTRY_ENV,
  dsn: IS_PRODUCTION ? import.meta.env.SENTRY_DSN : process.env.SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
      maxReplayDuration: 5 * 60 * 1000,
    }),
  ],
  tracesSampleRate: IS_PRODUCTION
    ? Number(import.meta.env.SENTRY_PERF_TRACES_SAMPLE_RATE)
    : Number(process.env.SENTRY_PERF_TRACES_SAMPLE_RATE),
  replaysSessionSampleRate: IS_PRODUCTION
    ? Number(import.meta.env.SENTRY_REPLAY_SAMPLE_RATE)
    : Number(process.env.SENTRY_REPLAY_SAMPLE_RATE),
  replaysOnErrorSampleRate: IS_PRODUCTION
    ? Number(import.meta.env.SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE)
    : Number(process.env.SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE),
  normalizeDepth: 5,
});
