import { render } from '@/framework/render';
import PointPresenter from '@/presenter/point-presenter';
import { MessageOnLoading, updateItem } from '@/utils';
import MessageView from '@/view/message-view';
import PointListView from '@/view/point-view/point-list-view';
import SortView from '@/view/sort-view';

class RoutePresenter {
  #points = [];
  #contentContainer = null;
  #routeModel = null;

  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #emptyPointListComponent = new MessageView(MessageOnLoading.EMPTY_ROUTE);

  #pointPresenters = new Map();

  constructor({ contentContainer, routeModel }) {
    this.#contentContainer = contentContainer;
    this.#routeModel = routeModel;
  }

  init() {
    this.#points = [...this.#routeModel.points];

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
    render(this.#sortComponent, this.#contentContainer);
  }

  #renderEmptyPointList() {
    render(this.#emptyPointListComponent, this.#contentContainer);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}

export default RoutePresenter;
