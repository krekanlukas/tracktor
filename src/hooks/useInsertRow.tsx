import { useMutation, useQueryClient } from 'react-query';

import { supabase } from '@/config/supabase/supabaseClient';
import { useAuth } from '@/context/AuthContext';

type ProjectDbRow = {
  title: string;
  color_variant: string;
  is_billable: boolean;
  price_per_hour: number | null;
  user_id: string | undefined;
  inserted_at: Date;
};

type ProjectDbRowSubset = Pick<
  ProjectDbRow,
  'title' | 'color_variant' | 'is_billable' | 'price_per_hour'
>;

type Row = ProjectDbRow;

const addRow = async (table: string, row: Row) => {
  const { error } = await supabase.from(table).insert(row, { returning: 'minimal' });
  if (error) throw error;
};

export const useInsertRow = (table: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    (row: ProjectDbRowSubset) =>
      addRow(table, { ...row, user_id: user?.id, inserted_at: new Date() }),
    {
      onSuccess: () => queryClient.refetchQueries(table),
    }
  );
};