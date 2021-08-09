import {
  Text,
  Flex,
  Avatar,
  Box,
  Button,
  Menu,
  MenuDivider,
  MenuList,
  MenuItem,
  MenuButton,
} from '@chakra-ui/react';

export const UserInfoMenu = () => {
  console.log('UserInfoMenu render');
  return (
    <Menu placement="right-start" offset={[0, -15]} closeOnBlur={true}>
      <MenuButton as={Button} w="100%" h="100%" py="8px" variant="outline">
        <Flex>
          <Box textAlign="left">
            <Text>Meno Priezvisko</Text>
            <Text isTruncated color="gray.500">
              Email
            </Text>
          </Box>
          <Avatar name="Lukinho Krekinho" ml="auto" />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>Profile settings</MenuItem>
        <MenuDivider />
        <MenuItem>Log out</MenuItem>
      </MenuList>
    </Menu>
  );
};
