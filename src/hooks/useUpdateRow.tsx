import { useMutation, useQueryClient } from 'react-query';

import { ProjectDbRow } from '@/components/Projects';
import { supabase } from '@/config/supabase/supabaseClient';

type Row = ProjectDbRow;

const updateRow = async (table: string, updatedRow: Row, idValue: number) => {
  const { error } = await supabase.from(table).update(updatedRow).eq('id', idValue);
  if (error) throw error;
};

export const useUpdateRow = (table: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ updatedRow, idValue }: { updatedRow: Row; idValue: number }) =>
      updateRow(table, updatedRow, idValue),
    {
      onSuccess: () => queryClient.refetchQueries(table),
    }
  );
};
