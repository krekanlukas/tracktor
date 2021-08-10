import { Flex, Box, useMediaQuery, useColorModeValue } from '@chakra-ui/react';

import { SIDEBAR_WIDTH, TOPBAR_HEIGHT } from './constants';
import { Sidebar, Topbar } from './Navigation';

export function MainLayout() {
  const [isDesktopView] = useMediaQuery('(min-width: 48em)');
  const bg = useColorModeValue('gray.50', 'gray.700');

  console.log('MainLayout render');
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
          App main content
        </Flex>
      </Box>
    </Flex>
  );
}
