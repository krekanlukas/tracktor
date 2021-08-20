import { Flex, Image, Box, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import logo from '@/assets/logo.svg';
import { ROUTES } from '@/config/constants/routes';

type LogoProps = {
  showImage?: boolean;
};

export const Logo = ({ showImage = true }: LogoProps) => {
  console.log('Logo render');
  return (
    <Flex align="center" justify="center">
      <Link
        as={RouterLink}
        to={ROUTES.HOME}
        d="flex"
        alignItems="center"
        _hover={{ textDecoration: 'none' }}
      >
        {showImage && <Image h="32px" w="auto" src={logo} alt="" />}
        <Box ml="8px">
          <Heading size="md" color="teal">
            TRACKtor
          </Heading>
        </Box>
      </Link>
    </Flex>
  );
};
