import { render, replace } from '@/framework/render';
import PointFormView from '@/view/point-view/point-form-view';
import PointItemView from '@/view/point-view/point-item-view';
import PointListView from '@/view/point-view/point-list-view';
import SortView from '@/view/sort-view';

class RoutePresenter {
  #pointListComponent = new PointListView();

  constructor({ contentContainer, routeModel }) {
    this.contentContainer = contentContainer;
    this.routeModel = routeModel;
  }

  init() {
    this.points = [...this.routeModel.points];

    render(new SortView(), this.contentContainer);
    render(this.#pointListComponent, this.contentContainer);

    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointItemView({
      point,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new PointFormView({
      point: this.points[0],
      availableDestinations: this.routeModel.availableDestinations,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointListComponent.element);
  }
}

export default RoutePresenter;
