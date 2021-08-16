import { WeekRange } from './types';

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
