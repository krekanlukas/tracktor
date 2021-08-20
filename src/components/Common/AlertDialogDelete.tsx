import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';

import { useLanguage } from '@/context/LanguageContext';

type AlertDialogDeleteProps = {
  isOpen: boolean;
  close: () => void;
  heading: string;
  handleDelete: () => Promise<void>;
  isLoading: boolean;
};

export const AlertDialogDelete: FC<AlertDialogDeleteProps> = ({
  isOpen,
  close,
  heading,
  handleDelete,
  isLoading,
}) => {
  const { t } = useLanguage();
  const cancelRef = useRef(null);

  console.log('AlertDialogDelete render');
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={close}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {heading}
          </AlertDialogHeader>
          <AlertDialogBody>
            {t(`Are you sure? You can't undo this action afterwards.`)}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={close}>
              {t('Cancel')}
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3} isLoading={isLoading}>
              {t('Delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
