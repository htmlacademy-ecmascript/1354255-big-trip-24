import AbstractView from '@/framework/view/abstract-view';
import { createTemplate } from './create-template';

class AddNewPointView extends AbstractView {
  #handleAddPointButtonClick = null;

  constructor({ onAddPointButtonClick }) {
    super();
    this.#handleAddPointButtonClick = onAddPointButtonClick;
    this.#setEventListeners();
  }

  get template() {
    return createTemplate();
  }

  #setEventListeners() {
    this.element.addEventListener('click', this.#addPointButtonClickHandler);
  }

  #addPointButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleAddPointButtonClick();
  };
}

export default AddNewPointView;
