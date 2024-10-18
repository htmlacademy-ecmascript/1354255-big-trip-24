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
  MINUTES_DURATION: 'mm[M]',
  TRIP: 'D MMM'
};

const pointMode = {
  NEW: 'new',
  EDIT: 'edit'
};

const formatDate = (date, format = DateTimeFormat.DEFAULT) => date ? dayjs(date).format(format) : '';

const getTimeDifference = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));
  const daysInYear = Math.floor(dayjs.duration(diff).asDays());

  if (dayjs.duration(diff).years()) {
    return `${daysInYear}D ${dayjs.duration(diff).format(DateTimeFormat.HOURS_DURATION)}`;
  }

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

const isFuturePoint = ({ dateFrom }) => dayjs(dateFrom).isAfter(dayjs(), 'D');

const isPresentPoint = ({ dateFrom, dateTo }) =>
  (dayjs(dateFrom).isBefore(dayjs(), 'D') || dayjs(dateFrom).isSame(dayjs(), 'D'))
  && (dayjs(dateTo).isAfter(dayjs(), 'D') || dayjs(dateTo).isSame(dayjs(), 'D'));

const isPastPoint = ({ dateTo }) => dayjs(dateTo).isBefore(dayjs(), 'D');

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

const sortByDate = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortByTime = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  const pointADuration = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDuration = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return weight ?? pointBDuration - pointADuration;
};

const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortPointsByType = (points, sortType) => {
  switch (sortType) {
    case Sort.TIME:
      return points.toSorted(sortByTime);
    case Sort.PRICE:
      return points.toSorted(sortByPrice);
    default:
      return points.toSorted(sortByDate);
  }
};

const parseDate = (point, key) => point[key] !== null ? new Date(point[key]) : point[key];

const createOfferSlug = (title) => title
  .toLowerCase()
  .split(/\s/g)
  .sort((a, b) => b.length - a.length)
  .slice(0, 2)
  .join('-');

const getCheckedOffers = (allOffers, checkedOffersIds) =>
  allOffers.map((offer) => ({
    ...offer,
    isChecked: checkedOffersIds.includes(offer.id)
  }));

const getOffersCost = (offers) => offers.reduce((acc, offer) => {
  if (offer.isChecked) {
    acc += offer.price;
  }
  return acc;
}, 0);

export {
  createOfferSlug,
  DateTimeFormat,
  formatDate,
  getCheckedOffers,
  getOffersCost,
  getTimeDifference,
  isFuturePoint,
  isPastPoint,
  isPresentPoint,
  parseDate,
  pointMode,
  sortPointsByType,
};
