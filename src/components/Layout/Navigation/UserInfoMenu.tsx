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
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ROUTES } from '@/config/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCustomToast, useUserSettings } from '@/hooks';

export const UserInfoMenu = () => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const { username } = useUserSettings();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { errorToast, successToast } = useCustomToast();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await signOut();
      if (error) throw error;
      successToast(t('Signed out'));
      history.push(ROUTES.HOME);
    } catch (error) {
      setLoading(false);
      errorToast(t('Error'), error.message);
    }
  };

  console.log('UserInfoMenu render');
  return (
    <Menu placement="top">
      <MenuButton as={Button} w="100%" h="100%" py="8px" variant="outline">
        {loading ? (
          <Spinner color="teal" />
        ) : (
          <Flex>
            <Box textAlign="left">
              <Text>{username ?? t('Username')}</Text>
              <Text isTruncated maxW="130px" color="gray">
                {user?.email}
              </Text>
            </Box>
            <Avatar name={username ?? user?.email} ml="auto" />
          </Flex>
        )}
      </MenuButton>
      <MenuList>
        <Link to={ROUTES.PROFILE_SETTINGS}>
          <MenuItem>{t('Profile and Settings')}</MenuItem>
        </Link>
        <MenuDivider />
        <MenuItem onClick={handleSignOut}>{t('Log out')}</MenuItem>
      </MenuList>
    </Menu>
  );
};
