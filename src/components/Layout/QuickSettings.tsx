import { Flex, Button } from '@chakra-ui/react';
import { IoSunny, IoMoon, IoGlobeOutline } from 'react-icons/io5';

export const QuickSettings = () => {
  console.log('QuickSettings render');
  return (
    <Flex justify="space-between" py={2}>
      <Button leftIcon={<IoSunny />} rightIcon={<IoMoon />} variant="outline">
        /
      </Button>
      <Button leftIcon={<IoGlobeOutline />} variant="outline">
        EN
      </Button>
    </Flex>
  );
};
