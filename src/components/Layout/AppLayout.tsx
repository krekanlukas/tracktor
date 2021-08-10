import { Flex, Box, useMediaQuery, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';

import { Sidebar, Topbar } from '@/components/Layout/Navigation';
import { SIDEBAR_WIDTH, TOPBAR_HEIGHT } from '@/config/constants/layout';

export const AppLayout: FC = ({ children }) => {
  const [isDesktopView] = useMediaQuery('(min-width: 48em)');
  const bg = useColorModeValue('gray.50', 'gray.700');

  console.log('AppLayout render');
  return (
    <Flex grow={1}>
      {isDesktopView ? <Sidebar /> : <Topbar />}
      <Box
        as={'main'}
        ml={isDesktopView ? SIDEBAR_WIDTH : 0}
        mt={isDesktopView ? 0 : TOPBAR_HEIGHT}
        flexGrow={1}
        bg={bg}
      >
        <Flex justify="center" align="center" h="100%" w="100%">
          {children}
        </Flex>
      </Box>
    </Flex>
  );
};
