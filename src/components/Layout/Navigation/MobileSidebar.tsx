import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Drawer, DrawerOverlay, IconButton, DrawerContent, Flex } from '@chakra-ui/react';
import { FC, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { TOPBAR_HEIGHT, NAVIGATION_CONTAINER } from '@/config/constants/layout';
import { useDisclosure } from '@/hooks/useDisclosure';

export const MobileSidebar: FC = ({ children }) => {
  const buttonRef = useRef(null);
  const { close, isOpen, toggle } = useDisclosure();
  const { pathname } = useLocation();

  useEffect(() => {
    close();
    console.log('MobileSidebar commit');
  }, [pathname, close]);

  console.log('MobileSidebar render');
  return (
    <>
      <IconButton
        ref={buttonRef}
        aria-label="open drawer"
        icon={<HamburgerIcon />}
        variant="outline"
        onClick={toggle}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={close} finalFocusRef={buttonRef}>
        <DrawerOverlay />
        <DrawerContent px={NAVIGATION_CONTAINER}>
          <Flex h={TOPBAR_HEIGHT} align="center" mb={4}>
            <IconButton
              aria-label="close drawer"
              onClick={close}
              icon={<CloseIcon />}
              variant="outline"
            />
          </Flex>
          {children}
        </DrawerContent>
      </Drawer>
    </>
  );
};
