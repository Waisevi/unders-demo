import * as Sentry from '@sentry/nextjs';

export const TestSentryButton = () => {
  const handleClick = () => {
    try {
      throw new Error('🧨 Test Sentry error from frontend');
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return <button onClick={handleClick}>Test Sentry</button>;
};
