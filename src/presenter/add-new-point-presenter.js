import { remove, render, RenderPosition } from '@/framework/render';

import PointFormView from '@/view/point-view/point-form-view';

import { pointMode, UpdateType, UserAction } from '@/utils';

class AddNewPointPresenter {
  #destinationsModel = null;
  #offersModel = null;

  #container = null;
  #addPointComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({
    container,
    destinationsModel,
    offersModel,
    onDataChange,
    onDestroy
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#addPointComponent) {
      return;
    }

    this.#addPointComponent = new PointFormView({
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onFormSubmit: this.#handleFormSubmit,
      onResetClick: this.#cancelClickHandler,
      mode: pointMode.NEW
    });

    render(this.#addPointComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (!this.#addPointComponent) {
      return;
    }

    remove(this.#addPointComponent);
    this.#addPointComponent = null;
    this.#handleDestroy();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving = () => {
    this.#addPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    this.#addPointComponent.shake(this.#resetFormState);
  };

  #resetFormState = () => {
    this.#addPointComponent.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange (
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #cancelClickHandler = () => {
    this.destroy();
  };
}

export default AddNewPointPresenter;
