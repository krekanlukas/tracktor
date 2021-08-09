import { Flex, Container } from '@chakra-ui/react';

import Sidebar from './Sidebar';

export function MainLayout() {
  console.log('MainLayout render');
  return (
    <Flex grow={1}>
      <Sidebar />
      <Container as={'main'}>
        <Flex justify="center" align="center" h="100%">
          App main content
        </Flex>
      </Container>
    </Flex>
  );
}
