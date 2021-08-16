import { Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';

import { ContentTopbar, EmptyPageMessage } from '@/components/Common';
import {
  ReportDatePeriod,
  DateFilterButtons,
  getWeekRange,
  ReportsData,
} from '@/components/Reports';
import { useLanguage } from '@/context/LanguageContext';

export const ReportsPage = () => {
  const { t } = useLanguage();
  const [datePeriod, setDatePeriod] = useState<ReportDatePeriod>('Weekly');
  const [selectedRange, setSelectedRange] = useState(() => getWeekRange(new Date()));
  const isEmpty = false;

  // const fetchData = async () => {
  //   const { data, error } = await supabase.from('time_entries').select(`
  //     *,
  //     project: project_id (
  //       id,
  //       title
  //     )
  //   `);
  //   if (error) console.log(error);
  //   console.log(data);
  // };

  console.log('Reports render');
  return (
    <Flex grow={1} w="full" direction="column">
      <ContentTopbar>
        <Heading>{t('Reports')}</Heading>
      </ContentTopbar>
      <DateFilterButtons
        datePeriod={datePeriod}
        setDatePeriod={setDatePeriod}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
      {!isEmpty ? (
        <ReportsData />
      ) : (
        <Flex grow={1} justify="center">
          <EmptyPageMessage info={t('Try different filters or track some time.')} />
        </Flex>
      )}
    </Flex>
  );
};
