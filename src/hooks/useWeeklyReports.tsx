import { useToast } from '@chakra-ui/react';
import _, { Dictionary } from 'lodash';
import { useState, useEffect } from 'react';

import { WeekRange } from '@/components/Reports';
import { supabase } from '@/config/supabase/supabaseClient';
import { useAuth } from '@/context/AuthContext';

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
  const toast = useToast();

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
        toast({
          status: 'error',
          isClosable: true,
          duration: 9000,
          title: `Error`,
          description: error.message,
        });
      }
    };

    fetchData();
  }, [selectedRange.firstDay, selectedRange.lastDay, toast, user?.id]);

  console.log('useWeeklyReports render');
  return { data, isLoading };
};
