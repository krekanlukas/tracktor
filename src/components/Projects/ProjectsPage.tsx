import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react';

import { ContentTopbar, EmptyPageMessage, LoadingFallback } from '@/components/Common';
import { NewProjectModal, ProjectRow } from '@/components/Projects';
import { BORDER_COLOR_DARK, TOPBAR_HEIGHT } from '@/config/constants/layout';
import { useLanguage } from '@/context/LanguageContext';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useFetchRows } from '@/hooks/useFetchRows';

export const ProjectsPage = () => {
  const { t } = useLanguage();
  const { isOpen, open, close } = useDisclosure();
  const { data, isSuccess, isLoading } = useFetchRows('projects');
  const bg = useColorModeValue('white', BORDER_COLOR_DARK);
  const border = useColorModeValue('gray.100', 'gray.500');
  console.log(data, isSuccess);

  console.log('Projects render');
  return (
    <Box w="full">
      <ContentTopbar>
        <Heading>Projects</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="teal" ml="auto" onClick={open}>
          {t('New project')}
        </Button>
        <NewProjectModal onClose={close} isOpen={isOpen} />
      </ContentTopbar>
      {isLoading ? (
        <Flex h={`calc(100% - ${TOPBAR_HEIGHT * 4}px)`}>
          <LoadingFallback />
        </Flex>
      ) : data && data.length > 0 ? (
        <Stack
          spacing={3}
          mt={6}
          bg={bg}
          shadow="md"
          borderRadius="md"
          p={3}
          divider={<StackDivider borderColor={border} />}
        >
          {data.map((project) => (
            <ProjectRow
              key={project.id}
              id={project.id}
              title={project.title}
              colorVariant={project.color_variant}
              isBillable={project.is_billable}
            />
          ))}
        </Stack>
      ) : (
        <Flex h={`calc(100% - ${TOPBAR_HEIGHT * 4}px)`} justify="center">
          <EmptyPageMessage
            info={t('Projects help you organize your time entries. Click on New to get started.')}
          />
        </Flex>
      )}
    </Box>
  );
};
