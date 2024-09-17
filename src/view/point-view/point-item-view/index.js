import AbstractView from '@/framework/view/abstract-view';
import { createTemplate } from './create-template';

class PointItemView extends AbstractView {
  #point;
  #handleEditClick;

  constructor({ point, onEditClick }) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}

export default PointItemView;
