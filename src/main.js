import RouteModel from './model/route-model';
import RoutePresenter from './presenter/route-presenter';
import { render } from './render';
import FilterView from './view/filter-view';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const mainContainerElement = document.querySelector('.trip-events');

const routeModel = new RouteModel();
const routePresenter = new RoutePresenter({
  contentContainer: mainContainerElement,
  routeModel
});

render(new FilterView({}), filterContainerElement);
routePresenter.init();
