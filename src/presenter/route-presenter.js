import { render } from '../render';
import PointFormView from '../view/route/point-form-view';
import PointItemView from '../view/route/point-item-view';
import PointListView from '../view/route/point-list-view';
import SortView from '../view/route/sort-view';

const POINTS_TO_SHOW = 3;

class RoutePresenter {
  pointListComponent = new PointListView();

  constructor({ contentContainer }) {
    this.contentContainer = contentContainer;
  }

  init() {
    render(new SortView(), this.contentContainer);
    render(this.pointListComponent, this.contentContainer);
    render(new PointFormView(), this.pointListComponent.element);

    for (let i = 0; i < POINTS_TO_SHOW; i++) {
      render(new PointItemView(), this.pointListComponent.element);
    }
  }

}

export default RoutePresenter;
