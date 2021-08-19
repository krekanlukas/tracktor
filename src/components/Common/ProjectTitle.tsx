import { Box, Text } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { useColorModeString } from '@/hooks';

type ProjectTitleProps = {
  colorVariant: string;
  projectTitle: string;
};

const ProjectTitleComponent: FC<ProjectTitleProps> = ({ colorVariant, projectTitle }) => {
  const formatColor = useColorModeString();

  console.log('ProjectTitle render');
  return (
    <>
      <Box borderRadius="100%" w="10px" h="10px" bg={formatColor(colorVariant)} mr={2} />
      <Text color={formatColor(colorVariant)}>{projectTitle}</Text>
    </>
  );
};

export const ProjectTitle = memo(ProjectTitleComponent);
