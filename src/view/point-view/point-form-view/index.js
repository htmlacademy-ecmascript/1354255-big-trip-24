import AbstractView from '@/framework/view/abstract-view';
import { PointType, normalizePointDate } from '@/utils';
import { createTemplate } from './createTemplate';

const DEFAULT_POINT = {
  price: 0,
  dateFrom: normalizePointDate(Date.now()),
  dateTo: normalizePointDate(Date.now()),
  destination: {
    description: '',
    name: '',
    pictures: []
  },
  isFavorite: false,
  offers: [],
  type: PointType.BUS
};

class PointFormView extends AbstractView {
  #props;
  #availableDestinations;

  constructor({ props = DEFAULT_POINT, availableDestinations }) {
    super();
    this.#props = props;
    this.#availableDestinations = availableDestinations;
  }

  get template() {
    return createTemplate(this.#props, this.#availableDestinations);
  }
}

export default PointFormView;
