import { render } from '@/framework/render';

import PointPresenter from '@/presenter/point-presenter';
import SortPresenter from '@/presenter/sort-presenter';
import MessageView from '@/view/message-view';
import PointListView from '@/view/point-view/point-list-view';

import {
  MessageOnLoading,
  Sort,
  sortPointsByType,
  updateItem
} from '@/utils';

class RoutePresenter {
  #points = [];
  #pointsRaw = [];
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
  }

  init() {
    this.#points = [...this.#routeModel.points];
    this.#pointsRaw = [...this.#routeModel.points];

    this.#renderRoute();
  }

  #renderRoute() {
    if(this.#points.length === 0) {
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
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#contentContainer);
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      container: this.#contentContainer,
      onSortTypeChange: this.#handleSortTypeChange
    });

    this.#sortPresenter.init();
  }

  #renderEmptyPointList() {
    render(this.#emptyPointListComponent, this.#contentContainer);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointsRaw = updateItem(this.#pointsRaw, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #sortPoints(sortType) {
    this.#points = sortPointsByType(this.#points, this.#pointsRaw, sortType);
    this.#currentSort = sortType;
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}

export default RoutePresenter;
