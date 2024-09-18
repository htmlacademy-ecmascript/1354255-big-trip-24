import AbstractView from '@/framework/view/abstract-view';
import { PointType, createDefaultPointDateFrom, createDefaultPointDateTo } from '@/utils';
import { createTemplate } from './createTemplate';

const DEFAULT_POINT = {
  price: 0,
  dateFrom: createDefaultPointDateFrom(),
  dateTo: createDefaultPointDateTo(),
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
  #point;
  #availableDestinations;
  #handleFormSubmit;
  #handleCloseClick;

  constructor({
    point = DEFAULT_POINT,
    availableDestinations,
    onFormSubmit,
    onCloseClick
  }) {
    super();
    this.#point = point;
    this.#availableDestinations = availableDestinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;

    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
  }

  get template() {
    return createTemplate(this.#point, this.#availableDestinations);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };
}

export default PointFormView;
