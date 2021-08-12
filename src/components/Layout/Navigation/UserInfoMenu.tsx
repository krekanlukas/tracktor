import {
  Text,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuDivider,
  MenuList,
  MenuItem,
  MenuButton,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/config/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export const UserInfoMenu = () => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      console.log(loading);
      const { error } = await signOut();
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  console.log('UserInfoMenu render');
  return (
    <Menu placement="top">
      <MenuButton as={Button} w="100%" h="100%" py="8px" variant="outline">
        <Flex>
          <Box textAlign="left">
            <Text>Username</Text>
            <Text isTruncated maxW="130px" color="gray">
              {user?.email}
            </Text>
          </Box>
          <Avatar name={user?.email} ml="auto" />
        </Flex>
      </MenuButton>
      <MenuList>
        <Link to={ROUTES.PROFILE_SETTINGS}>
          <MenuItem>{t('Profile settings')}</MenuItem>
        </Link>
        <MenuDivider />
        <MenuItem onClick={handleSignOut}>{t('Log out')}</MenuItem>
      </MenuList>
    </Menu>
  );
};
