import { Box, Stack } from '@chakra-ui/react';

import { TimerActions } from '@/components/Timer';

export const TimerPage = () => {
  console.log('TimerPage render');
  return (
    <Box w="full">
      <TimerActions />
      <Stack direction="column" spacing={12} mt={12} px={6}>
        {/* <TimeEntriesGroup />
        <TimeEntriesGroup />
        <TimeEntriesGroup />
        <TimeEntriesGroup />
        <TimeEntriesGroup /> */}
      </Stack>
    </Box>
  );
};
