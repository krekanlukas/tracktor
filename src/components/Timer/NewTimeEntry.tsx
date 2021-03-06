import { Box, Button, IconButton, Input, Stack, Tooltip } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';

import { useLanguage } from '@/context/LanguageContext';

type NewTimeEntryProps = {
  isBillable: boolean;
  setIsBillable: Dispatch<SetStateAction<boolean>>;
  taskDescription: string;
  setTaskDescription: Dispatch<SetStateAction<string>>;
  handleCreateTimeEntry: () => Promise<void>;
  handleEditTimeEntry: () => Promise<void>;
  isActiveTimeEntry: boolean;
};

export const NewTimeEntry: FC<NewTimeEntryProps> = ({
  children,
  isBillable,
  setIsBillable,
  taskDescription,
  setTaskDescription,
  handleCreateTimeEntry,
  handleEditTimeEntry,
  isActiveTimeEntry,
}) => {
  const { t } = useLanguage();

  console.log('NewTimeEntry render');
  return (
    <Box w="full" d="flex" align="center" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
      <Input
        focusBorderColor="teal.500"
        placeholder={t('What are you working on?')}
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <Stack
        direction="row"
        spacing={4}
        ml={{ base: 0, md: 4 }}
        my={{ base: 4, md: 0 }}
        w={{ base: 'full', md: 'auto' }}
        justifyContent={{ base: 'center' }}
      >
        <Tooltip
          label={isBillable ? t('Set task to unbillable') : t('Set task to billable')}
          aria-label="Billable tooltip"
        >
          <Button
            colorScheme={isBillable ? 'teal' : 'gray'}
            variant="ghost"
            onClick={() => setIsBillable((previousValue) => !previousValue)}
            fontSize="1.4rem"
            opacity={isBillable ? 1 : 0.2}
          >
            €
          </Button>
        </Tooltip>
        <Box>{children}</Box>
        <Tooltip
          label={isActiveTimeEntry ? t('Stop timer') : t('Start timer')}
          aria-label="Timer tooltip"
        >
          <IconButton
            colorScheme="teal"
            aria-label={isActiveTimeEntry ? 'Stop timer' : 'Start timer'}
            size="md"
            icon={isActiveTimeEntry ? <FaStop /> : <FaPlay />}
            borderRadius="full"
            onClick={isActiveTimeEntry ? handleEditTimeEntry : handleCreateTimeEntry}
          />
        </Tooltip>
      </Stack>
    </Box>
  );
};
