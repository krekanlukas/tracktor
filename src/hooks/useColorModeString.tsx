import { useColorMode } from '@chakra-ui/react';

export const useColorModeString = () => {
  const { colorMode } = useColorMode();
  return (color: string) => `${color}.${colorMode === 'light' ? '500' : '200'}`;
};
