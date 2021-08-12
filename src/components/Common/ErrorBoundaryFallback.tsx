import { Flex, Heading } from '@chakra-ui/react';

import { useLanguage } from '@/context/LanguageContext';

export const ErrorBoundaryFallback = () => {
  const { t } = useLanguage();

  console.log('ErrorBoundary render');
  return (
    <Flex align="center" justify="center" direction="column" my={'auto'}>
      <Heading color="teal" size="lg">
        {t('There was an error loading this page.')}
      </Heading>
    </Flex>
  );
};
