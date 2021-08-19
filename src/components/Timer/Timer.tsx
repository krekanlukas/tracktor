import { Flex, Skeleton, Text } from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';

import { ProjectTitle } from '@/components/Common';
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
        <Text mr={2}>{`${description || t('Active timer')}:`}</Text>
        <ProjectTitle projectTitle={projectTitle} colorVariant={colorVariant} />
        <Text color={formatColor(colorVariant)} ml={2}>
          {time ?? '0:00:00'}
        </Text>
      </Flex>
    </Skeleton>
  );
};
