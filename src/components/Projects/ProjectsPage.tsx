import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  StackDivider,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';

import { ContentTopbar, EmptyPageMessage, LoadingFallback } from '@/components/Common';
import { ProjectActionsModal, ProjectRow } from '@/components/Projects';
import { BORDER_COLOR_DARK, TOPBAR_HEIGHT } from '@/config/constants/layout';
import { useLanguage } from '@/context/LanguageContext';
import { useDisclosure } from '@/hooks';
import { useFetchRows } from '@/hooks/db';

export const ProjectsPage = () => {
  const { t } = useLanguage();
  const { isOpen, open, close } = useDisclosure();
  const { data, isLoading } = useFetchRows('projects');
  const bg = useColorModeValue('white', BORDER_COLOR_DARK);
  const border = useColorModeValue('gray.100', 'gray.500');
  const [isDesktopView] = useMediaQuery('(min-width: 48em)');

  console.log('Projects render');
  return (
    <Box w="full">
      <ContentTopbar>
        <Heading mr="auto">{t('Projects')}</Heading>
        {isDesktopView ? (
          <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={open}>
            {t('New project')}
          </Button>
        ) : (
          <IconButton
            aria-label="New project"
            colorScheme="teal"
            icon={<AddIcon />}
            onClick={open}
          />
        )}
        <ProjectActionsModal onClose={close} isOpen={isOpen} />
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
          overflow="auto"
        >
          {data.map((project) => (
            <ProjectRow key={project.id} project={project} />
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
