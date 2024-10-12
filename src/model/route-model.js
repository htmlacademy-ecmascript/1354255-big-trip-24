import Observable from '@/framework/observable';

import {
  deleteItem,
  PointErrorMessage,
  updateItem,
  UpdateType,
  MessageOnLoading
} from '@/utils';

class RouteModel extends Observable {
  #points = [];

  #service = null;
  #adapter = null;

  constructor({ service, adapter }) {
    super();
    this.#service = service;
    this.#adapter = adapter;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      const points = await this.#service.points;
      this.#points = points.map(this.#adapter.adaptToClient);

      this._notify(UpdateType.INIT);
    } catch(err) {
      this.#points = [];

      this._notify(UpdateType.ERROR, err);
      throw new Error(MessageOnLoading.FAILED);
    }
  }

  async updatePoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);

    if (index === -1) {
      this._notify(UpdateType.ERROR, PointErrorMessage.UPDATE_UNEXISTING);
    }

    try {
      const response = await this.#service.updatePoint(updatedPoint);
      const adaptedPoint = this.#adapter.adaptToClient(response);

      this.#points = updateItem(this.#points, updatedPoint, index);

      this._notify(updateType, adaptedPoint);
    } catch(err) {
      throw new Error(PointErrorMessage.UPDATE);
    }
  }

  async addPoint(updateType, point) {
    try {
      const response = await this.#service.addPoint(point);
      const newPoint = this.#adapter.adaptToClient(response);

      this.#points = [newPoint, ...this.#points];

      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error(PointErrorMessage.ADD);
    }
  }

  async deletePoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);

    if (index === -1) {
      throw new Error(PointErrorMessage.DELETE_UNEXISTING);
    }

    try {
      await this.#service.deletePoint(updatedPoint);

      this.#points = deleteItem(this.#points, index);

      this._notify(updateType);
    } catch(err) {
      throw new Error(PointErrorMessage.DELETE);
    }
  }
}

export default RouteModel;
