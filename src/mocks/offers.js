import { PointType } from '@/utils';

const OFFERS = [
  {
    id: '1',
    title: 'Upgrade to a business class',
    price: 120,
    slug: 'business'
  },
  {
    id: '2',
    title: 'Add luggage',
    price: 30,
    slug: 'luggage'
  },
  {
    id: '3',
    title: 'Switch to comfort class',
    price: 100,
    slug: 'comfort'
  },
  {
    id: '4',
    title: 'Add meal',
    price: 15,
    slug: 'meal'
  },
  {
    id: '5',
    title: 'Choose seats',
    price: 5,
    slug: 'seats'
  },
];

const mockOffers = [
  {
    type: PointType.TAXI,
    offers: [OFFERS[0].id]
  },
  {
    type: PointType.BUS,
    offers: [OFFERS[1].id, OFFERS[3].id]
  },
  {
    type: PointType.TRAIN,
    offers: [OFFERS[2].id, OFFERS[3].id, OFFERS[4].id]
  }
];

export { mockOffers, OFFERS };
