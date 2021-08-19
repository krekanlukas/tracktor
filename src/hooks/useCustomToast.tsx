import { useToast, UseToastOptions } from '@chakra-ui/react';
import { useCallback } from 'react';

const toastProps: UseToastOptions = {
  duration: 9000,
  isClosable: true,
};

export const useCustomToast = () => {
  const toast = useToast();

  const errorToast = useCallback(
    (title?: string, description?: string) => {
      toast({ ...toastProps, status: 'error', title, description });
    },
    [toast]
  );

  const successToast = useCallback(
    (title?: string, description?: string) => {
      toast({ ...toastProps, status: 'success', title, description });
    },
    [toast]
  );

  return { errorToast, successToast };
};
