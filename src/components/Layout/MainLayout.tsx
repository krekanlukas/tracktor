import { Flex, Box, useMediaQuery } from '@chakra-ui/react';

import { Sidebar, Topbar } from './Navigation';

export function MainLayout() {
  const [isDesktopView] = useMediaQuery('(min-width: 48em)');
  console.log('MainLayout render');
  return (
    <Flex grow={1}>
      {isDesktopView ? <Sidebar /> : <Topbar />}
      <Box
        as={'main'}
        ml={isDesktopView ? 240 : 0}
        mt={isDesktopView ? 0 : 16}
        flexGrow={1}
        bg="gray.50"
      >
        <Flex justify="center" align="center" h="100%" w="100%">
          App main content
        </Flex>
      </Box>
    </Flex>
  );
}
