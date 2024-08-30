import { PointType, getRandomArrayElement } from '@/utils';
import { mockDestinations } from './destinations';
import { mockOffers } from './offers';

const MOCK_POINTS_LENGTH = 4;

const createMockPoint = (_el, index) => {
  const mockPointType = getRandomArrayElement(Object.values(PointType));

  return {
    id: index,
    price: 1100,
    dateFrom: new Date(`2024-09-${index + 1}`),
    dateTo: new Date(`2024-10-${index + 1}`),
    destination: getRandomArrayElement(mockDestinations),
    isFavorite: Math.random() > 0.5,
    offers: mockOffers.find((offer) => offer.type === mockPointType)?.offers ?? [],
    type: mockPointType
  };
};

const createMockPoints = () => Array.from({ length: MOCK_POINTS_LENGTH }, createMockPoint);

export { createMockPoints };
