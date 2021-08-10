import { Flex, Box, useColorModeValue } from '@chakra-ui/react';

import { TOPBAR_HEIGHT, NAVIGATION_CONTAINER } from '@/components/Layout/constants';
import { Logo, MobileSidebar } from '@/components/Layout/Navigation';

export const Topbar = () => {
  const borderColor = useColorModeValue('gray.100', 'gray.600');

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
    >
      <Box flex={1}>
        <MobileSidebar />
      </Box>
      <Box>
        <Logo />
      </Box>
      <Box flex={1} />
    </Flex>
  );
};
