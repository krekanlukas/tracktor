import { useMutation, useQueryClient } from 'react-query';

import { supabase } from '@/config/supabase/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { Row, QueryKey, ProjectDbRowSubset, TimeEntryDbRowSubset } from '@/hooks/db';

const addRow = async (table: string, row: Row) => {
  const { error } = await supabase.from(table).insert(row, { returning: 'minimal' });
  if (error) throw error;
};

export const useInsertRow = (table: string, queryKey?: QueryKey) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    (row: ProjectDbRowSubset | TimeEntryDbRowSubset) =>
      addRow(table, { ...row, user_id: user?.id, inserted_at: new Date() }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(queryKey || table);
      },
    }
  );
};
