import { Divider, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';

import { ContentTopbar, EmptyPageMessage, LoadingFallback } from '@/components/Common';
import {
  ReportView,
  DateFilterButtons,
  getWeekRange,
  TimeSumsTable,
  TimeSumsRowsGroup,
} from '@/components/Reports';
import { useLanguage } from '@/context/LanguageContext';
import { useWeeklyReports } from '@/hooks/useWeeklyReports';

export const ReportsPage = () => {
  const { t } = useLanguage();
  const [reportView, setReportView] = useState<ReportView>('Details');
  const [selectedRange, setSelectedRange] = useState(() => getWeekRange(new Date()));
  const { data, isLoading } = useWeeklyReports(selectedRange);

  console.log('Reports render', data, isLoading);
  return (
    <Flex grow={1} w="full" direction="column">
      <ContentTopbar>
        <Heading>{t('Reports')}</Heading>
      </ContentTopbar>
      <DateFilterButtons
        reportView={reportView}
        setReportView={setReportView}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
      {data && Object.keys(data).length > 0 ? (
        <TimeSumsTable>
          <Divider />
          {Object.entries(data).map(([key, timeEntries]) => (
            <TimeSumsRowsGroup
              key={key}
              timeEntries={timeEntries}
              title={key}
              selectedRange={selectedRange}
            />
          ))}
        </TimeSumsTable>
      ) : (
        <Flex grow={1} justify="center">
          {isLoading ? (
            <LoadingFallback />
          ) : (
            <EmptyPageMessage info={t('Try different filters or track some time.')} />
          )}
        </Flex>
      )}
    </Flex>
  );
};
