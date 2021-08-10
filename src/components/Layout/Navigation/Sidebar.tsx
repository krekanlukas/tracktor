import { Flex, useColorModeValue } from '@chakra-ui/react';

import { Logo, SidebarContent } from '@/components/Layout/Navigation';
import { SIDEBAR_WIDTH, TOPBAR_HEIGHT, NAVIGATION_CONTAINER } from '@/config/constants/layout';

export const Sidebar = () => {
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  console.log('Sidebar render');
  return (
    <Flex
      as="nav"
      direction="column"
      w={SIDEBAR_WIDTH}
      h="100vh"
      px={NAVIGATION_CONTAINER}
      borderRight="2px"
      borderColor={borderColor}
      position="fixed"
      top="0"
      left="0"
      boxShadow="md"
    >
      <Flex h={TOPBAR_HEIGHT} alignItems="center" justify="center" mb={4}>
        <Logo />
      </Flex>
      <SidebarContent />
    </Flex>
  );
};

export default Sidebar;
