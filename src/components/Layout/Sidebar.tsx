import { Flex, UnorderedList, ListItem, Button, Text, Box, Divider } from '@chakra-ui/react';
import { IoBriefcaseOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { MdTimer } from 'react-icons/md';

import { Logo } from '@/components/Common';
import { QuickSettings } from '@/components/Layout/QuickSettings';
import { UserInfoMenu } from '@/components/Layout/UserInfoMenu';

export const Sidebar = () => {
  console.log('Sidebar render');
  return (
    <Flex
      as="nav"
      direction="column"
      w={240}
      h="100vh"
      px={2}
      borderRight="2px"
      borderColor="gray.100"
      position="fixed"
    >
      <Flex h="60px" alignItems="center" justify="center">
        <Logo />
      </Flex>
      <UnorderedList styleType="none" ml={0} spacing={2}>
        <ListItem>
          <Text fontSize="xs">Track</Text>
        </ListItem>
        <ListItem>
          <Button leftIcon={<MdTimer />} isFullWidth justifyContent="flex-start" h="32px" py={2}>
            Timer
          </Button>
        </ListItem>
        <ListItem>
          <Text fontSize="xs">Analyze</Text>
        </ListItem>
        <ListItem>
          <Button
            leftIcon={<IoDocumentTextOutline />}
            isFullWidth
            justifyContent="flex-start"
            h="32px"
            py={2}
          >
            Reports
          </Button>
        </ListItem>
        <ListItem>
          <Text fontSize="xs">Manage</Text>
        </ListItem>
        <ListItem>
          <Button
            leftIcon={<IoBriefcaseOutline />}
            isFullWidth
            justifyContent="flex-start"
            h="32px"
            py={2}
          >
            Projects
          </Button>
        </ListItem>
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

export default Sidebar;
