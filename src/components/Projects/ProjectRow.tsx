import { Button, ButtonGroup, Flex, Text, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';

import { AlertDialogDelete, ProjectTitle } from '@/components/Common';
import { ProjectActionsModal } from '@/components/Projects';
import { useLanguage } from '@/context/LanguageContext';
import { useColorModeString, useDisclosure } from '@/hooks';
import { useDeleteRow, ProjectDbRow } from '@/hooks/db';

type ProjectRowProps = {
  project: ProjectDbRow;
};

export const ProjectRow: FC<ProjectRowProps> = ({ project }) => {
  const { id, title, color_variant, is_billable } = project;
  const { t } = useLanguage();
  const { isOpen, open, close } = useDisclosure();
  const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useDisclosure();
  const { handleDelete, isDeleting } = useDeleteRow('projects', id, 'Project');
  const formatColor = useColorModeString();

  console.log('ProjectRow render');
  return (
    <Flex _hover={{ cursor: 'pointer' }} p={3} align="center">
      <Flex align="center" flex="1">
        <ProjectTitle projectTitle={title} colorVariant={color_variant} />
      </Flex>
      {is_billable && (
        <Flex flex="1" justify="center">
          <Tooltip aria-label="Project is billable" label={t('Project is billable')}>
            <Text color={formatColor('teal')} fontSize="1.4em">
              €
            </Text>
          </Tooltip>
        </Flex>
      )}
      <ButtonGroup variant="outline" spacing={3} flex="1" justifyContent="flex-end">
        <Button colorScheme="blue" onClick={openEdit}>
          {t('Edit')}
        </Button>
        <Button colorScheme="red" onClick={open}>
          {t('Delete')}
        </Button>
      </ButtonGroup>
      <AlertDialogDelete
        isOpen={isOpen}
        close={close}
        heading={t('Delete project')}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />
      <ProjectActionsModal isOpen={isEditOpen} onClose={closeEdit} project={project} />
    </Flex>
  );
};
