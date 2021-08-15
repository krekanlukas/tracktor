import { Box, Stack } from '@chakra-ui/react';

import { LoadingFallback } from '@/components/Common';
import { TimerActions, TimeEntriesGroup } from '@/components/Timer';
import { useSortedTimeEntries } from '@/hooks/useSortedTimeEntries';

export const TimerPage = () => {
  const { sortedTimeEntries, isLoading } = useSortedTimeEntries();
  console.log('TimerPage render', sortedTimeEntries);
  return (
    <Box w="full">
      <TimerActions />
      <Stack direction="column" spacing={12} my={12} px={6} minH="200px">
        {isLoading ? (
          <LoadingFallback />
        ) : (
          sortedTimeEntries &&
          Object.entries(sortedTimeEntries).map(([key, timeEntries]) => (
            <TimeEntriesGroup key={key} groupTitle={key} timeEntries={timeEntries} />
          ))
        )}
      </Stack>
    </Box>
  );
};
