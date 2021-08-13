import { UseToastOptions } from '@chakra-ui/react';

export const errorToast: UseToastOptions = {
  duration: 9000,
  isClosable: true,
  status: 'error',
};

export const successToast: UseToastOptions = {
  duration: 9000,
  isClosable: true,
  status: 'success',
};
