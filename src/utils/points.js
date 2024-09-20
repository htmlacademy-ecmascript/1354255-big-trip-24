import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const DateTimeFormat = {
  DEFAULT: 'MMM DD',
  EDIT_POINT: 'YY/MM/DD HH:mm',
  TIME: 'HH:mm',
  DURATION: 'H[H] m[M]'
};

const now = dayjs();

const createDefaultPointDateFrom = () => now.utc().format();

const createDefaultPointDateTo = () => now.add(1, 'hour').utc().format();

const createMockPointDate = (daysToAdd) => now.add(daysToAdd, 'day').utc().format();

const formatPointDate = (date) => date ? dayjs(date).format(DateTimeFormat.DEFAULT) : '';

const formatEditPointDate = (date) => date ? dayjs(date).format(DateTimeFormat.EDIT_POINT) : '';

const getTimeFromDate = (date) => date ? dayjs(date).format(DateTimeFormat.TIME) : '';

const getTimeDifference = (dateFrom, dateTo) => dayjs(dayjs(dateTo).diff(dayjs(dateFrom), 'minute')).format(DateTimeFormat.DURATION);

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
