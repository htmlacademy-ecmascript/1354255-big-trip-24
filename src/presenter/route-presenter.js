import { remove, render } from '@/framework/render';

import PointPresenter from '@/presenter/point-presenter';
import SortPresenter from '@/presenter/sort-presenter';
import MessageView from '@/view/message-view';
import PointListView from '@/view/point-view/point-list-view';

import {
  MessageOnLoading,
  Sort,
  sortPointsByType,
  UpdateType,
  UserAction
} from '@/utils';

class RoutePresenter {
  #currentSort = Sort.DAY;

  #routeModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #contentContainer = null;
  #pointListComponent = new PointListView();
  #emptyPointListComponent = new MessageView(MessageOnLoading.EMPTY_ROUTE);

  #sortPresenter = null;
  #pointPresenters = new Map();

  constructor({
    routeModel,
    destinationsModel,
    offersModel
  }) {
    this.#contentContainer = document.querySelector('.trip-events');

    this.#routeModel = routeModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#routeModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = this.#normalizePoints(this.#routeModel.points);

    return sortPointsByType(points, this.#currentSort);
  }

  init() {
    this.#renderRoute();
  }

  #renderRoute() {
    if(this.points.length === 0) {
      this.#renderEmptyPointList();
      return;
    }

    this.#renderSort(this.#currentSort);
    this.#renderPointList();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
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
    render(this.#emptyPointListComponent, this.#contentContainer);
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

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #clearSort() {
    this.#sortPresenter.destroy();
  }

  #normalizePoints(points) {
    return points.map((point) => ({
      ...point,
      destination: this.#destinationsModel.getDestinationById(point.destination),
      offers: point.offers.map((offerId) => this.#offersModel.getOfferById(offerId))
    }));
  }

  #handleViewAction = (actionType, updateType, updatedPoint) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#routeModel.updatePoint(updateType, updatedPoint);
        break;
      case UserAction.ADD_POINT:
        this.#routeModel.addPoint(updateType, updatedPoint);
        break;
      case UserAction.DELETE_POINT:
        this.#routeModel.deletePoint(updateType, updatedPoint);
        break;
    }
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
    }
  };

  #clearRoute(resetSortType = false) {
    this.#clearPointList();
    this.#clearSort();
    remove(this.#emptyPointListComponent);

    if (resetSortType) {
      this.#currentSort = Sort.DEFAULT;
    }
  }
}

export default RoutePresenter;
