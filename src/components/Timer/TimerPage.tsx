import { Box } from '@chakra-ui/react';

import { TimerActions, TimerData } from '@/components/Timer';

export const TimerPage = () => {
  console.log('TimerPage render');
  return (
    <Box w="full">
      <TimerActions />
      <TimerData />
    </Box>
  );
};
