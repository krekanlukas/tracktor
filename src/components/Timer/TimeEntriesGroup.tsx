import { Box, Divider, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { FC, Fragment } from 'react';

import {
  TimeEntryRow,
  formatDateHeading,
  sumDurations,
  getFormattedDuration,
} from '@/components/Timer';
import { BORDER_COLOR_DARK } from '@/config/constants/layout';
import { TimeEntryDbRow } from '@/hooks/useInsertRow';

type TimeEntriesGroupProps = {
  timeEntries: TimeEntryDbRow[];
  groupTitle: string;
};

export const TimeEntriesGroup: FC<TimeEntriesGroupProps> = ({ timeEntries, groupTitle }) => {
  const bg = useColorModeValue('white', BORDER_COLOR_DARK);

  console.log('TimeEntriesGroup render');
  return (
    <Flex direction="column" shadow="md" borderRadius="md" bg={bg}>
      <Flex px={6} py={6} align="center">
        <Heading as="h4" size="lg" color="teal.500">
          {formatDateHeading(groupTitle)}
        </Heading>
        <Heading ml="auto" as="h4" size="md">
          {getFormattedDuration(sumDurations(timeEntries))}
        </Heading>
        <Box flexBasis="50px" />
      </Flex>
      {timeEntries.map((timeEntry, index) => (
        <Fragment key={timeEntry.id}>
          <TimeEntryRow timeEntry={timeEntry} />
          {index !== timeEntries.length - 1 && <Divider />}
        </Fragment>
      ))}
    </Flex>
  );
};
