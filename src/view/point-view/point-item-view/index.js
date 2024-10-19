import AbstractView from '@/framework/view/abstract-view';
import { createTemplate } from './create-template';

class PointItemView extends AbstractView {
  #point = null;

  #offersModel = null;
  #destinationsModel = null;

  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({
    point,
    offersModel,
    destinationsModel,
    onEditClick,
    onFavoriteClick
  }) {
    super();
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#point = this.#normalizePoint(point);

    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTemplate(this.#point);
  }

  #normalizePoint(point) {
    return {
      ...point,
      destination: this.#destinationsModel.getDestinationById(point.destination),
      offers: this.#offersModel.getCheckedOffers(point),
    };
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}

export default PointItemView;
