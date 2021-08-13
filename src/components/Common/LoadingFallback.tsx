import { Center, Spinner } from '@chakra-ui/react';

export const LoadingFallback = () => {
  return (
    <Center m="auto">
      <Spinner color="teal" size="lg" />
    </Center>
  );
};
