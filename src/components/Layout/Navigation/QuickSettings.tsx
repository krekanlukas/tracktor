import {
  Flex,
  Button,
  Icon,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useColorMode,
} from '@chakra-ui/react';
import { IoSunny, IoMoon, IoGlobeOutline } from 'react-icons/io5';

export const QuickSettings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log('QuickSettings render');
  return (
    <Flex justify="space-between" py={2}>
      <Button
        leftIcon={<Icon as={IoSunny} opacity={colorMode === 'light' ? 1 : 0.4} boxSize="1.5em" />}
        rightIcon={<Icon as={IoMoon} opacity={colorMode === 'light' ? 0.4 : 1} boxSize="1.5em" />}
        variant="outline"
        onClick={toggleColorMode}
      >
        /
      </Button>
      <Menu placement="top">
        <MenuButton
          as={Button}
          leftIcon={<Icon as={IoGlobeOutline} boxSize="1.5em" />}
          variant="outline"
        >
          EN
        </MenuButton>
        <MenuList minWidth={36}>
          <MenuItem justifyContent="center">English</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
