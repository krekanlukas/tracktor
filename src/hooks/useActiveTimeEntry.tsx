import { useQuery } from 'react-query';

import { supabase } from '@/config/supabase/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { TimeEntryDbRow } from '@/hooks/useInsertRow';

const fetchActiveTimeEntry = async (userId: string | undefined): Promise<TimeEntryDbRow> => {
  const { data, error, status } = await supabase
    .from('time_entries')
    .select('*')
    .eq('user_id', userId)
    .is('stop', null)
    .single();
  if (error && status !== 406) throw error;
  return data;
};

export const useActiveTimeEntry = () => {
  const { user } = useAuth();
  console.log('useActiveTimeEntry render');
  return useQuery('active_time_entry', () => fetchActiveTimeEntry(user?.id));
};
