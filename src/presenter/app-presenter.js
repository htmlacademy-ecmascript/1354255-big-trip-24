import DestinationsModel from '@/model/destinations-model';
import FiltersModel from '@/model/filters-model';
import OffersModel from '@/model/offers-model';
import RouteModel from '@/model/route-model';
import AddPointButtonPresenter from '@/presenter/add-point-button-presenter';
import FiltersPresenter from '@/presenter/filters-presenter';
import RoutePresenter from '@/presenter/route-presenter';
import MockService from '@/service/mock-service';

const mockService = new MockService();

const routeModel = new RouteModel(mockService);
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const filtersModel = new FiltersModel();

const addPointButtonPresenter = new AddPointButtonPresenter();

const filtersPresenter = new FiltersPresenter({
  filtersModel,
  routeModel
});

const routePresenter = new RoutePresenter({
  routeModel,
  destinationsModel,
  offersModel,
  filtersModel,
  addPointButtonPresenter
});

class AppPresenter {
  init() {
    addPointButtonPresenter.init({
      onButtonClick: routePresenter.addPointButtonClickHandler
    });
    filtersPresenter.init();
    routePresenter.init();
  }
}

export default AppPresenter;
