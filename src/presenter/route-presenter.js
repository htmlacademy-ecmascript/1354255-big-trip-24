import { render } from '@/render';
import PointFormView from '@/view/point-view/point-form-view';
import PointItemView from '@/view/point-view/point-item-view';
import PointListView from '@/view/point-view/point-list-view';
import SortView from '@/view/sort-view';

class RoutePresenter {
  pointListComponent = new PointListView({});

  constructor({ contentContainer, routeModel }) {
    this.contentContainer = contentContainer;
    this.routeModel = routeModel;
  }

  init() {
    this.points = [...this.routeModel.points];

    render(new SortView({}), this.contentContainer);
    render(this.pointListComponent, this.contentContainer);
    render(new PointFormView({
      props: this.points[0],
      availableDestinations: this.routeModel.availableDestinations
    }),
    this.pointListComponent.element);

    for (let i = 1; i < this.points.length; i++) {
      render(new PointItemView({ props: this.points[i] }), this.pointListComponent.element);
    }
  }

}

export default RoutePresenter;
