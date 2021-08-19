import { Flex, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';

import {
  BORDER_COLOR_DARK,
  BORDER_COLOR_LIGHT,
  BORDER_WIDTH,
  TOPBAR_HEIGHT,
} from '@/config/constants/layout';

export const ContentTopbar: FC = ({ children }) => {
  const borderColor = useColorModeValue(BORDER_COLOR_LIGHT, BORDER_COLOR_DARK);
  console.log('ContentTopbar render');
  return (
    <Flex
      h={'min-content'}
      minH={TOPBAR_HEIGHT}
      borderBottom={BORDER_WIDTH}
      borderColor={borderColor}
      px={6}
      align="center"
    >
      {children}
    </Flex>
  );
};
