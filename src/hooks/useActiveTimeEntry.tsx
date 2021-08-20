import { useQuery } from 'react-query';

import { supabase } from '@/config/supabase/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { TimeEntryDbRow, useUpdateRow } from '@/hooks/db';

const MAX_HOURS = 10;
const MAX_TIME = 1000 * 60 * 60 * MAX_HOURS;

const checkLongActiveTimeEntry = (start: Date) => {
  // Check if active entry not running over max time
  const timeNow = new Date().getTime();
  const startTime = new Date(start).getTime();
  return MAX_TIME <= timeNow - startTime;
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
        updatedRow: { ...data, stop, duration: MAX_TIME },
        idValue: data?.id,
      });
      return null;
    }
    return data;
  };

  console.log('useActiveTimeEntry render');
  return useQuery('active_time_entry', () => fetchActiveTimeEntry(user?.id));
};
