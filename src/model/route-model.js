import Observable from '@/framework/observable';

import { UpdateType } from '@/utils';

class RouteModel extends Observable {
  #points = [];

  #service = null;
  #adapter = null;

  #error = null;

  constructor({ service, adapter }) {
    super();
    this.#service = service;
    this.#adapter = adapter;
  }

  get points() {
    return this.#points;
  }

  async init({ loadAdditionalInfo }) {
    try {
      await loadAdditionalInfo();

      const points = await this.#service.points;
      this.#points = points.map(this.#adapter.adaptToClient);
    } catch(err) {
      this.#points = [];
      this.#error = err;
    }

    this._notify(UpdateType.INIT, { error: this.#error });
  }


  updatePoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      updatedPoint,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, updatedPoint);
  }

  addPoint(updateType, updatedPoint) {
    this.#points = [
      updatedPoint,
      ...this.#points,
    ];

    this._notify(updateType, updatedPoint);
  }

  deletePoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}

export default RouteModel;
