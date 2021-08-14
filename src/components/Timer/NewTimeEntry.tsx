import { Box, Button, IconButton, Input, Stack, Tooltip } from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';

import { getFormatedDistance, ProjectsMenu } from '@/components/Timer';
import { useLanguage } from '@/context/LanguageContext';

export const NewTimeEntry: FC = () => {
  const { t } = useLanguage();
  const [description, setDescription] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isBillable, setIsBillable] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('NewTimeEntry commit');
    return () => {
      console.log('NewTimeEntry unmount commit');
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleCreateTimeEntry = () => {
    console.log({
      start: new Date(),
      project_id: selectedProjectId,
      description,
      is_billable: isBillable,
    });
    setDescription('');
    setSelectedProjectId(null);
    setIsBillable(false);

    const start = new Date();
    const intervalId = setInterval(() => {
      document.title = `${getFormatedDistance(start)} | Tracktor`;
    }, 1000);
    setIntervalId(intervalId);
  };

  console.log('NewTimeEntry render');
  return (
    <Box w="full" d="flex">
      <Input
        focusBorderColor="teal.500"
        placeholder={t('What are you working on?')}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Stack direction="row" spacing={4} ml={4}>
        <Tooltip
          label={isBillable ? t('Set task to unbillable') : t('Set task to billable')}
          aria-label="billable tooltip"
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
        <Box>
          <ProjectsMenu setSelectedProjectId={setSelectedProjectId} setIsBillable={setIsBillable} />
        </Box>
        <IconButton
          colorScheme="teal"
          aria-label="Start timer"
          size="md"
          icon={<FaPlay />}
          borderRadius="full"
          onClick={handleCreateTimeEntry}
        />
      </Stack>
    </Box>
  );
};
