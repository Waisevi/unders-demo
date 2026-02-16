import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

// Custom error class for Sentry testing
class SentryExampleAPIError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = 'SentryExampleAPIError';
  }
}

/**
 * Route handler for Sentry example API
 * Replaces pages/api/sentry-example-api.ts
 */
export async function GET() {
  try {
    throw new SentryExampleAPIError(
      'This error is raised on the backend called by the example page.',
    );
  } catch (error) {
    // Capture error with Sentry
    Sentry.captureException(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
