import { mockDestinations } from '@/mocks/destinations';
import { createMockPoints } from '@/mocks/points';

class RouteModel {
  #points = createMockPoints();
  #availableDestinations = mockDestinations.map((destination) => destination.name);

  get points() {
    return this.#points;
  }

  get availableDestinations() {
    return this.#availableDestinations;
  }
}

export default RouteModel;
