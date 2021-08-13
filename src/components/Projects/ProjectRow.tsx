import { Box, Button, ButtonGroup, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';

import { colorsContrast } from '@/components/Projects';
import { useLanguage } from '@/context/LanguageContext';

type ProjectRowProps = {
  title: string;
  colorVariant: string;
  isBillable?: boolean;
};

export const ProjectRow: FC<ProjectRowProps> = ({ title, colorVariant, isBillable = false }) => {
  const { t } = useLanguage();
  const color = useColorModeValue(colorsContrast[colorVariant][0], colorsContrast[colorVariant][1]);

  console.log('ProjectRow render');
  return (
    <Flex _hover={{ cursor: 'pointer' }} p={3} align="center">
      <Flex align="center" flex="1">
        <Box borderRadius="100%" w="10px" h="10px" bg={color} mr={2} />
        <Text color={color} fontSize="lg">
          {t(title)}
        </Text>
      </Flex>
      {isBillable && (
        <Flex flex="1" justify="center">
          <Text color="teal.500" fontSize="1.4em">
            €
          </Text>
        </Flex>
      )}
      <ButtonGroup variant="outline" spacing={3} flex="1" justifyContent="flex-end">
        <Button colorScheme="blue">{t('Edit')}</Button>
        <Button colorScheme="red">{t('Delete')}</Button>
      </ButtonGroup>
    </Flex>
  );
};
