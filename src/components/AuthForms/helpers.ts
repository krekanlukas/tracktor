import { ROUTES } from '@/config/constants/routes';

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
