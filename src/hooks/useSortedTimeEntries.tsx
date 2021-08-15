import { useEffect, useState } from 'react';

import { useFetchRows } from '@/hooks/useFetchRows';
import { TimeEntryDbRow } from '@/hooks/useInsertRow';

const sortByDate = (data: TimeEntryDbRow[]) => {
  const filtered = data.reduce((result: Record<string, TimeEntryDbRow[]>, timeEntry) => {
    const key = new Date(timeEntry.start).toDateString();
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(timeEntry);
    return result;
  }, {});

  const sorted = Object.keys(filtered)
    .map((dateString) => new Date(dateString))
    .sort((a, b) => b.getTime() - a.getTime())
    .map((date) => date.toDateString())
    .reduce((result: Record<string, TimeEntryDbRow[]>, key) => {
      result[key] = filtered[key];
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

  useEffect(() => {
    if (data) {
      setSortedTimeEntries(sortByDate(data));
    }
    console.log('useSortedTimeEntries commit');
  }, [data]);

  console.log('useSortedTimeEntries render');
  return { sortedTimeEntries, isLoading };
};
