import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { CardContainer } from '@/components/Common';
import { getWeekDays, CELL_MIN_WIDTH, TimeSumsRow } from '@/components/Reports';
import { useLanguage } from '@/context/LanguageContext';

export const TimeSumsTable: FC = ({ children }) => {
  const { t, selectedLanguage } = useLanguage();

  console.log('TimeSumsTable render');
  return (
    <Box px={6} mt={6} overflow="auto">
      <CardContainer>
        <TimeSumsRow title={<Text>{t('Title')}</Text>} total={t('Total')}>
          {getWeekDays(selectedLanguage).map((day) => (
            <Box d="flex" key={day} flex="1" minW={CELL_MIN_WIDTH} justifyContent="center">
              {day}
            </Box>
          ))}
        </TimeSumsRow>
        {children}
      </CardContainer>
    </Box>
  );
};
