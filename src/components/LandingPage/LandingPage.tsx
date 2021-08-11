import { Button, Container, Box, Flex, Heading, Image, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import tractor from '@/assets/tractor.png';
import { TOPBAR_HEIGHT } from '@/config/constants/layout';
import { ROUTES } from '@/config/constants/routes';
import { useLanguage } from '@/context/LanguageContext';

export const LandingPage = () => {
  const { t } = useLanguage();

  console.log('LandingPage render');
  return (
    <Flex grow={1} align={{ base: 'center' }}>
      <Container
        maxW="container.xl"
        maxH={{ base: `calc(100vh - ${TOPBAR_HEIGHT * 4}px)` }}
        py={4}
        d="flex"
        flexDirection={{ base: 'column-reverse', md: 'row' }}
        overflow="auto"
      >
        <Stack direction="column" justify="center" flex="1" spacing={10}>
          <Heading color="teal" size="3xl">
            {t('Time tracking for better work.')}
          </Heading>
          <Heading size="md">
            {t(
              'Tracktor is time tracking web app for individuals. Register and see what Tracktor can do.'
            )}
          </Heading>
          <Stack direction="row" spacing={6}>
            <Link to={ROUTES.LOGIN}>
              <Button colorScheme="teal" size="lg">
                {t('Login')}
              </Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button colorScheme="teal" size="lg" variant="outline">
                {t('Registration')}
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Box flex="1" w={{ base: '3xs', md: 'auto' }} alignSelf={{ base: 'center' }}>
          <Image src={tractor} alt="tractor logo" ml="auto" />
        </Box>
      </Container>
    </Flex>
  );
};
