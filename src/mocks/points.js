import { PointType, createMockPointDate, getRandomArrayElement } from '@/utils';
import { nanoid } from 'nanoid';
import { mockDestinations } from './destinations';
import { mockOffers } from './offers';

const MOCK_POINTS_LENGTH = 4;

const createMockPoint = (_el, index) => {
  const mockPointType = getRandomArrayElement(Object.values(PointType));

  return {
    id: nanoid(),
    price: 1100,
    dateFrom: createMockPointDate(index - 2),
    dateTo: createMockPointDate(index - 1),
    destination: getRandomArrayElement(mockDestinations),
    isFavorite: Math.random() > 0.5,
    offers: mockOffers.find((offer) => offer.type === mockPointType)?.offers ?? [],
    type: mockPointType
  };
};

const createMockPoints = () => Array.from({ length: MOCK_POINTS_LENGTH }, createMockPoint);

export { createMockPoints };
