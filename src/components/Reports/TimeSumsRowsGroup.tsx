import { MinusIcon } from '@chakra-ui/icons';
import { Box, Divider, Text } from '@chakra-ui/react';
import { FC, Fragment } from 'react';

import {
  TimeSumsRow,
  WeekRange,
  getDaysArray,
  mapDurationsWithSum,
  CELL_MIN_WIDTH,
  sumDurations,
  mapDurations,
} from '@/components/Reports';
import { getFormattedDuration } from '@/components/Timer';
import { useBoolean } from '@/hooks/useBoolean';
import { useColorModeString } from '@/hooks/useColorModeString';
import { GroupedTimeEntry } from '@/hooks/useWeeklyReports';

type TimeSumsRowsGroupProps = {
  timeEntries: GroupedTimeEntry[];
  title: string;
  selectedRange: WeekRange;
};

export const TimeSumsRowsGroup: FC<TimeSumsRowsGroupProps> = ({
  timeEntries,
  title,
  selectedRange,
}) => {
  const formatColor = useColorModeString();
  const [isExpanded, { toggle: toggleEntries }] = useBoolean();
  const durations = mapDurationsWithSum(timeEntries, getDaysArray(selectedRange));
  const entriesWithMappedDurations = mapDurations(timeEntries, getDaysArray(selectedRange));

  console.log('TimeSumsRowsGroup render');
  return (
    <>
      <Divider />
      <TimeSumsRow
        buttonText={timeEntries.length}
        onClick={toggleEntries}
        title={
          <>
            <Box
              borderRadius="100%"
              w="10px"
              h="10px"
              bg={formatColor(timeEntries[0].project?.color_variant ?? 'gray')}
              mr={2}
            />
            <Text color={formatColor(timeEntries[0].project?.color_variant ?? 'gray')}>
              {title}
            </Text>
          </>
        }
        total={getFormattedDuration(sumDurations(durations))}
        isExpanded={isExpanded}
      >
        {durations.map((duration, index) => (
          <Box d="flex" key={index} flex="1" minW={CELL_MIN_WIDTH} justifyContent="center">
            {duration ? getFormattedDuration(duration) : <MinusIcon />}
          </Box>
        ))}
      </TimeSumsRow>
      {isExpanded &&
        entriesWithMappedDurations.map((timeEntry) => (
          <Fragment key={timeEntry.id}>
            <Divider />
            <TimeSumsRow
              title={timeEntry.description}
              total={getFormattedDuration(sumDurations(timeEntry.durations))}
              isSubRow
            >
              {timeEntry.durations.map((duration, index) => (
                <Box
                  d="flex"
                  key={`duration_${index}_${timeEntry.id}`}
                  flex="1"
                  minW={CELL_MIN_WIDTH}
                  justifyContent="center"
                >
                  {duration ? getFormattedDuration(duration) : <MinusIcon />}
                </Box>
              ))}
            </TimeSumsRow>
          </Fragment>
        ))}
    </>
  );
};
