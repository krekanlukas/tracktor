export const getFormatedDistance = (start: Date, end?: Date) => {
  const endTime = end ? end.getTime() : new Date().getTime();
  const distance = endTime - start.getTime();
  const hours = Math.floor(distance / (1000 * 60 * 60 * 24));
  const minutes = ('0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
  const seconds = ('0' + Math.floor((distance % (1000 * 60)) / 1000)).slice(-2);
  return `${hours}:${minutes}:${seconds}`;
};
