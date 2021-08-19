import { useMutation, useQueryClient } from 'react-query';

import { supabase } from '@/config/supabase/supabaseClient';
import { useLanguage } from '@/context/LanguageContext';
import { useCustomToast } from '@/hooks';

const removeRow = async (table: string, idValue: number) => {
  const { error } = await supabase.from(table).delete().eq('id', idValue);
  if (error) throw error;
};

export const useDeleteRow = (table: string, id?: number, title = 'Row') => {
  const { t } = useLanguage();
  const { errorToast, successToast } = useCustomToast();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation((idValue: number) => removeRow(table, idValue), {
    onSuccess: () => queryClient.refetchQueries(table),
  });

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteMutation.mutateAsync(id);
        successToast(t(`${title} removed`));
      } catch (error) {
        errorToast(t(`Error deleting ${title}`), error.message);
      }
    } else {
      errorToast(t(`Cannot delete ${title} without ID`));
    }
  };

  return { handleDelete, isDeleting: deleteMutation.isLoading };
};
