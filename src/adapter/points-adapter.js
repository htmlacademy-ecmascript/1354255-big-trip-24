import { getCheckedOffers, parseDate } from '@/utils';

class PointsAdapter {
  #destinationsModel = null;
  #offersModel = null;

  constructor({ destinationsModel, offersModel }) {
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  adaptToClient = (point) => {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: parseDate(point, 'date_from'),
      dateTo: parseDate(point, 'date_to'),
      isFavorite: point['is_favorite'],
      destination: this.#destinationsModel.getDestinationById(point.destination),
      offers: getCheckedOffers(this.#offersModel.getOffersByPointType(point.type), point.offers)
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };

  adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      destination: point.destination?.id,
      offers: point.offers.filter((offer) => offer.isChecked).map((offer) => offer.id),
      'base_price':  parseInt(point.basePrice, 10),
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : point.dateFrom,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : point.dateTo,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.name;

    return adaptedPoint;
  }
}

export default PointsAdapter;
