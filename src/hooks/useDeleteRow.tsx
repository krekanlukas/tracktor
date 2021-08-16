import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';

import { supabase } from '@/config/supabase/supabaseClient';
import { useLanguage } from '@/context/LanguageContext';

const removeRow = async (table: string, idValue: number) => {
  const { error } = await supabase.from(table).delete().eq('id', idValue);
  if (error) throw error;
};

export const useDeleteRow = (table: string, id?: number, title = 'Row') => {
  const { t } = useLanguage();
  const toast = useToast();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation((idValue: number) => removeRow(table, idValue), {
    onSuccess: () => queryClient.refetchQueries(table),
  });

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteMutation.mutateAsync(id);
        toast({
          status: 'success',
          isClosable: true,
          duration: 9000,
          title: t(`${title} removed`),
        });
      } catch (error) {
        toast({
          status: 'error',
          isClosable: true,
          duration: 9000,
          title: t(`Error deleting ${title}`),
          description: error.message,
        });
      }
    } else {
      toast({ title: t(`Cannot delete ${title} without ID`), isClosable: true, duration: 9000 });
    }
  };

  return { handleDelete, isDeleting: deleteMutation.isLoading };
};
