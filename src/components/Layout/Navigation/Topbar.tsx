import { Flex, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';

import { TOPBAR_HEIGHT, NAVIGATION_CONTAINER } from '@/config/constants/layout';

export const Topbar: FC = ({ children }) => {
  const borderColor = useColorModeValue('gray.100', 'gray.600');
  const bg = useColorModeValue('white', 'gray.800');

  console.log('Topbar render');
  return (
    <Flex
      h={TOPBAR_HEIGHT}
      position="fixed"
      top="0"
      left="0"
      borderBottom="2px"
      borderColor={borderColor}
      w="100%"
      boxShadow="sm"
      px={NAVIGATION_CONTAINER}
      align="center"
      zIndex="docked"
      bg={bg}
    >
      {children}
    </Flex>
  );
};
