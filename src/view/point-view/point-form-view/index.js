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
  #offersModel = null;
  #destinationsModel = null;

  #handleFormSubmit = null;
  #handleCloseClick = null;

  constructor({
    point = DEFAULT_POINT,
    offersModel,
    destinationsModel,
    onFormSubmit,
    onCloseClick,
  }) {
    super();
    this._setState(PointFormView.parsePointToState(point));

    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#setEventListeners();
  }

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }

  get template() {
    return createTemplate(this._state, this.#destinationsModel.availableDestinations);
  }

  #setEventListeners() {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeSelectHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#pointDestinationSelectHandler);
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

  #pointDestinationSelectHandler = (evt) => {
    evt.preventDefault();

    if (!this.#destinationsModel.isValidName(evt.target.value)) {
      return;
    }

    const name = evt.target.value;
    const destination = this.#destinationsModel.getDestinationByName(name);

    this.updateElement({
      ...this._state,
      name,
      destination,
    });
  };

  _restoreHandlers() {
    this.#setEventListeners();
  }

  reset(point) {
    this.updateElement(
      PointFormView.parsePointToState(point),
    );
  }
}

export default PointFormView;
