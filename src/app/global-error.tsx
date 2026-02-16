'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

/**
 * Global error boundary component
 * Catches errors in the root layout
 * Must include html and body tags
 */
const GlobalError = ({
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
    <html lang='en'>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
};

export default GlobalError;
