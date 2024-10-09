import ApiService from '@/framework/api-service';

import { ApiEndpoint } from '@/utils';

class OffersApiService extends ApiService {
  get offers() {
    return this._load({ url: ApiEndpoint.OFFERS })
      .then(ApiService.parseResponse);
  }
}

export default OffersApiService;
