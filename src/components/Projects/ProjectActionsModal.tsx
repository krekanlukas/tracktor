import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

import { colors } from '@/components/Projects';
import { useLanguage } from '@/context/LanguageContext';
import { useCustomToast } from '@/hooks';
import { useInsertRow, useUpdateRow, ProjectDbRow } from '@/hooks/db';

type ProjectActionsModalProps = {
  onClose: () => void;
  isOpen: boolean;
  project?: ProjectDbRow;
};

type MutateObject = Pick<
  ProjectDbRow,
  'title' | 'color_variant' | 'is_billable' | 'price_per_hour'
>;

export const ProjectActionsModal: FC<ProjectActionsModalProps> = ({ onClose, isOpen, project }) => {
  const { t } = useLanguage();
  const [projectTitle, setProjectTitle] = useState(project?.title ?? '');
  const [colorVariant, setColorVariant] = useState(project?.color_variant ?? 'teal');
  const [isBillable, setIsBillable] = useState(project?.is_billable ?? false);
  const [pricePerHour, setPricePerHour] = useState(project?.price_per_hour ?? '');
  const { errorToast, successToast } = useCustomToast();
  const addProject = useInsertRow('projects');
  const editProject = useUpdateRow('projects');

  const handleEdit = async (mutateObject: MutateObject) => {
    if (project?.id) {
      try {
        await editProject.mutateAsync({
          updatedRow: {
            ...mutateObject,
            user_id: project.user_id,
            inserted_at: project.inserted_at,
          },
          idValue: project?.id,
        });

        successToast(t('Project edited'));
        onClose();
      } catch (error) {
        errorToast(t('Error editing project'), error?.message);
      }
    } else {
      errorToast(t('Cannot edit project without ID'));
    }
  };

  const handleCreate = async (mutateObject: MutateObject) => {
    try {
      await addProject.mutateAsync(mutateObject);

      successToast(t('Project created'));

      setProjectTitle('');
      setColorVariant('teal');
      setIsBillable(false);
      setPricePerHour('');

      onClose();
    } catch (error) {
      errorToast(t('Error creating project'), error?.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    const mutateObject: MutateObject = {
      title: projectTitle,
      color_variant: colorVariant,
      is_billable: isBillable,
      price_per_hour: pricePerHour ? +pricePerHour : null,
    };
    if (project) {
      handleEdit(mutateObject);
    } else {
      handleCreate(mutateObject);
    }
  };

  console.log('ProjectActionsModal render');
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{project ? t('Edit project') : t('Add new project')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack as="form" spacing={4} id="create-project-form" onSubmit={handleSubmit}>
            <FormControl id="title" isRequired>
              <FormLabel>{t('Project title')}</FormLabel>
              <Input
                type="text"
                focusBorderColor="teal.500"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
            </FormControl>
            <FormControl id="color-variant">
              <FormLabel>{t('Color variant')}</FormLabel>
              <Select
                focusBorderColor="teal.500"
                textTransform="capitalize"
                value={colorVariant}
                onChange={(e) => setColorVariant(e.target.value)}
              >
                {colors.map((color) => (
                  <Text key={color} as="option" textTransform="capitalize">
                    {color}
                  </Text>
                ))}
              </Select>
            </FormControl>
            <FormControl id="is-billable">
              <FormLabel>{t('Is billable')}</FormLabel>
              <Switch
                colorScheme="teal"
                isChecked={isBillable}
                onChange={() => setIsBillable((previousValue) => !previousValue)}
              />
            </FormControl>
            {isBillable ? (
              <FormControl id="price-per-hour">
                <FormLabel>{t('Price per hour')}</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    min="0"
                    step=".01"
                    focusBorderColor="teal.500"
                    value={pricePerHour}
                    onChange={(e) => setPricePerHour(e.target.value)}
                    isRequired={isBillable}
                  />
                  <InputRightElement color="teal.500" pointerEvents="none" fontSize="1.4em">
                    €
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            ) : null}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            form="create-project-form"
            colorScheme="teal"
            mr={2}
            isLoading={project ? editProject.isLoading : addProject.isLoading}
          >
            {project ? t('Edit project') : t('Create project')}
          </Button>
          <Button onClick={onClose}>{t('Close')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
