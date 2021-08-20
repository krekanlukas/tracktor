import _ from 'lodash';
import { useEffect, useState } from 'react';

import { useFetchRows, TimeEntryDbRow } from '@/hooks/db';

const sortByDate = (data: TimeEntryDbRow[]) => {
  const filtered = data.reduce((result: Record<string, TimeEntryDbRow[]>, timeEntry) => {
    const key = new Date(timeEntry.start).toDateString();
    if (!result[key]) {
      result[key] = [];
    }
    if (timeEntry.stop) {
      result[key].push(timeEntry);
    }
    return result;
  }, {});

  const sorted = Object.keys(filtered)
    .map((dateString) => new Date(dateString))
    .sort((a, b) => b.getTime() - a.getTime())
    .map((date) => date.toDateString())
    .reduce((result: Record<string, TimeEntryDbRow[]>, key) => {
      result[key] = _.orderBy(filtered[key], 'start', 'desc');
      return result;
    }, {});

  return sorted;
};

export const useSortedTimeEntries = () => {
  const { data, isLoading } = useFetchRows('time_entries');
  const [sortedTimeEntries, setSortedTimeEntries] = useState<Record<
    string,
    TimeEntryDbRow[]
  > | null>(null);
  const [sortingLoading, setSortingLoading] = useState(true);

  useEffect(() => {
    setSortingLoading(true);
    if (data) {
      setSortedTimeEntries(sortByDate(data));
    }
    setSortingLoading(false);
    console.log('useSortedTimeEntries commit');
  }, [data]);

  console.log('useSortedTimeEntries render');
  return { sortedTimeEntries, isLoading, sortingLoading };
};
