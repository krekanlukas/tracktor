import { Flex, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';

import { BORDER_COLOR_DARK } from '@/config/constants/layout';

export const CardContainer: FC = ({ children }) => {
  const bg = useColorModeValue('white', BORDER_COLOR_DARK);
  console.log('CardContainer render');
  return (
    <Flex direction="column" shadow="md" borderRadius="md" bg={bg} minW="full" w="min-content">
      {children}
    </Flex>
  );
};
