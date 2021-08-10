import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';

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

export const AppProviders: React.FC = ({ children }) => {
  console.log('App providers render');
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <LanguageProvider>
          <Router>{children}</Router>
        </LanguageProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
};
