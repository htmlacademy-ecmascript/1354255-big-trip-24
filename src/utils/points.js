import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

import { Sort } from '@/utils';

dayjs.extend(duration);
dayjs.extend(utc);

const MSECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const MSECONDS_IN_HOUR = MSECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
const MSECONDS_IN_DAY = MSECONDS_IN_HOUR * HOURS_IN_DAY;

const DateTimeFormat = {
  DEFAULT: 'MMM DD',
  EDIT_POINT: 'YY/MM/DD HH:mm',
  TIME: 'HH:mm',
  DAYS_DURATION: 'DD[D] HH[H] mm[M]',
  HOURS_DURATION: 'HH[H] mm[M]',
  MINUTES_DURATION: 'mm[M]'
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
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));

  if (diff >= MSECONDS_IN_DAY) {
    return dayjs.duration(diff).format(DateTimeFormat.DAYS_DURATION);
  }

  if (diff >= MSECONDS_IN_HOUR) {
    return dayjs.duration(diff).format(DateTimeFormat.HOURS_DURATION);
  }

  if (diff < MSECONDS_IN_HOUR) {
    return dayjs.duration(diff).format(DateTimeFormat.MINUTES_DURATION);
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

const sortPointsByType = (points, sortType) => {
  switch (sortType) {
    case Sort.TIME:
      return points.toSorted(sortByTime);
    case Sort.PRICE:
      return points.toSorted(sortByPrice);
    default:
      return [...points];
  }
};

const pointMode = {
  NEW: 'new',
  EDIT: 'edit'
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
  pointMode,
  sortByPrice,
  sortByTime,
  sortPointsByType
};
