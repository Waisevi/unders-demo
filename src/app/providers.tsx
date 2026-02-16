'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { muiTheme } from '@/styles/theme/mui-theme';

/**
 * Client-side providers wrapper
 * Handles MSW initialization and provides React Query, and MUI theme
 */
export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useRef(new QueryClient());

  useEffect(() => {
    // Initialize MSW only on client side after mount to avoid hydration issues
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      import('@/mocks/browser')
        .then((module) => {
          return module?.worker?.start?.();
        })
        .catch((error) => {
          console.error('Failed to start MSW worker:', error);
        });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient.current}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </QueryClientProvider>
  );
};
