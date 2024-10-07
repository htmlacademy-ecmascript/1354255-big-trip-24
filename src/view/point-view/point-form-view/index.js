import flatpickr from 'flatpickr';

import AbstractStatefulView from '@/framework/view/abstract-stateful-view';

import {
  PointType,
  createDefaultPointDateFrom,
  createDefaultPointDateTo,
  pointMode
} from '@/utils';
import { createTemplate } from './create-template';

import 'flatpickr/dist/flatpickr.min.css';

const DEFAULT_POINT = {
  price: 0,
  dateFrom: createDefaultPointDateFrom(),
  dateTo: createDefaultPointDateTo(),
  destination: null,
  isFavorite: false,
  offers: [],
  type: PointType.BUS
};

class PointFormView extends AbstractStatefulView {
  #datepickerStart = null;
  #datepickerEnd = null;

  #offersModel = null;
  #destinationsModel = null;

  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleResetClick = null;

  #mode = pointMode.EDIT;

  constructor({
    point = DEFAULT_POINT,
    mode = pointMode.EDIT,
    offersModel,
    destinationsModel,
    onFormSubmit,
    onCloseClick,
    onResetClick
  }) {
    super();
    this._setState(PointFormView.parsePointToState(point));

    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#handleResetClick = onResetClick;
    this.#mode = mode;

    this.#setEventListeners();
    this.#setDatePickers();
  }

  get template() {
    return createTemplate(this._state, this.#destinationsModel.availableDestinations, this.#mode);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  _restoreHandlers() {
    this.#setEventListeners();
    this.#setDatePickers();
  }

  reset(point) {
    this.updateElement(
      PointFormView.parsePointToState(point),
    );
  }

  #setEventListeners() {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeSelectHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#pointDestinationSelectHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetClickHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceInputHandler);

    if (this.#mode === pointMode.EDIT) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    }
  }

  #setDatePickers() {
    const config = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true,
    };

    this.#setDatePickerStart(config);
    this.#setDatePickerEnd(config);
  }

  #setDatePickerStart(config) {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...config,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      }
    );
  }

  #setDatePickerEnd(config) {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...config,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        minDate: this._state.dateFrom
      }
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointFormView.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick(PointFormView.parseStateToPoint(this._state));
  };

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleResetClick(PointFormView.parseStateToPoint(this._state));
  };

  #pointTypeSelectHandler = (evt) => {
    evt.preventDefault();

    const type = evt.target.value;
    const offers = this.#offersModel.getOffersByPointType(type);

    this.updateElement({
      ...this._state,
      selectedType: type,
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

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();

    if (/\D+/g.test(evt.target.value)) {
      return;
    }

    const price = evt.target.value;

    this.updateElement({
      ...this._state,
      price,
    });
  };

  static parsePointToState(point) {
    return {
      ...point,
      selectedType: point.type,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    delete point.selectedType;

    return point;
  }

}

export default PointFormView;
