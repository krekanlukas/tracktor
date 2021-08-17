import { Divider, Flex, Stack } from '@chakra-ui/react';
import { Fragment } from 'react';

import { EmptyPageMessage, LoadingFallback } from '@/components/Common';
import {
  TimeEntriesGroup,
  TimeEntryRow,
  getFormattedDuration,
  sumDurations,
  getProjectProperties,
} from '@/components/Timer';
import { useLanguage } from '@/context/LanguageContext';
import { useFetchRows } from '@/hooks/useFetchRows';
import { useSortedTimeEntries } from '@/hooks/useSortedTimeEntries';

export const TimerData = () => {
  const { t } = useLanguage();
  const { sortedTimeEntries, isLoading } = useSortedTimeEntries();
  const { data: projects, isLoading: isProjectsLoading } = useFetchRows('projects');

  console.log('TimerData render', sortedTimeEntries, isLoading);
  return (
    <Stack direction="column" spacing={12} my={12} px={6} minH="200px" flexGrow={1}>
      {sortedTimeEntries && Object.keys(sortedTimeEntries).length > 0 ? (
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
      ) : (
        <Flex grow={1} align="center" justify="center">
          {isLoading || isProjectsLoading ? (
            <LoadingFallback />
          ) : (
            <EmptyPageMessage info={t('Go ahead and track some time.')} />
          )}
        </Flex>
      )}
    </Stack>
  );
};
