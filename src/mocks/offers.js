import { PointType } from '@/utils/consts';

const mockOffers = [
  {
    type: PointType.TAXI,
    offers: [
      {
        id: '1',
        title: 'Upgrade to a business class',
        price: 120,
        slug: 'business'
      },
    ]
  },
  {
    type: PointType.FLIGHT,
    offers: [
      {
        id: '1',
        title: 'Add luggage',
        price: 30,
        slug: 'luggage'
      },
      {
        id: '2',
        title: 'Switch to comfort class',
        price: 100,
        slug: 'comfort'
      },
      {
        id: '3',
        title: 'Add meal',
        price: 15,
        slug: 'meal'
      },
      {
        id: '4',
        title: 'Choose seats',
        price: 5,
        slug: 'seats'
      },
    ]
  },
  {
    type: PointType.BUS,
    offers: [
      {
        id: '1',
        title: 'Add luggage',
        price: 30,
        slug: 'luggage'
      },
      {
        id: '2',
        title: 'Choose seats',
        price: 5,
        slug: 'seats'
      },
    ]
  }
];

export { mockOffers };
