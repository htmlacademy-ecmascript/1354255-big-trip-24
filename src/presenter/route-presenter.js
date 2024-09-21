import { render } from '@/framework/render';
import PointPresenter from '@/presenter/point-presenter';
import { MessageOnLoading, Sort, sortByPrice, sortByTime, updateItem } from '@/utils';
import MessageView from '@/view/message-view';
import PointListView from '@/view/point-view/point-list-view';
import SortView from '@/view/sort-view';

class RoutePresenter {
  #points = [];
  #pointsRaw = [];
  #contentContainer = null;
  #routeModel = null;
  #currentSort = Sort.DAY;

  #sortComponent = null;
  #pointListComponent = new PointListView();
  #emptyPointListComponent = new MessageView(MessageOnLoading.EMPTY_ROUTE);

  #pointPresenters = new Map();

  constructor({ contentContainer, routeModel }) {
    this.#contentContainer = contentContainer;
    this.#routeModel = routeModel;
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
      availableDestinations: this.#routeModel.availableDestinations,
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
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#contentContainer);
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
    switch (sortType) {
      case Sort.TIME:
        this.#points.sort(sortByTime);
        break;
      case Sort.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = [...this.#pointsRaw];
    }

    this.#currentSort = sortType;
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}

export default RoutePresenter;
