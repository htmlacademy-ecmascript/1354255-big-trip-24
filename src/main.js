import RoutePresenter from './presenter/route-presenter';
import { render } from './render';
import FilterView from './view/filter-view';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const mainContainerElement = document.querySelector('.trip-events');
const routePresenter = new RoutePresenter({ contentContainer: mainContainerElement });

render(new FilterView(), filterContainerElement);
routePresenter.init();
