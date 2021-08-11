import { Flex, Box, useMediaQuery } from '@chakra-ui/react';
import { FC } from 'react';

import {
  Logo,
  MobileSidebar,
  QuickSettings,
  Topbar,
  LandingSidebarContent,
} from '@/components/Layout/Navigation';
import { TOPBAR_HEIGHT } from '@/config/constants/layout';

export const LandingPageLayout: FC = ({ children }) => {
  const [isDesktopView] = useMediaQuery('(min-width: 48em)');

  console.log('LandingPageLayout render');
  return (
    <Flex direction="column" grow={1}>
      <Topbar>
        <Box d={{ base: 'block', md: 'none' }} flex={1}>
          <MobileSidebar>
            <LandingSidebarContent />
          </MobileSidebar>
        </Box>
        <Box mr="auto">
          <Logo showImage={!isDesktopView} />
        </Box>
        <Box flex={{ base: 1, md: '0 0 210px' }}>{isDesktopView ? <QuickSettings /> : null}</Box>
      </Topbar>
      <Box as={'main'} flexGrow={1} mt={TOPBAR_HEIGHT}>
        {children}
      </Box>
    </Flex>
  );
};
