import { UseToastOptions } from '@chakra-ui/react';

import { ROUTES } from '@/config/constants/routes';

export const toastProps: UseToastOptions = {
  duration: 9000,
  isClosable: true,
};

export const magicLinkToast: UseToastOptions = {
  ...toastProps,
  title: 'Magic link sent.',
  description: 'Tractor have sent magic link to your email address.',
  status: 'success',
};

export const succesLoginToast: UseToastOptions = {
  ...toastProps,
  title: 'Logged In',
  status: 'success',
};

export const errorLoginToast: UseToastOptions = {
  ...toastProps,
  title: 'Error Signing in',
  status: 'error',
};

export const succesRegistrationToast: UseToastOptions = {
  ...toastProps,
  title: 'Registration was successful',
  status: 'success',
};

export const errorRegistrationToast: UseToastOptions = {
  ...toastProps,
  title: 'Sign up error',
  status: 'error',
};

export const linkToRegister = {
  message: `Don't have an account yet?`,
  to: ROUTES.REGISTER,
  title: 'Register',
};

export const linkToLogin = {
  message: `Do you already have an account?`,
  to: ROUTES.LOGIN,
  title: 'Login',
};
