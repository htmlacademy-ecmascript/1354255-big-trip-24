import { render } from '@/framework/render';
import { generateFilters } from '@/mocks/filters';
import RouteModel from '@/model/route-model';
import RoutePresenter from '@/presenter/route-presenter';
import FilterView from '@/view/filter-view';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const mainContainerElement = document.querySelector('.trip-events');

const routeModel = new RouteModel();
const routePresenter = new RoutePresenter({
  contentContainer: mainContainerElement,
  routeModel
});

const filters = generateFilters(routeModel.points);

render(new FilterView(filters), filterContainerElement);
routePresenter.init();
