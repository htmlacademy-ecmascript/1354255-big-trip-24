import DestinationsModel from '@/model/destinations-model';
import FiltersModel from '@/model/filters-model';
import OffersModel from '@/model/offers-model';
import RouteModel from '@/model/route-model';
import AddPointButtonPresenter from '@/presenter/add-point-button-presenter';
import FiltersPresenter from '@/presenter/filters-presenter';
import RoutePresenter from '@/presenter/route-presenter';
import TripInfoPresenter from '@/presenter/trip-info-presenter';
import DestinationsApiService from '@/service/destinations-api-service';
import OffersApiService from '@/service/offers-api-service';
import PointsApiService from '@/service/points-api-service';

import { AUTHORIZATION, END_POINT } from '@/utils';

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
const destinationsApiService = new DestinationsApiService(END_POINT, AUTHORIZATION);
const offersApiService = new OffersApiService(END_POINT, AUTHORIZATION);

const filtersModel = new FiltersModel();
const destinationsModel = new DestinationsModel(destinationsApiService);
const offersModel = new OffersModel(offersApiService);
const routeModel = new RouteModel({
  service: pointsApiService,
});

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

const tripInfoPresenter = new TripInfoPresenter({
  routeModel
});

class AppPresenter {
  init() {
    filtersPresenter.init();
    routePresenter.init();

    Promise.all([
      destinationsModel.init(),
      offersModel.init()
    ])
      .then(() => {
        routeModel.init();
      })
      .finally(() => {
        addPointButtonPresenter.init({
          onButtonClick: routePresenter.addPointButtonClickHandler
        });
      });

    tripInfoPresenter.init();
  }
}

export default AppPresenter;
