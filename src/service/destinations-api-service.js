import ApiService from '@/framework/api-service';

import { ApiEndpoint } from '@/utils';

class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({ url: ApiEndpoint.DESTINATIONS })
      .then(ApiService.parseResponse);
  }
}

export default DestinationsApiService;
