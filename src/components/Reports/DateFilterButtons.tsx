import { ArrowBackIcon, ArrowForwardIcon, CalendarIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, IconButton, Stack } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction } from 'react';

import { ReportDatePeriod, WeekRange, getWeekRange, formatWeekRange } from '@/components/Reports';
import { useLanguage } from '@/context/LanguageContext';

type DateFilterButtonsProps = {
  datePeriod: ReportDatePeriod;
  setDatePeriod: Dispatch<SetStateAction<ReportDatePeriod>>;
  selectedRange: WeekRange;
  setSelectedRange: Dispatch<SetStateAction<WeekRange>>;
};

export const DateFilterButtons: FC<DateFilterButtonsProps> = ({
  datePeriod,
  setDatePeriod,
  selectedRange,
  setSelectedRange,
}) => {
  const { t } = useLanguage();

  console.log('DateFilterButtons render');
  return (
    <Box px={6}>
      <Stack mt={6} spacing={3} direction="row">
        <Button
          variant={datePeriod === 'Monthly' ? 'solid' : 'outline'}
          colorScheme="teal"
          onClick={() => setDatePeriod('Monthly')}
          isDisabled
        >
          {t('Monthly')}
        </Button>
        <Button
          variant={datePeriod === 'Weekly' ? 'solid' : 'outline'}
          colorScheme="teal"
          onClick={() => setDatePeriod('Weekly')}
        >
          {t('Weekly')}
        </Button>
        <Button
          variant={datePeriod === 'Daily' ? 'solid' : 'outline'}
          colorScheme="teal"
          onClick={() => setDatePeriod('Daily')}
          isDisabled
        >
          {t('Daily')}
        </Button>
      </Stack>
      <ButtonGroup isAttached variant="outline" mt={6}>
        <IconButton
          aria-label="Previous"
          icon={<ArrowBackIcon />}
          colorScheme="teal"
          onClick={() =>
            setSelectedRange((previousRange) => getWeekRange(previousRange.firstDay, 'previous'))
          }
        />
        <Button aria-label="Calendar" leftIcon={<CalendarIcon />} colorScheme="teal" isDisabled>
          {formatWeekRange(selectedRange)}
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
