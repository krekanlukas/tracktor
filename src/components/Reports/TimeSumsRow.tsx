import { Button, Flex, Stack, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import { TITLE_CELL_MIN_WIDTH, CELL_MIN_WIDTH } from '@/components/Reports';

type TimeSumsRowProps = {
  buttonText?: string | number;
  onClick?: () => void;
  title: ReactNode;
  total: string | number;
  isExpanded?: boolean;
  isSubRow?: boolean;
};

export const TimeSumsRow: FC<TimeSumsRowProps> = ({
  buttonText,
  title,
  children,
  total,
  onClick,
  isExpanded = false,
  isSubRow = false,
}) => {
  const subRowBg = useColorModeValue('gray.100', 'whiteAlpha.200');
  console.log('TimeSumsRow render');
  return (
    <Flex
      p={3}
      align="center"
      bg={isSubRow ? subRowBg : 'inherit'}
      _first={{ borderTopRadius: 'md' }}
      _last={{ borderBottomRadius: 'md' }}
    >
      <Flex minW="24px">
        {buttonText && (
          <Tooltip label={isExpanded ? 'Collapse project' : 'Expand project'}>
            <Button
              variant="outline"
              size="xs"
              onClick={onClick}
              colorScheme={isExpanded ? 'teal' : 'gray'}
            >
              {buttonText}
            </Button>
          </Tooltip>
        )}
      </Flex>
      <Flex w={TITLE_CELL_MIN_WIDTH} ml={6} align="center">
        {title || 'No description'}
      </Flex>
      <Stack flexGrow={1} direction="row" spacing={6} alignItems="center">
        {children}
      </Stack>
      <Flex w={CELL_MIN_WIDTH} justify="flex-end">
        <Text>{total}</Text>
      </Flex>
    </Flex>
  );
};
