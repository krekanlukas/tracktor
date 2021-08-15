import { useMutation, useQueryClient } from 'react-query';

import { ProjectDbRow } from '@/components/Projects';
import { supabase } from '@/config/supabase/supabaseClient';
import { useAuth } from '@/context/AuthContext';

type ProjectDbRowSubset = Pick<
  ProjectDbRow,
  'title' | 'color_variant' | 'is_billable' | 'price_per_hour'
>;

export type TimeEntryDbRow = {
  id?: number | undefined;
  user_id: string | undefined;
  inserted_at: Date;
  start: Date;
  stop: Date | null;
  project_id: number | null;
  duration: number | null;
  is_billable: boolean;
  description: string | null;
};

type TimeEntryDbRowSubset = Pick<
  TimeEntryDbRow,
  'start' | 'stop' | 'project_id' | 'duration' | 'description' | 'is_billable'
>;

type QueryKeys = 'projects' | 'active_time_entry' | 'username';

type Row = ProjectDbRow | TimeEntryDbRow;

const addRow = async (table: string, row: Row) => {
  const { error } = await supabase.from(table).insert(row, { returning: 'minimal' });
  if (error) throw error;
};

export const useInsertRow = (table: string, queryKey?: QueryKeys) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    (row: ProjectDbRowSubset | TimeEntryDbRowSubset) =>
      addRow(table, { ...row, user_id: user?.id, inserted_at: new Date() }),
    {
      onSuccess: () => queryClient.refetchQueries(queryKey || table),
    }
  );
};
