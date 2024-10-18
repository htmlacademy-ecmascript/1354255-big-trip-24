import ApiService from '@/framework/api-service';

import PointsAdapter from '@/adapter/points-adapter';

import { ApiEndpoint, Method } from '@/utils';

class PointsApiService extends ApiService {
  #url = ApiEndpoint.POINTS;

  get points() {
    return this._load({ url: this.#url })
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${this.#url}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsAdapter.adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: this.#url,
      method: Method.POST,
      body: JSON.stringify(PointsAdapter.adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `${this.#url}/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }
}

export default PointsApiService;
