import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Sort } from '@/utils';

dayjs.extend(utc);

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const DateTimeFormat = {
  DEFAULT: 'MMM DD',
  EDIT_POINT: 'YY/MM/DD HH:mm',
  TIME: 'HH:mm'
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

const fillWithZero = (number) => String(number).length === 1 ? `0${number}` : `${number}`;

const getTimeDifference = (dateFrom, dateTo) => {
  const diffInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  let minutesLeft = diffInMinutes;

  const dayDiff = Math.floor(diffInMinutes / HOURS_IN_DAY / MINUTES_IN_HOUR);
  minutesLeft = diffInMinutes - dayDiff * HOURS_IN_DAY * MINUTES_IN_HOUR;

  const hoursDiff = Math.floor(minutesLeft / MINUTES_IN_HOUR);
  minutesLeft = hoursDiff * MINUTES_IN_HOUR;

  const minutesDiff = minutesLeft;

  if (dayDiff) {
    return `${fillWithZero(dayDiff)}D ${fillWithZero(hoursDiff)}H ${fillWithZero(minutesDiff)}M`;
  } else if (hoursDiff) {
    return `${fillWithZero(hoursDiff)}H ${fillWithZero(minutesDiff)}M`;
  } else {
    return `${fillWithZero(minutesDiff)}M`;
  }
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

const sortPointsByType = (points, pointsRaw, sortType) => {
  switch (sortType) {
    case Sort.TIME:
      return points.toSorted(sortByTime);
    case Sort.PRICE:
      return points.toSorted(sortByPrice);
    default:
      return [...pointsRaw];
  }
};

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
  sortByTime,
  sortPointsByType
};
