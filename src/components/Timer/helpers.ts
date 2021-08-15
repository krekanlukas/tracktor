import { TimeEntryDbRow } from '@/hooks/useInsertRow';

const getHoursString = (distance: number) => {
  return Math.floor(distance / (1000 * 60 * 60 * 24));
};
const getMinutesString = (distance: number) => {
  return ('0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
};
const getSecondsString = (distance: number) => {
  return ('0' + Math.floor((distance % (1000 * 60)) / 1000)).slice(-2);
};

export const getFormattedDistance = (start: Date, end?: Date) => {
  const endTime = end ? end.getTime() : new Date().getTime();
  const distance = endTime - start.getTime();
  const hours = getHoursString(distance);
  const minutes = getMinutesString(distance);
  const seconds = getSecondsString(distance);
  return `${hours}:${minutes}:${seconds}`;
};

export const getFormattedDuration = (duration: number | null) => {
  if (duration)
    return `${getHoursString(duration)}:${getMinutesString(duration)}:${getSecondsString(
      duration
    )}`;
  return '';
};

export const formatTime = (time: string | Date) => {
  if (time) return new Date(time).toLocaleTimeString('sk-SK').slice(0, -3);
  return '';
};

export const formatDateHeading = (dateString: string) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (today.toDateString() === dateString) {
    return 'Today';
  }
  if (yesterday.toDateString() === dateString) {
    return 'Yesterday';
  }
  const splitted = dateString.slice(0, -5).split(' ');
  return `${splitted[0]}, ${splitted[2]} ${splitted[1]}`;
};

export const sumDurations = (timeEntries: TimeEntryDbRow[]) => {
  return timeEntries.reduce((sum, timeEntry) => {
    sum += timeEntry.duration ?? 0;
    return sum;
  }, 0);
};
