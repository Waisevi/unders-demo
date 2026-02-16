import { SentryExamplePageClient } from './sentry-example-page-client';

import type { Metadata } from 'next';

/**
 * Page metadata
 */
export const metadata: Metadata = {
  description: 'Test Sentry for your Next.js app!',
  title: 'sentry-example-page',
};

/**
 * Sentry example page
 * Server Component that wraps the client component
 */
const SentryExamplePage = () => {
  return <SentryExamplePageClient />;
};

export default SentryExamplePage;
