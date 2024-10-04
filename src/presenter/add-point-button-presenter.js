import { render } from '@/framework/render';
import AddPointButtonView from '@/view/add-point-button-view';

class AddPointButtonPresenter {
  #buttonComponent = null;
  #handleButtonClick = null;

  init({ onButtonClick }) {
    const container = document.querySelector('.trip-main');

    this.#handleButtonClick = onButtonClick;

    this.#buttonComponent = new AddPointButtonView({
      onNewPointButtonClick: this.#buttonClickHandler
    });

    render(this.#buttonComponent, container);
  }

  disableButton() {
    this.#buttonComponent.setDisabled(true);
  }

  enableButton() {
    this.#buttonComponent.setDisabled(false);
  }

  #buttonClickHandler = () => {
    this.#handleButtonClick();
  };
}

export default AddPointButtonPresenter;
