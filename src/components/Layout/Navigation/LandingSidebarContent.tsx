import { Box, Divider, Flex, Link, ListItem, UnorderedList } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { QuickSettings } from '@/components/Layout/Navigation';
import { ROUTES } from '@/config/constants/routes';
import { useLanguage } from '@/context/LanguageContext';

type LinkProps = {
  name: string;
  to: string;
};

const links: LinkProps[] = [
  {
    name: 'Home',
    to: ROUTES.HOME,
  },
  {
    name: 'Login',
    to: ROUTES.LOGIN,
  },
  {
    name: 'Register',
    to: ROUTES.REGISTER,
  },
];

export const LandingSidebarContent = () => {
  const { t } = useLanguage();

  console.log('LandingSidebarContent render');
  return (
    <Flex direction="column" mb={4} grow={1}>
      <UnorderedList styleType="none" ml={0} spacing={4}>
        {links.map((link, index) => (
          <ListItem key={index}>
            <Link as={RouterLink} to={link.to}>
              {t(link.name)}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
      <Divider colorScheme="gray" mb={2} mt="auto" />
      <Box>
        <QuickSettings />
      </Box>
    </Flex>
  );
};
