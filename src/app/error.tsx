'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

/**
 * Error boundary component
 * Replaces pages/_error.tsx
 * Catches errors in the app directory
 */
const ErrorBoundary = ({
  error,
  reset,
}: {
  error: { digest?: string } & Error;
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default ErrorBoundary;
