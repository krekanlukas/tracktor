import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';

import { colorsContrast, ProjectActionsModal, ProjectDbRow } from '@/components/Projects';
import { useLanguage } from '@/context/LanguageContext';
import { useDeleteRow } from '@/hooks/useDeleteRow';
import { useDisclosure } from '@/hooks/useDisclosure';

type ProjectRowProps = {
  project: ProjectDbRow;
};

export const ProjectRow: FC<ProjectRowProps> = ({ project }) => {
  const { id, title, color_variant, is_billable } = project;
  const { t } = useLanguage();
  const color = useColorModeValue(
    colorsContrast[color_variant][0],
    colorsContrast[color_variant][1]
  );
  const { isOpen, open, close } = useDisclosure();
  const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useDisclosure();
  const cancelRef = useRef(null);
  const deleteProject = useDeleteRow('projects');
  const toast = useToast();

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteProject.mutateAsync(id);
        toast({ status: 'success', isClosable: true, duration: 9000, title: t('Project removed') });
      } catch (error) {
        toast({
          status: 'error',
          isClosable: true,
          duration: 9000,
          title: t('Error deleting project'),
          description: error.message,
        });
      }
    } else {
      toast({ title: t('Cannot delete project without ID'), isClosable: true, duration: 9000 });
    }
  };

  console.log('ProjectRow render');
  return (
    <Flex _hover={{ cursor: 'pointer' }} p={3} align="center">
      <Flex align="center" flex="1">
        <Box borderRadius="100%" w="10px" h="10px" bg={color} mr={2} />
        <Text color={color} fontSize="lg">
          {t(title)}
        </Text>
      </Flex>
      {is_billable && (
        <Flex flex="1" justify="center">
          <Text color="teal.500" fontSize="1.4em">
            €
          </Text>
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
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={close}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t('Delete project')}
            </AlertDialogHeader>
            <AlertDialogBody>
              {t(`Are you sure? You can't undo this action afterwards.`)}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={close}>
                {t('Cancel')}
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={deleteProject.isLoading}
              >
                {t('Delete')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <ProjectActionsModal isOpen={isEditOpen} onClose={closeEdit} project={project} />
    </Flex>
  );
};
