import { parseDate } from '@/utils';

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
      offers: this.#offersModel.getOffersByPointType(point.type)
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
      'base_price':  point.basePrice,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}

export default PointsAdapter;
