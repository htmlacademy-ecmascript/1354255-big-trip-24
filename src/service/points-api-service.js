import ApiService from '@/framework/api-service';

import { ApiEndpoint, Method } from '@/utils';

class PointsApiService extends ApiService {
  #adapter = null;

  constructor(endpoint, authorization, adapter) {
    super(endpoint, authorization);

    this.#adapter = adapter;
  }

  get points() {
    return this._load({ url: ApiEndpoint.POINTS })
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${ApiEndpoint.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adapter.adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}

export default PointsApiService;
