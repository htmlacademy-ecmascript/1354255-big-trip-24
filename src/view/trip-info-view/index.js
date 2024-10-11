import AbstractView from '@/framework/view/abstract-view';

import { createTemplate } from './create-template';

class TripInfoView extends AbstractView {
  #route = null;
  #duration = null;
  #cost = 0;

  constructor({ route, duration, cost }) {
    super();
    this.#route = route;
    this.#duration = duration;
    this.#cost = cost;
  }

  get template() {
    return createTemplate({
      route: this.#route,
      duration: this.#duration,
      cost: this.#cost
    });
  }
}

export default TripInfoView;
