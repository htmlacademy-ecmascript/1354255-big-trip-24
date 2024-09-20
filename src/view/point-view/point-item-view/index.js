import AbstractView from '@/framework/view/abstract-view';
import { createTemplate } from './create-template';

class PointItemView extends AbstractView {
  #point;
  #handleEditClick;
  #handleFavoriteClick;

  constructor({ point, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
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
