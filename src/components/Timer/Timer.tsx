import { Box, Flex, Skeleton, Text } from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';

import { getFormattedDistance } from '@/components/Timer';
import { useLanguage } from '@/context/LanguageContext';
import { useColorModeString } from '@/hooks/useColorModeString';

type TimerProps = {
  description: string;
  projectTitle: string;
  colorVariant: string;
  isLoading: boolean;
  start: Date | undefined;
};

export const Timer: FC<TimerProps> = ({
  description,
  projectTitle,
  colorVariant,
  isLoading,
  start,
}) => {
  const { t } = useLanguage();
  const formatColor = useColorModeString();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const intervalId =
      start &&
      setInterval(() => {
        setTime(getFormattedDistance(new Date(start)));
      }, 1000);
    console.log('Timer commit');
    return () => {
      if (intervalId) clearInterval(intervalId);
      setTime(null);
      console.log('Timer unmount commit');
    };
  }, [start]);

  // console.log('Timer render');
  return (
    <Skeleton isLoaded={!isLoading}>
      <Flex mt={6} px={6} align="center">
        <Text>{`${description || t('Active timer')}:`}</Text>
        <Box borderRadius="100%" w="10px" h="10px" bg={formatColor(colorVariant)} ml={2} />
        <Text color={formatColor(colorVariant)} ml={2}>
          {projectTitle}
        </Text>
        <Text color={formatColor(colorVariant)} ml={2}>
          {time ?? '0:00:00'}
        </Text>
      </Flex>
    </Skeleton>
  );
};
