import { Center, Spinner } from '@chakra-ui/react';

export const LoadingFallback = () => {
  return (
    <Center>
      <Spinner color="teal" size="lg" />
    </Center>
  );
};
