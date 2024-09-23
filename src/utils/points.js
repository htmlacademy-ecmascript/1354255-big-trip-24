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

const createMockPointDate = (timeToAdd) => now
  .add(timeToAdd, 'day')
  .add(timeToAdd, 'hour')
  .add(timeToAdd ** 2, 'minute')
  .utc()
  .format();

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

const isPresentPoint = ({ dateTo }) => dayjs(dateTo) && dayjs().isAfter(dayjs(dateTo), 'millisecond');

const isPastPoint = ({ dateFrom, dateTo }) =>
  dateTo && (dayjs().isSame(dayjs(dateFrom), 'minute') || dayjs().isAfter(dateTo, 'minute'));

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

const sortByTime = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
};

const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;

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
  isPresentPoint,
  sortByPrice,
  sortByTime
};
