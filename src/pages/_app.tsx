import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRef } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = useRef(new QueryClient());

  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    import('@/mocks/browser')
      .then((module) => {
        return module?.worker?.start?.();
      })
      .catch((err) => {
        console.error('Failed to start MSW worker:', err);
      });
  }

  return (
    <QueryClientProvider client={queryClient.current}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
