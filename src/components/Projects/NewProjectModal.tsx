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
  useToast,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

import { colors } from '@/components/Projects';
import { useLanguage } from '@/context/LanguageContext';
import { useInsertRow } from '@/hooks/useInsertRow';

type NewProjectModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

export const NewProjectModal: FC<NewProjectModalProps> = ({ onClose, isOpen }) => {
  const { t } = useLanguage();
  const [projectTitle, setProjectTitle] = useState('');
  const [colorVariant, setColorVariant] = useState('teal');
  const [isBillable, setIsBillable] = useState(false);
  const [pricePerHour, setPricePerHour] = useState('');
  const toast = useToast();
  const addProject = useInsertRow('projects');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    try {
      await addProject.mutateAsync({
        title: projectTitle,
        color_variant: colorVariant,
        is_billable: isBillable,
        price_per_hour: pricePerHour ? +pricePerHour : null,
      });

      toast({ status: 'success', duration: 9000, isClosable: true, title: t('Project created') });

      setProjectTitle('');
      setColorVariant('teal');
      setIsBillable(false);
      setPricePerHour('');

      onClose();
    } catch (error) {
      toast({
        status: 'error',
        duration: 9000,
        isClosable: true,
        title: t('Error creating project'),
        description: error?.message,
      });
    }
  };

  console.log('NewProjectModal render');
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('Add new project')}</ModalHeader>
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
            isLoading={addProject.isLoading}
          >
            {t('Create project')}
          </Button>
          <Button onClick={onClose}>{t('Close')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
