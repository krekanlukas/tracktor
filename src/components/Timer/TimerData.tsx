import { Divider, Stack } from '@chakra-ui/react';
import { Fragment } from 'react';

import { LoadingFallback } from '@/components/Common';
import {
  TimeEntriesGroup,
  TimeEntryRow,
  getFormattedDuration,
  sumDurations,
  getProjectProperties,
} from '@/components/Timer';
import { useFetchRows } from '@/hooks/useFetchRows';
import { useSortedTimeEntries } from '@/hooks/useSortedTimeEntries';

export const TimerData = () => {
  const { sortedTimeEntries, isLoading } = useSortedTimeEntries();
  const { data: projects, isLoading: isProjectsLoading } = useFetchRows('projects');
  console.log(projects, isProjectsLoading);

  console.log('TimerData render');
  return (
    <Stack direction="column" spacing={12} my={12} px={6} minH="200px">
      {isLoading ? (
        <LoadingFallback />
      ) : (
        sortedTimeEntries &&
        Object.entries(sortedTimeEntries).map(([key, timeEntries]) => (
          <TimeEntriesGroup
            key={key}
            groupTitle={key}
            groupDuration={getFormattedDuration(sumDurations(timeEntries))}
          >
            {timeEntries.map((timeEntry, index) => (
              <Fragment key={timeEntry.id}>
                <TimeEntryRow
                  timeEntry={timeEntry}
                  projectTitle={getProjectProperties(timeEntry, projects).title}
                  projectColorVariant={getProjectProperties(timeEntry, projects).colorVariant}
                />
                {index !== timeEntries.length - 1 && <Divider />}
              </Fragment>
            ))}
          </TimeEntriesGroup>
        ))
      )}
    </Stack>
  );
};
