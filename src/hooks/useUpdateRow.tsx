import { useMutation, useQueryClient } from 'react-query';

import { ProjectDbRow } from '@/components/Projects';
import { supabase } from '@/config/supabase/supabaseClient';
import { TimeEntryDbRow } from '@/hooks/useInsertRow';

type Row = ProjectDbRow | TimeEntryDbRow;

type QueryKeys = 'projects' | 'active_time_entry' | 'username';

const updateRow = async (table: string, updatedRow: Row, idValue: number) => {
  const { error } = await supabase.from(table).update(updatedRow).eq('id', idValue);
  if (error) throw error;
};

export const useUpdateRow = (table: string, queryKey?: QueryKeys) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ updatedRow, idValue }: { updatedRow: Row; idValue: number }) =>
      updateRow(table, updatedRow, idValue),
    {
      onSuccess: () => queryClient.refetchQueries(queryKey || table),
    }
  );
};
