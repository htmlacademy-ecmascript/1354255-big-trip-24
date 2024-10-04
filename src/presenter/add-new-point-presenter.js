import { nanoid } from 'nanoid';

import { remove, render, RenderPosition } from '@/framework/render';

import AddNewPointView from '@/view/add-new-point-view';
import PointFormView from '@/view/point-view/point-form-view';

import { UpdateType, UserAction } from '@/utils';

class AddNewPointPresenter {
  #addNewPointComponent = null;

  #destinationsModel = null;
  #offersModel = null;

  #handleAddPointButtonClick = null;

  #pointListContainer = null;
  #addPointComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({
    onAddPointButtonClick,
    destinationsModel,
    offersModel,
    pointListContainer,
    onDataChange
  }) {
    this.#handleAddPointButtonClick = onAddPointButtonClick;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
  }

  init() {
    if (this.#addNewPointComponent) {
      return;
    }

    const addNewPointContainerElement = document.querySelector('.trip-main');

    this.#addNewPointComponent = new AddNewPointView({
      onAddPointButtonClick: this.#handleAddPointButtonClick
    });

    render(this.#addNewPointComponent, addNewPointContainerElement, RenderPosition.BEFOREEND);
  }

  initNewPoint() {
    if (this.#addPointComponent) {
      return;
    }

    this.#addPointComponent = new PointFormView({
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onFormSubmit: this.#handleFormSubmit,
    });

    render(this.#addPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
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

  #handleFormSubmit = (point) => {
    this.#handleDataChange (
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: nanoid(), ...point }
    );
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}

export default AddNewPointPresenter;
