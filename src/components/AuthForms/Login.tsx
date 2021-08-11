import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';

import { AuthFormContainer } from '@/components/AuthForms';
import { ROUTES } from '@/config/constants/routes';
import { useLanguage } from '@/context/LanguageContext';
import { useBoolean } from '@/hooks/useBoolean';

export const Login = () => {
  const { t } = useLanguage();
  const [showPassword, { toggle: togglePassword }] = useBoolean(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
  };

  const link = {
    message: t(`Don't have an account yet?`),
    to: ROUTES.REGISTER,
    title: t('Register'),
  };

  console.log('Login render');
  return (
    <AuthFormContainer heading={t('Login')} link={link}>
      <Box as={'form'} w="full" textAlign="center" onSubmit={handleSubmit}>
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
        <Button colorScheme="teal" type="submit" minW={{ base: 'full', md: '50%' }} mt={12}>
          {t('Login')}
        </Button>
      </Box>
    </AuthFormContainer>
  );
};
