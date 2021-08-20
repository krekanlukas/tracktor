import { Flex, Box, useMediaQuery, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';

import {
  Logo,
  MobileSidebar,
  QuickSettings,
  Topbar,
  LandingSidebarContent,
} from '@/components/Layout/Navigation';
import { CONTENT_CONTAINER, TOPBAR_HEIGHT } from '@/config/constants/layout';

export const LandingPageLayout: FC = ({ children }) => {
  const [isDesktopView] = useMediaQuery('(min-width: 48em)');
  const bg = useColorModeValue('gray.50', 'gray.700');

  console.log('LandingPageLayout render');
  return (
    <Flex direction="column" grow={1}>
      <Topbar>
        <Box d={{ base: 'block', md: 'none' }} flex={1}>
          {!isDesktopView && (
            <MobileSidebar>
              <LandingSidebarContent />
            </MobileSidebar>
          )}
        </Box>
        <Box mr="auto">
          <Logo showImage />
        </Box>
        <Box flex={{ base: 1, md: '0 0 210px' }}>{isDesktopView ? <QuickSettings /> : null}</Box>
      </Topbar>
      <Flex as={'main'} flexGrow={1} mt={TOPBAR_HEIGHT} bg={bg} p={CONTENT_CONTAINER}>
        {children}
      </Flex>
    </Flex>
  );
};
