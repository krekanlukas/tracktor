import { WeekRange } from '@/components/Reports';
import { GroupedTimeEntry } from '@/hooks';

// CONSTANTS
export const TITLE_CELL_MIN_WIDTH = '180px';
export const CELL_MIN_WIDTH = '70px';

export const getWeekRange = (date: Date, action?: 'next' | 'previous'): WeekRange => {
  const current = new Date(date);
  current.setHours(0, 0, 0, 0);
  let step = 1;
  if (action === 'next') step += 7;
  if (action === 'previous') step -= 7;
  const firstDay = current.getDate() - current.getDay() + step;
  const lastDay = firstDay + 6;

  return {
    firstDay: new Date(current.setDate(firstDay)),
    lastDay: new Date(current.setDate(lastDay)),
  };
};

export const formatWeekRange = ({ firstDay, lastDay }: WeekRange) => {
  const currentWeekRange = getWeekRange(new Date());
  const lastWeek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastWeekRange = getWeekRange(lastWeek);

  if (firstDay >= currentWeekRange.firstDay && firstDay <= currentWeekRange.lastDay) {
    return 'This week';
  }

  if (firstDay >= lastWeekRange.firstDay && firstDay <= lastWeekRange.lastDay) {
    return 'Last week';
  }

  return `${firstDay.toLocaleDateString('SK-sk')} - ${lastDay.toLocaleDateString('SK-sk')}`;
};

export const getWeekDays = (language?: string) => {
  if (language === 'sk') return ['Pon', 'Uto', 'Str', 'Stv', 'Pia', 'Sob', 'Ned'] as const;
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
};

export const getDaysArray = ({ firstDay, lastDay }: WeekRange) => {
  const daysArray: string[] = [];
  const currentDate = new Date(firstDay);
  const lastDate = new Date(lastDay);

  while (currentDate <= lastDate) {
    daysArray.push(new Date(currentDate).toDateString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return daysArray;
};

export const mapDurations = (timeEntries: GroupedTimeEntry[], daysArray: string[]) => {
  return timeEntries.map((timeEntry) => {
    return {
      ...timeEntry,
      durations: daysArray.map((dayString) => {
        if (dayString === new Date(timeEntry.start).toDateString()) {
          return timeEntry.duration;
        }
        return null;
      }),
    };
  });
};

export const mapDurationsWithSum = (timeEntries: GroupedTimeEntry[], daysArray: string[]) => {
  return daysArray.map((dayString) => {
    const durationSum = timeEntries.reduce((sum, timeEntry) => {
      if (new Date(timeEntry.start).toDateString() === dayString) {
        sum += timeEntry.duration;
      }
      return sum;
    }, 0);
    return durationSum;
  });
};

export const sumDurations = (durations: (number | null)[]) => {
  const sum = durations.reduce((sum, duration) => {
    if (sum === null) sum = 0;
    if (duration) sum += duration;
    return sum;
  }, 0);
  return sum ?? 0;
};
