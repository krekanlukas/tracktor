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

import { useLanguage } from '@/context/LanguageContext';

export const UserInfoMenu = () => {
  const { t } = useLanguage();
  console.log('UserInfoMenu render');
  return (
    <Menu placement="top">
      <MenuButton as={Button} w="100%" h="100%" py="8px" variant="outline">
        <Flex>
          <Box textAlign="left">
            <Text>Name Surename</Text>
            <Text isTruncated color="gray.500">
              Email
            </Text>
          </Box>
          <Avatar name="Lukinho Krekinho" ml="auto" />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>{t('Profile settings')}</MenuItem>
        <MenuDivider />
        <MenuItem>{t('Log out')}</MenuItem>
      </MenuList>
    </Menu>
  );
};
