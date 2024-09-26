import { generateFilters } from '@/mocks/filters';
import RouteModel from '@/model/route-model';
import FiltersPresenter from '@/presenter/filters-presenter';
import RoutePresenter from '@/presenter/route-presenter';

const mainContainerElement = document.querySelector('.trip-events');

const routeModel = new RouteModel();
const routePresenter = new RoutePresenter({
  contentContainer: mainContainerElement,
  routeModel
});

const filters = generateFilters(routeModel.points);
const filtersPresenter = new FiltersPresenter({
  filters
});

class AppPresenter {
  init() {
    filtersPresenter.init();
    routePresenter.init();
  }
}

export default AppPresenter;
