import { useMutation, useQueryClient } from 'react-query';

import { supabase } from '@/config/supabase/supabaseClient';

const removeRow = async (table: string, idValue: number) => {
  const { error } = await supabase.from(table).delete().eq('id', idValue);
  if (error) throw error;
};

export const useDeleteRow = (table: string) => {
  const queryClient = useQueryClient();
  return useMutation((idValue: number) => removeRow(table, idValue), {
    onSuccess: () => queryClient.refetchQueries(table),
  });
};
