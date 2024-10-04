import AbstractView from '@/framework/view/abstract-view';
import { createTemplate } from './create-template';

class AddPointButtonView extends AbstractView {
  #handleButtonClick = null;

  constructor({ onNewPointButtonClick }) {
    super();
    this.#handleButtonClick = onNewPointButtonClick;

    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  get template() {
    return createTemplate();
  }

  setDisabled(isDisabled) {
    this.element.disabled = isDisabled;
  }

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };
}

export default AddPointButtonView;
