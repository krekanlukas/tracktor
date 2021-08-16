import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { CardContainer } from '@/components/Common';
import { getWeekDays } from '@/components/Reports';
import { useLanguage } from '@/context/LanguageContext';

export const ReportsData: FC = ({ children }) => {
  const { t, selectedLanguage } = useLanguage();

  console.log('ReportsData render');
  return (
    <Box px={6} mt={6}>
      <CardContainer>
        <Flex p={3} align="center">
          <IconButton
            variant="outline"
            aria-label="collapse"
            icon={<ChevronDownIcon />}
            size="xs"
          />
          <Box minW="220px" ml={6}>
            <Text>{t('Title')}</Text>
          </Box>
          <Stack flexGrow={1} direction="row" spacing={6}>
            {getWeekDays(selectedLanguage).map((day) => (
              <Box key={day} flex="1" minW="70px">
                {day}
              </Box>
            ))}
            <Box flex="1" minW="70px">
              <Text>{t('Total')}</Text>
            </Box>
          </Stack>
        </Flex>
        {children}
      </CardContainer>
    </Box>
  );
};
