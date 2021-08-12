import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import {
  AuthFormContainer,
  linkToLogin,
  errorRegistrationToast,
  succesRegistrationToast,
} from '@/components/AuthForms';
import { ROUTES } from '@/config/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useBoolean } from '@/hooks/useBoolean';

export const Registration = () => {
  const { t } = useLanguage();
  const { signUp } = useAuth();
  const [showPassword, { toggle: togglePassword }] = useBoolean(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await signUp({ email, password });
      if (error) throw error;
      history.push(ROUTES.HOME);
      toast(succesRegistrationToast);
    } catch (error) {
      setLoading(false);
      setPassword('');
      toast({ ...errorRegistrationToast, description: error.message });
    }
  };

  console.log('Registration render');
  return (
    <AuthFormContainer heading={t('Create account')} link={linkToLogin}>
      <Text mb={8}>
        {t('Do you just want to try Tracktor?')}
        <Link
          as={RouterLink}
          to={{ pathname: ROUTES.LOGIN, state: { magicLink: true } }}
          color="teal"
          ml={1}
        >
          {t('Login via Magic link.')}
        </Link>
      </Text>
      <Box as={'form'} w="full" textAlign="center" onSubmit={handleRegister}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>{t('Email address')}</FormLabel>
            <Input
              type="email"
              focusBorderColor="teal.500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>{t('Password')}</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                pr="4.5rem"
                focusBorderColor="teal.500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button size="xs" colorScheme="teal" onClick={togglePassword}>
                  {showPassword ? t('Hide') : t('Show')}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Stack>
        <Button
          colorScheme="teal"
          type="submit"
          minW={{ base: 'full', md: '50%' }}
          mt={12}
          isLoading={loading}
        >
          {t('Create account')}
        </Button>
      </Box>
    </AuthFormContainer>
  );
};
