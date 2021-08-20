import { useMutation, useQueryClient } from 'react-query';

import { supabase } from '@/config/supabase/supabaseClient';
import { TimeEntryDbRow, ProjectDbRow } from '@/hooks/db';

type Row = ProjectDbRow | TimeEntryDbRow;

type QueryKey = 'projects' | 'active_time_entry' | 'username' | 'time_entries';

const updateRow = async (table: string, updatedRow: Row, idValue: number) => {
  const { error } = await supabase.from(table).update(updatedRow).eq('id', idValue);
  if (error) throw error;
};

export const useUpdateRow = (table: string, queryKey?: QueryKey | QueryKey[]) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ updatedRow, idValue }: { updatedRow: Row; idValue: number }) =>
      updateRow(table, updatedRow, idValue),
    {
      onSuccess: () => {
        if (!queryKey) {
          queryClient.refetchQueries(table);
          return;
        }
        if (Array.isArray(queryKey)) {
          queryKey.forEach((queryKey) => queryClient.refetchQueries(queryKey));
          return;
        }
        queryClient.refetchQueries(queryKey);
      },
    }
  );
};
