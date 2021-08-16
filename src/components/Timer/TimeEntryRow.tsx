import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text, useColorModeValue } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { AlertDialogDelete } from '@/components/Common';
import { formatTime, getFormattedDuration } from '@/components/Timer';
import { useLanguage } from '@/context/LanguageContext';
import { useColorModeString } from '@/hooks/useColorModeString';
import { useDeleteRow } from '@/hooks/useDeleteRow';
import { useDisclosure } from '@/hooks/useDisclosure';
import { TimeEntryDbRow } from '@/hooks/useInsertRow';

type TimeEntryRowProps = {
  timeEntry: TimeEntryDbRow;
  projectTitle: string;
  projectColorVariant: string;
};

export const TimeEntryRow: FC<TimeEntryRowProps> = ({
  timeEntry,
  projectTitle,
  projectColorVariant,
}) => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const hoverbg = useColorModeValue('gray.100', 'whiteAlpha.200');
  const formatColor = useColorModeString();
  const { isOpen, open, close } = useDisclosure();
  const { handleDelete, isDeleting } = useDeleteRow('time_entries', timeEntry.id, 'Time entry');

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
        <Text mr={10}>{timeEntry.description || 'No description'}</Text>
        <Box borderRadius="100%" w="10px" h="10px" bg={formatColor(projectColorVariant)} mr={2} />
        <Text color={formatColor(projectColorVariant)} fontSize="lg">
          {projectTitle}
        </Text>
      </Flex>
      <Flex flex={1} justify="flex-end" align="center">
        <Text>{`${formatTime(timeEntry.start)} - ${formatTime(timeEntry.stop ?? '')}`}</Text>
        <Text ml={10}>{getFormattedDuration(timeEntry.duration)}</Text>
      </Flex>
      <Flex flexBasis="50px" align="center" justify="flex-end">
        <IconButton
          d={isHovered ? 'inline-flex' : 'none'}
          icon={<DeleteIcon />}
          variant="outline"
          colorScheme="red"
          aria-label="Delete time entry"
          size="sm"
          onClick={open}
        />
      </Flex>
      <AlertDialogDelete
        isOpen={isOpen}
        close={close}
        heading={t('Delete time entry')}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />
    </Flex>
  );
};
