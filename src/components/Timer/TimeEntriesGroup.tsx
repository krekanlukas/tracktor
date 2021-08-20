import { Box, Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';

import { CardContainer } from '@/components/Common';
import { formatDateHeading } from '@/components/Timer';

type TimeEntriesGroupProps = {
  groupTitle: string;
  groupDuration: string;
};

export const TimeEntriesGroup: FC<TimeEntriesGroupProps> = ({
  children,
  groupDuration,
  groupTitle,
}) => {
  console.log('TimeEntriesGroup render');
  return (
    <CardContainer>
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
    </CardContainer>
  );
};
