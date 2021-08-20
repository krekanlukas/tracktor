import { QuestionIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Switch,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { AuthFormContainer, linkToRegister } from '@/components/AuthForms';
import { ROUTES } from '@/config/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useBoolean, useCustomToast } from '@/hooks';

type LocationState = {
  magicLink: boolean;
};

export const Login = () => {
  const { t } = useLanguage();
  const { signIn } = useAuth();
  const [isMagicLink, setIsMagicLink] = useState(false);
  const [showPassword, { toggle: togglePassword }] = useBoolean(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { state } = useLocation<LocationState>();
  const { errorToast, successToast } = useCustomToast();
  const history = useHistory();

  useEffect(() => {
    setIsMagicLink(state?.magicLink ?? false);
    console.log('Login commit');
  }, [state]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const signInData = isMagicLink ? { email } : { email, password };
      const { error } = await signIn(signInData);
      if (error) throw error;
      isMagicLink
        ? successToast(
            t('Magic link sent.'),
            t('Tracktor have sent magic link to your email address.')
          )
        : successToast(t('Logged In'));
      history.push(ROUTES.HOME);
    } catch (error) {
      console.log(error);
      setLoading(false);
      errorToast(t('Error Signing in'), error.message);
    }
  };

  console.log('Login render');
  return (
    <AuthFormContainer heading={t('Login')} link={linkToRegister}>
      <Box as={'form'} w="full" textAlign="center" onSubmit={handleLogin}>
        <Stack spacing={4}>
          <FormControl id="magic-link" d="flex" alignItems="center">
            <FormLabel d="flex" alignItems="center">
              {t('Sign in with magic link.')}
              <Tooltip
                aria-label="A tooltip"
                label={t(
                  'Special link send to your email address which is used to passwordless login for one session.'
                )}
                fontSize="sm"
              >
                <QuestionIcon ml={1} />
              </Tooltip>
            </FormLabel>
            <Switch
              id="magic-link"
              colorScheme="teal"
              isChecked={isMagicLink}
              onChange={() => setIsMagicLink((previousValue) => !previousValue)}
              mb={2}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>{t('Email address')}</FormLabel>
            <Input
              type="email"
              focusBorderColor="teal.500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isMagicLink && (
              <FormHelperText>
                {t(
                  `Warning. If you use this option you can't create account with given email address.`
                )}
              </FormHelperText>
            )}
          </FormControl>
          {!isMagicLink && (
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
          )}
        </Stack>
        <Button
          colorScheme="teal"
          type="submit"
          minW={{ base: 'full', md: '50%' }}
          mt={12}
          isLoading={loading}
        >
          {isMagicLink ? t('Send magic link') : t('Login')}
        </Button>
      </Box>
    </AuthFormContainer>
  );
};
