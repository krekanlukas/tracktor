import { useMutation, useQueryClient } from 'react-query';

import { supabase } from '@/config/supabase/supabaseClient';

const removeRow = async (table: string, value: number) => {
  const { error } = await supabase.from(table).delete().eq('id', value);
  if (error) throw error;
};

export const useDeleteRow = (table: string) => {
  const queryClient = useQueryClient();
  return useMutation((value: number) => removeRow(table, value), {
    onSuccess: () => queryClient.refetchQueries(table),
  });
};
