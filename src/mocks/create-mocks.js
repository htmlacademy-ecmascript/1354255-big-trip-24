import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { nanoid } from 'nanoid';

import { mockDestinations } from './destinations';
import { mockOffers } from './offers';

import { PointType } from '@/utils';

dayjs.extend(utc);

const allPointTypes = Object.values(PointType);

const getRandomNumberInRange = (max) => Math.floor(Math.random() * max);

const getRandomArrayElement = (items) => items[getRandomNumberInRange(items.length)];

const createMockPointDate = (timeToAdd) => dayjs()
  .add(timeToAdd, 'day')
  .add(timeToAdd, 'hour')
  .add(timeToAdd ** 2, 'minute')
  .utc()
  .format();

const createMockDestination = () => getRandomArrayElement(mockDestinations).id;

const createMockOffers = (mockPointType) =>
  mockOffers.find((offer) => offer.type === mockPointType)?.offers || [];

const createMockPoint = (_el, index) => {
  const mockPointType = getRandomArrayElement(allPointTypes);

  return {
    id: nanoid(),
    price: 100 * (index + 1),
    dateFrom: createMockPointDate(index - 2),
    dateTo: createMockPointDate(index - 1),
    destination: createMockDestination(),
    isFavorite: Math.random() > 0.5,
    offers: createMockOffers(mockPointType),
    type: mockPointType
  };
};

export { createMockPoint };
