import DestinationsModel from '@/model/destinations-model';
import OffersModel from '@/model/offers-model';
import RouteModel from '@/model/route-model';
import FiltersPresenter from '@/presenter/filters-presenter';
import RoutePresenter from '@/presenter/route-presenter';
import MockService from '@/service/mock-service';

const mockService = new MockService();

const routeModel = new RouteModel(mockService);
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);

const routePresenter = new RoutePresenter({
  routeModel,
  destinationsModel,
  offersModel
});

const filtersPresenter = new FiltersPresenter({
  points: routeModel.points
});

class AppPresenter {
  init() {
    filtersPresenter.init();
    routePresenter.init();
  }
}

export default AppPresenter;
