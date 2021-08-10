import { Flex } from '@chakra-ui/react';

import { Logo, SidebarContent } from '@/components/Layout/Navigation';

export const Sidebar = () => {
  console.log('Sidebar render');
  return (
    <Flex
      as="nav"
      direction="column"
      w={240}
      h="100vh"
      px={4}
      borderRight="2px"
      borderColor="gray.100"
      position="fixed"
      top="0"
      left="0"
      boxShadow="md"
    >
      <Flex h={16} alignItems="center" justify="center" mb={4}>
        <Logo />
      </Flex>
      <SidebarContent />
    </Flex>
  );
};

export default Sidebar;
