import { Flex, UnorderedList, ListItem, Text, Box, Divider } from '@chakra-ui/react';
import { Fragment } from 'react';
import { IoBriefcaseOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { MdTimer } from 'react-icons/md';

import { QuickSettings, UserInfoMenu, NavigationItem } from '@/components/Layout/Navigation';
import { ROUTES } from '@/config/constants/routes';
import { useLanguage } from '@/context/LanguageContext';
import { useActiveTimeEntry } from '@/hooks';

type NavigationItemsGroup = {
  groupTitle: string;
  navigationItems: NavigationItemType[];
};

export type NavigationItemType = {
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
  const { data: activeTimeEntry, isLoading } = useActiveTimeEntry();

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
              <NavigationItem
                key={index}
                navigationItem={navigationItem}
                start={activeTimeEntry?.start}
                isLoading={isLoading}
              />
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
