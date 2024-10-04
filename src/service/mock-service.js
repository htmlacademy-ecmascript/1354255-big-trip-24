import { createMockPoint } from '@/mocks/create-mocks';
import { mockDestinations } from '@/mocks/destinations';
import { mockOffers, OFFERS } from '@/mocks/offers';

class MockService {
  #POINTS_LENGTH = 4;

  #destinations = [];
  #points = [];
  #offers = [];


  constructor() {
    this.#destinations = this.#generateDestinations();
    this.#points = this.#generatePoints();
    this.#offers = this.#generateOffers();
  }

  get destinations() {
    return this.#destinations;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  #generateDestinations() {
    return mockDestinations;
  }

  #generatePoints() {
    return Array.from({ length: this.#POINTS_LENGTH }, createMockPoint);
  }

  #generateOffers() {
    return mockOffers;
  }

  getOfferById(id) {
    return OFFERS.find((offer) => offer.id === id);
  }

  updatePoint(updatedPoint) {
    return updatedPoint;
  }

  addPoint(point) {
    return point;
  }
}

export default MockService;
