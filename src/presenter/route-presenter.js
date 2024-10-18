import { remove, render, RenderPosition } from '@/framework/render';
import UiBlocker from '@/framework/ui-blocker/ui-blocker';

import AddNewPointPresenter from '@/presenter/add-new-point-presenter';
import PointPresenter from '@/presenter/point-presenter';
import SortPresenter from '@/presenter/sort-presenter';
import MessageView from '@/view/message-view';
import PointListView from '@/view/point-view/point-list-view';

import {
  EmptyFilterMessage,
  filter,
  FilterType,
  MessageOnLoading,
  Sort,
  sortPointsByType,
  UpdateType,
  UserAction
} from '@/utils';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

class RoutePresenter {
  #currentSort = Sort.DAY;
  #currentFilter = FilterType.EVERYTHING;
  #isLoading = true;
  #error = null;
  #isCreatingPoint = false;

  #routeModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersModel = null;

  #contentContainer = null;
  #emptyPointListComponent = null;
  #pointListComponent = new PointListView();
  #loadingComponent = new MessageView(MessageOnLoading.LOADING);
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  #sortPresenter = null;
  #pointPresenters = new Map();
  #addNewPointPresenter = null;
  #addPointButtonPresenter = null;

  constructor({
    routeModel,
    destinationsModel,
    offersModel,
    filtersModel,
    addPointButtonPresenter
  }) {
    this.#contentContainer = document.querySelector('.trip-events');

    this.#routeModel = routeModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;
    this.#addPointButtonPresenter = addPointButtonPresenter;

    this.#routeModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = this.#routeModel.points;
    this.#currentFilter = this.#filtersModel.filter;

    const filteredPoints = filter[this.#currentFilter](points);
    return sortPointsByType(filteredPoints, this.#currentSort);
  }

  init() {
    this.#addNewPointPresenter = new AddNewPointPresenter({
      container: this.#pointListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#addPointDestroyHandler
    });

    this.#renderRoute();
  }

  addPointButtonClickHandler = () => {
    this.#isCreatingPoint = true;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addPointButtonPresenter.disableButton();
    this.#addNewPointPresenter.init();
  };

  #renderRoute() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0 && !this.#isCreatingPoint) {
      this.#renderEmptyPointList();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      onCloseNewPoint: this.#handleCloseNewPoint
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#contentContainer);
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      container: this.#contentContainer,
      currentSort: this.#currentSort,
      onSortTypeChange: this.#handleSortTypeChange
    });

    this.#sortPresenter.init();
  }

  #renderEmptyPointList() {
    this.#emptyPointListComponent = new MessageView(EmptyFilterMessage[this.#currentFilter]);
    render(this.#emptyPointListComponent, this.#contentContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#contentContainer, RenderPosition.AFTERBEGIN);
  }

  #renderError() {
    const errorComponent = new MessageView(this.#error);
    render(errorComponent, this.#contentContainer, RenderPosition.AFTERBEGIN);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #clearSort() {
    this.#sortPresenter?.destroy();
  }

  #clearRoute(resetSortType = false) {
    this.#clearPointList();
    this.#clearSort();
    remove(this.#emptyPointListComponent);

    if (resetSortType) {
      this.#currentSort = Sort.DAY;
    }
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }

    this.#currentSort = sortType;

    this.#clearRoute();
    this.#renderRoute();
  };

  #handleViewAction = async (actionType, updateType, updatedPoint) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(updatedPoint.id).setSaving();
        try {
          await this.#routeModel.updatePoint(updateType, updatedPoint);
        } catch {
          this.#pointPresenters.get(updatedPoint.id).setAborting();
        }
        break;

      case UserAction.ADD_POINT:
        this.#addNewPointPresenter.setSaving();
        try {
          await this.#routeModel.addPoint(updateType, updatedPoint);
        } catch(err) {
          this.#addNewPointPresenter.setAborting();
        }
        break;

      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(updatedPoint.id).setDeleting();
        try {
          await this.#routeModel.deletePoint(updateType, updatedPoint);
        } catch {
          this.#pointPresenters.get(updatedPoint.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;

      case UpdateType.MINOR:
        this.#clearRoute();
        this.#renderRoute();
        break;

      case UpdateType.MAJOR:
        this.#clearRoute(true);
        this.#renderRoute();
        break;

      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderRoute();
        break;

      case UpdateType.ERROR:
        this.#isLoading = false;
        this.#error = data;
        remove(this.#loadingComponent);
        this.#clearRoute();
        this.#renderError();
        break;
    }
  };

  #handleCloseNewPoint = () => this.#addNewPointPresenter.destroy();

  #addPointDestroyHandler = () => {
    this.#isCreatingPoint = false;
    this.#addPointButtonPresenter.enableButton();

    if (this.points.length === 0) {
      this.#clearRoute();
      this.#renderRoute();
    }
  };
}

export default RoutePresenter;
