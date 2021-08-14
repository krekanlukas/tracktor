import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

export const TimeEntryRow = () => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverbg = useColorModeValue('gray.100', 'whiteAlpha.200');

  console.log('TimeEntryRow render');
  return (
    <Flex
      px={6}
      py={3}
      minH="60px"
      _hover={{ bg: hoverbg }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex flex={1} align="center">
        <Text mr={10}>Timer page</Text>
        <Box borderRadius="100%" w="10px" h="10px" bg={'yellow'} mr={2} />
        <Text color="yellow.500" fontSize="lg">
          Project name
        </Text>
      </Flex>
      <Flex flex={1} justify="flex-end" align="center">
        <Text>10:19 - 12:14</Text>
        <Text ml={10}>1:51:13</Text>
      </Flex>
      <Flex flexBasis="50px" align="center" justify="flex-end">
        <IconButton
          d={isHovered ? 'inline-flex' : 'none'}
          icon={<DeleteIcon />}
          variant="outline"
          colorScheme="red"
          aria-label="Delete time entry"
          size="sm"
        />
      </Flex>
    </Flex>
  );
};
