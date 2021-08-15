import { Box, Divider, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';

import { TimeEntryRow } from '@/components/Timer';
import { BORDER_COLOR_DARK } from '@/config/constants/layout';

export const TimeEntriesGroup: FC = () => {
  const bg = useColorModeValue('white', BORDER_COLOR_DARK);

  console.log('TimeEntriesGroup render');
  return (
    <Flex direction="column" shadow="md" borderRadius="md" bg={bg}>
      <Flex px={6} py={6} align="center">
        <Heading as="h4" size="lg" color="teal.500">
          Today
        </Heading>
        <Heading ml="auto" as="h4" size="md">
          3:18:36
        </Heading>
        <Box flexBasis="50px" />
      </Flex>
      <TimeEntryRow />
      <Divider />
      <TimeEntryRow />
      <Divider />
      <TimeEntryRow />
      <Divider />
      <TimeEntryRow />
    </Flex>
  );
};
