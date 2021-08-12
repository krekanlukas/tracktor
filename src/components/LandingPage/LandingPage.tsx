import { Button, Container, Box, Flex, Heading, Image, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import tractor from '@/assets/tractor.png';
import { ROUTES } from '@/config/constants/routes';
import { useLanguage } from '@/context/LanguageContext';

export const LandingPage = () => {
  const { t } = useLanguage();

  console.log('LandingPage render');
  return (
    <Flex grow={1} align={{ base: 'center' }} maxW="100vw">
      <Container
        maxW="container.xl"
        p={0}
        d="flex"
        flexDirection={{ base: 'column-reverse', md: 'row' }}
        align={{ base: 'center', md: 'flex-start' }}
      >
        <Stack
          direction="column"
          justify="center"
          flex="1"
          spacing={10}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Heading color="teal" size="2xl">
            {t('Time tracking for better work.')}
          </Heading>
          <Heading size="md">
            {t(
              'Tracktor is time tracking web app for individuals. Register and see what Tracktor can do.'
            )}
          </Heading>
          <Stack
            direction="row"
            spacing={{ base: 0, md: 6 }}
            flexWrap="wrap"
            justifyContent={{ base: 'space-evenly', md: 'flex-start' }}
          >
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
