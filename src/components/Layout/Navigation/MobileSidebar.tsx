import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Drawer, DrawerOverlay, IconButton, DrawerContent, Flex } from '@chakra-ui/react';
import { FC, useRef } from 'react';

import { SidebarContent } from '@/components/Layout/Navigation';
import { useDisclosure } from '@/hooks/useDisclosure';

export const MobileSidebar: FC = () => {
  const buttonRef = useRef(null);
  const { close, isOpen, toggle } = useDisclosure();
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
        <DrawerContent px={4}>
          <Flex h={16} align="center" mb={4}>
            <IconButton
              aria-label="close drawer"
              onClick={close}
              icon={<CloseIcon />}
              variant="outline"
            />
          </Flex>
          <SidebarContent />
        </DrawerContent>
      </Drawer>
    </>
  );
};
