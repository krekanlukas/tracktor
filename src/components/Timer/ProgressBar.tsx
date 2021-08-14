import { Box, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';

type Task = {
  percentage: number;
  duration: number;
  title: string;
  colorVariant: string;
};

type ProgressBarProps = {
  tasks: Task[];
};

export const ProgressBar: FC<ProgressBarProps> = ({ tasks }) => {
  const bg = useColorModeValue('gray.100', 'whiteAlpha.200');

  console.log('Progresbar render');
  return (
    <Box h={tasks.length ? 'max-content' : 4} w="full" mt={6} bg={bg} borderRadius="md" d="flex">
      {tasks.map((task, index) => (
        <Tooltip key={index} label={`${task.title} ${task.percentage}%`} hasArrow>
          <Box
            h="max-content"
            flexBasis="50%"
            bg="yellow.500"
            textAlign="center"
            borderLeftRadius={index === 0 ? 'md' : 'none'}
            borderRightRadius={index === tasks.length - 1 ? 'md' : 'none'}
          >
            <Text size="sm" isTruncated>
              {task.title}
            </Text>
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};
