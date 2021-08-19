import _, { Dictionary } from 'lodash';
import { useState, useEffect } from 'react';

import { WeekRange } from '@/components/Reports';
import { supabase } from '@/config/supabase/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { useCustomToast } from '@/hooks';

export type GroupedTimeEntry = {
  id: number;
  description: string;
  duration: number;
  project: {
    id: number;
    title: string;
    color_variant: string;
  } | null;
  start: Date;
};

export const useWeeklyReports = (selectedRange: WeekRange) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Dictionary<GroupedTimeEntry[]> | null>();
  const { errorToast } = useCustomToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const { data, error } = await supabase
          .from('time_entries')
          .select(
            `
              id,
              description,
              duration,
              start,
              project: project_id (
                id,
                title,
                color_variant
              )
            `
          )
          .eq('user_id', user?.id)
          .gte('start', selectedRange.firstDay.toUTCString())
          .lte('stop', selectedRange.lastDay.toUTCString());

        if (error) throw error;

        const groupedData = _.chain(data)
          .groupBy((timeEntry: GroupedTimeEntry) => _.get(timeEntry, 'project.id', 'No project'))
          .mapKeys((timeEntries: GroupedTimeEntry[], key) => timeEntries[0].project?.title || key)
          .value();

        setData(groupedData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        errorToast(`Error`, error.message);
      }
    };

    fetchData();
  }, [errorToast, selectedRange.firstDay, selectedRange.lastDay, user?.id]);

  console.log('useWeeklyReports render');
  return { data, isLoading };
};
