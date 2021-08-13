import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import theme from '@/utils/theme';

const ErrorFallback = () => {
  return (
    <div style={{ textAlign: 'center', margin: 'auto' }}>
      <h1>Something went wrong!</h1>
      <button onClick={() => window.location.assign(window.location.origin)}>Refresh</button>
    </div>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProviders: React.FC = ({ children }) => {
  console.log('App providers render');
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <AuthProvider>
            <LanguageProvider>
              <Router>{children}</Router>
            </LanguageProvider>
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
