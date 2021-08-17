import { useQuery } from 'react-query';

import { supabase } from '@/config/supabase/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { TimeEntryDbRow } from '@/hooks/useInsertRow';
import { useUpdateRow } from '@/hooks/useUpdateRow';

const MAX_HOURS = 1;

const checkLongActiveTimeEntry = (start: Date) => {
  // Check if active entry not running over 10h
  const maxTime = 1000 * 60 * 1 * MAX_HOURS;
  const timeNow = new Date().getTime();
  const startTime = new Date(start).getTime();
  return maxTime <= timeNow - startTime;
};

export const useActiveTimeEntry = () => {
  const { user } = useAuth();
  const updateMutation = useUpdateRow('time_entries');

  const fetchActiveTimeEntry = async (
    userId: string | undefined
  ): Promise<TimeEntryDbRow | null> => {
    const { data, error, status } = await supabase
      .from('time_entries')
      .select('*')
      .eq('user_id', userId)
      .is('stop', null)
      .single();

    if (error && status !== 406) throw error;
    if (checkLongActiveTimeEntry(data?.start)) {
      const stop = new Date(data?.start);
      stop.setHours(stop.getHours() + MAX_HOURS);
      await updateMutation.mutateAsync({
        updatedRow: { ...data, stop, duration: 1000 * 60 * 1 * MAX_HOURS },
        idValue: data?.id,
      });
      return null;
    }

    console.log('fetchAE', data);
    return data;
  };

  console.log('useActiveTimeEntry render');
  return useQuery('active_time_entry', () => fetchActiveTimeEntry(user?.id));
};
