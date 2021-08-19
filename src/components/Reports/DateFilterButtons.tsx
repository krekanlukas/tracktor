import { ArrowBackIcon, ArrowForwardIcon, CalendarIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, IconButton, Stack } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction } from 'react';

import { ReportView, WeekRange, getWeekRange, formatWeekRange } from '@/components/Reports';
import { useLanguage } from '@/context/LanguageContext';

type DateFilterButtonsProps = {
  reportView: ReportView;
  setReportView: Dispatch<SetStateAction<ReportView>>;
  selectedRange: WeekRange;
  setSelectedRange: Dispatch<SetStateAction<WeekRange>>;
};

export const DateFilterButtons: FC<DateFilterButtonsProps> = ({
  reportView,
  setReportView,
  selectedRange,
  setSelectedRange,
}) => {
  const { t } = useLanguage();

  console.log('DateFilterButtons render');
  return (
    <Box px={6}>
      <Stack
        mt={6}
        spacing={3}
        direction="row"
        justifyContent={{ base: 'center', md: 'flex-start' }}
      >
        <Button
          variant={reportView === 'Summary' ? 'solid' : 'outline'}
          colorScheme="teal"
          onClick={() => setReportView('Summary')}
          isDisabled
        >
          {t('Summary')}
        </Button>
        <Button
          variant={reportView === 'Details' ? 'solid' : 'outline'}
          colorScheme="teal"
          onClick={() => setReportView('Details')}
        >
          {t('Details')}
        </Button>
      </Stack>
      <ButtonGroup
        isAttached
        variant="outline"
        mt={6}
        justifyContent={{ base: 'center', md: 'flex-start' }}
        w={{ base: 'full' }}
      >
        <IconButton
          aria-label="Previous"
          icon={<ArrowBackIcon />}
          colorScheme="teal"
          onClick={() =>
            setSelectedRange((previousRange) => getWeekRange(previousRange.firstDay, 'previous'))
          }
        />
        <Button aria-label="Calendar" leftIcon={<CalendarIcon />} colorScheme="teal" isDisabled>
          {t(formatWeekRange(selectedRange))}
        </Button>
        <IconButton
          aria-label="Next"
          icon={<ArrowForwardIcon />}
          colorScheme="teal"
          onClick={() =>
            setSelectedRange((previousRange) => getWeekRange(previousRange.firstDay, 'next'))
          }
        />
      </ButtonGroup>
    </Box>
  );
};
