import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text, useColorModeValue } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { AlertDialogDelete, ProjectTitle } from '@/components/Common';
import { formatTime, getFormattedDuration } from '@/components/Timer';
import { useLanguage } from '@/context/LanguageContext';
import { useDisclosure } from '@/hooks';
import { useDeleteRow, TimeEntryDbRow } from '@/hooks/db';

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
      wrap="wrap"
    >
      <Flex flex={1} align="center">
        <Text mr={6}>{timeEntry.description || 'No description'}</Text>
        <ProjectTitle projectTitle={projectTitle} colorVariant={projectColorVariant} />
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
