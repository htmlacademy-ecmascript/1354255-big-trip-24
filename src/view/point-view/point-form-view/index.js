import AbstractStatefulView from '@/framework/view/abstract-stateful-view';
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

class PointFormView extends AbstractStatefulView {
  #availableDestinations = [];

  #offersModel = null;

  #handleFormSubmit = null;
  #handleCloseClick = null;

  constructor({
    point = DEFAULT_POINT,
    availableDestinations,
    offersModel,
    onFormSubmit,
    onCloseClick,
  }) {
    super();
    this._setState(PointFormView.parsePointToState(point));

    this.#availableDestinations = availableDestinations;
    this.#offersModel = offersModel;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;

    this.#setEventListeners();
  }

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    return point;
  }

  get template() {
    return createTemplate(this._state, this.#availableDestinations);
  }

  #setEventListeners() {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeSelectHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointFormView.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick(PointFormView.parseStateToPoint(this._state));
  };

  #pointTypeSelectHandler = (evt) => {
    evt.preventDefault();

    const type = evt.target.value;
    const offers = this.#offersModel.getOffersByPointType(type);

    this.updateElement({
      ...this._state,
      type,
      offers,
    });
  };

  _restoreHandlers() {
    this.#setEventListeners();
  }
}

export default PointFormView;
