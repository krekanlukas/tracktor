import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';

import { LoadingFallback } from '@/components/Common';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useUpdateUserSettings } from '@/hooks/useUpdateUserSettings';
import { useUserSettings } from '@/hooks/useUserSettings';

export const ProfilePage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { username, isLoading } = useUserSettings();
  const [usernameInput, setUsernameInput] = useState<string | null>(null);

  const updateProfile = useUpdateUserSettings({
    user_name: usernameInput,
    id: user?.id,
    updated_at: new Date(),
  });

  console.log('Profile render');
  return isLoading ? (
    <LoadingFallback />
  ) : (
    <Stack w="full" spacing={6}>
      <Box>
        <Heading>{t('Profile')}</Heading>
      </Box>
      <Flex align="center">
        {/* <Avatar size="2xl" name={username ?? user?.email ?? ''} mr={6} /> */}
        <Flex
          as="form"
          borderWidth="2px"
          borderRadius="lg"
          boxShadow="xl"
          direction="column"
          p={6}
          maxW="xl"
          flex="1"
        >
          <FormControl id="username">
            <FormLabel>{t('User name')}</FormLabel>
            <Input
              type="text"
              placeholder={username ?? t('Type your username')}
              value={usernameInput ?? ''}
              onChange={(e) => setUsernameInput(e.target.value)}
              focusBorderColor="teal.500"
            />
          </FormControl>
          <Button
            colorScheme="teal"
            mt={6}
            mx="auto"
            onClick={() => updateProfile.mutate()}
            isLoading={updateProfile.isLoading}
            isDisabled={!usernameInput}
          >
            {t('Save changes')}
          </Button>
        </Flex>
      </Flex>
    </Stack>
  );
};
