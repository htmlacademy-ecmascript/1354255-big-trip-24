import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const normalizePointDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export {
  capitalizeFirstLetter,
  getRandomArrayElement,
  normalizePointDate
};
