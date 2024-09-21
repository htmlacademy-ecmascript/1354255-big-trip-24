import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const MINUTES_IN_HOUR = 60;

const DateTimeFormat = {
  DEFAULT: 'MMM DD',
  EDIT_POINT: 'YY/MM/DD HH:mm',
  TIME: 'HH:mm',
  DURATION: 'hH mM'
};

const now = dayjs();

const createDefaultPointDateFrom = () => now.utc().format();

const createDefaultPointDateTo = () => now.add(1, 'hour').utc().format();

const createMockPointDate = (daysToAdd) => now.add(daysToAdd, 'day').utc().format();

const formatPointDate = (date) => date ? dayjs(date).format(DateTimeFormat.DEFAULT) : '';

const formatEditPointDate = (date) => date ? dayjs(date).format(DateTimeFormat.EDIT_POINT) : '';

const getTimeFromDate = (date) => date ? dayjs(date).format(DateTimeFormat.TIME) : '';

const getTimeDifference = (dateFrom, dateTo) => {
  const diffInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  const hoursDiff = Math.floor(diffInMinutes / MINUTES_IN_HOUR);
  const minutesDiff = diffInMinutes - hoursDiff * MINUTES_IN_HOUR;

  return DateTimeFormat.DURATION.replace('h', hoursDiff).replace('m', minutesDiff);
};

const isFuturePoint = ({ dateFrom }) => dayjs().isBefore(dateFrom, 'minute');

const isPresentPoint = ({ dateTo }) => dayjs(dateTo) && dayjs().isAfter(dayjs(dateTo), 'milliseconds');

const isPastPoint = ({ dateFrom, dateTo }) => dateTo && (dayjs().isSame(dayjs(dateFrom), 'minute') || dayjs().isAfter(dateTo, 'minute'));

export {
  createDefaultPointDateFrom,
  createDefaultPointDateTo,
  createMockPointDate,
  formatEditPointDate,
  formatPointDate,
  getTimeDifference,
  getTimeFromDate,
  isFuturePoint,
  isPastPoint,
  isPresentPoint
};
