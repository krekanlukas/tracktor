import { Flex, Heading } from '@chakra-ui/react';

import { ContentTopbar, EmptyPageMessage } from '@/components/Common';
import { useLanguage } from '@/context/LanguageContext';

export const DashboardPage = () => {
  const { t } = useLanguage();

  console.log('Dashboard render');
  return (
    <Flex direction="column" w="full">
      <ContentTopbar>
        <Heading>Dashboard</Heading>
      </ContentTopbar>
      <Flex align="center" justify="center" grow={1}>
        <EmptyPageMessage info={t('Work in progress.')} />
      </Flex>
    </Flex>
  );
};
