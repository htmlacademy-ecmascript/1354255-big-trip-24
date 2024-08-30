import { mockDestinations } from '@/mocks/destinations';
import { createMockPoints } from '@/mocks/points';

class RouteModel {
  _points = createMockPoints();
  _availableDestinations = mockDestinations.map((destination) => destination.name);

  get points() {
    return this._points;
  }

  get availableDestinations() {
    return this._availableDestinations;
  }
}

export default RouteModel;
