import { Box, Center, Heading, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';

import boxes from '@/assets/boxes.png';
import { useLanguage } from '@/context/LanguageContext';

type EmptyPageMessageProps = {
  info?: string;
};

export const EmptyPageMessage: FC<EmptyPageMessageProps> = ({ info }) => {
  const { t } = useLanguage();

  return (
    <Center>
      <Box textAlign="center">
        <Image src={boxes} alt="empty boxes" mx="auto" />
        <Heading my={3}>{t('Just some empty boxes here')}</Heading>
        <Text>{info}</Text>
      </Box>
    </Center>
  );
};
