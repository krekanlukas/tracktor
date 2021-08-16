import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';

import { formatDateHeading } from '@/components/Timer';
import { BORDER_COLOR_DARK } from '@/config/constants/layout';

type TimeEntriesGroupProps = {
  groupTitle: string;
  groupDuration: string;
};

export const TimeEntriesGroup: FC<TimeEntriesGroupProps> = ({
  children,
  groupDuration,
  groupTitle,
}) => {
  const bg = useColorModeValue('white', BORDER_COLOR_DARK);

  console.log('TimeEntriesGroup render');
  return (
    <Flex direction="column" shadow="md" borderRadius="md" bg={bg}>
      <Flex px={6} py={6} align="center">
        <Heading as="h4" size="lg" color="teal.500">
          {formatDateHeading(groupTitle)}
        </Heading>
        <Heading ml="auto" as="h4" size="md">
          {groupDuration}
        </Heading>
        <Box flexBasis="50px" />
      </Flex>
      {children}
    </Flex>
  );
};
