import { Flex, UnorderedList, ListItem, Button, Text, Box, Divider } from '@chakra-ui/react';
import { Fragment } from 'react';
import { IoBriefcaseOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { MdTimer } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

import { QuickSettings, UserInfoMenu } from '@/components/Layout/Navigation';
import { ROUTES } from '@/config/constants/routes';
import { useLanguage } from '@/context/LanguageContext';

type NavigationItemsGroup = {
  groupTitle: string;
  navigationItems: NavigationItem[];
};

type NavigationItem = {
  name: string;
  to: string;
  icon: JSX.Element;
};

const navigationItemsGroups: NavigationItemsGroup[] = [
  {
    groupTitle: 'Track',
    navigationItems: [
      {
        name: 'Timer',
        to: ROUTES.TIMER,
        icon: <MdTimer />,
      },
    ],
  },
  {
    groupTitle: 'Analyze',
    navigationItems: [
      {
        name: 'Reports',
        to: ROUTES.REPORTS,
        icon: <IoDocumentTextOutline />,
      },
    ],
  },
  {
    groupTitle: 'Manage',
    navigationItems: [
      {
        name: 'Projects',
        to: ROUTES.PROJECTS,
        icon: <IoBriefcaseOutline />,
      },
    ],
  },
];

export const SidebarContent = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();

  console.log('SidebarContent render');
  return (
    <Flex direction="column" grow={1}>
      <UnorderedList styleType="none" ml={0} spacing={4}>
        {navigationItemsGroups.map((navigationItemsGroup, index) => (
          <Fragment key={index}>
            <ListItem>
              <Text fontSize="xs">{t(navigationItemsGroup.groupTitle)}</Text>
            </ListItem>
            {navigationItemsGroup.navigationItems.map((navigationItem, index) => (
              <ListItem key={index}>
                <Link to={navigationItem.to}>
                  <Button
                    leftIcon={navigationItem.icon}
                    isFullWidth
                    justifyContent="flex-start"
                    variant={pathname === navigationItem.to ? 'solid' : 'outline'}
                    colorScheme={pathname === navigationItem.to ? 'teal' : 'gray'}
                  >
                    {t(navigationItem.name)}
                  </Button>
                </Link>
              </ListItem>
            ))}
          </Fragment>
        ))}
      </UnorderedList>
      <Divider colorScheme="gray" mt="auto" mb={2} />
      <Box>
        <QuickSettings />
      </Box>
      <Box py={4}>
        <UserInfoMenu />
      </Box>
    </Flex>
  );
};
