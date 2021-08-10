import { Flex, Box, useColorModeValue } from '@chakra-ui/react';

import { Logo, MobileSidebar } from '@/components/Layout/Navigation';

export const Topbar = () => {
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  console.log('Topbar render');
  return (
    <Flex
      h={16}
      position="fixed"
      top="0"
      left="0"
      borderBottom="2px"
      borderColor={borderColor}
      w="100%"
      boxShadow="sm"
      px={4}
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
