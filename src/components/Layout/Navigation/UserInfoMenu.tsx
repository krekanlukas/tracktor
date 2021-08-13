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
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ROUTES } from '@/config/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useUserSettings } from '@/hooks/useUserSettings';

export const UserInfoMenu = () => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const { username } = useUserSettings();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await signOut();
      if (error) throw error;
      toast({ title: 'Signed out', duration: 9000, isClosable: true });
      history.push(ROUTES.HOME);
    } catch (error) {
      setLoading(false);
      toast({ title: 'Error', duration: 9000, isClosable: true, status: 'error' });
      console.log(error);
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
            <Avatar name={user?.email} ml="auto" />
          </Flex>
        )}
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
