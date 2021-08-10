import { Flex, Image, Box, Heading } from '@chakra-ui/react';

import logo from '@/assets/logo.svg';

export const Logo = () => {
  console.log('Logo render');
  return (
    <Flex align="center" justify="center">
      <Image h="32px" w="auto" src={logo} alt="" />
      <Box ml="8px">
        <Heading size="md" color="teal">
          TRACKtor
        </Heading>
      </Box>
    </Flex>
  );
};
