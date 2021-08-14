import { Box, Stack } from '@chakra-ui/react';

import { ContentTopbar } from '@/components/Common';
import { ProgressBar, TimeEntriesGroup, NewTimeEntry } from '@/components/Timer';

export const TimerPage = () => {
  console.log('TimerPage render');
  return (
    <Box w="full">
      <ContentTopbar>
        <NewTimeEntry />
      </ContentTopbar>
      <ProgressBar
        tasks={[{ percentage: 50, title: 'polovica', colorVariant: 'green', duration: 15000 }]}
      />
      <Stack direction="column" spacing={12} mt={12}>
        <TimeEntriesGroup />
        <TimeEntriesGroup />
        <TimeEntriesGroup />
        <TimeEntriesGroup />
        <TimeEntriesGroup />
      </Stack>
    </Box>
  );
};
