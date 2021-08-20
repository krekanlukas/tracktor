import { Flex, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';

import {
  TOPBAR_HEIGHT,
  NAVIGATION_CONTAINER,
  BORDER_WIDTH,
  BORDER_COLOR_LIGHT,
  BORDER_COLOR_DARK,
} from '@/config/constants/layout';

export const Topbar: FC = ({ children }) => {
  const borderColor = useColorModeValue(BORDER_COLOR_LIGHT, BORDER_COLOR_DARK);
  const bg = useColorModeValue('white', 'gray.800');

  console.log('Topbar render');
  return (
    <Flex
      h={TOPBAR_HEIGHT}
      position="fixed"
      top="0"
      left="0"
      borderBottom={BORDER_WIDTH}
      borderColor={borderColor}
      w="100vw"
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
