import { PointType, normalizePointDate } from '@/utils';
import ComponentView from '@/view/component-view';
import { createTemplate } from './createTemplate';

const DEFAULT_POINT = {
  price: 0,
  dateFrom: normalizePointDate(Date.now()),
  dateTo: normalizePointDate(Date.now()),
  destination: {
    description: '',
    name: '',
    pictures: []
  },
  isFavorite: false,
  offers: [],
  type: PointType.BUS
};

class PointFormView extends ComponentView {
  _createTemplate = createTemplate;
  _name = 'PointFormView';

  constructor({ props = DEFAULT_POINT, availableDestinations }) {
    super({ props });
    this.availableDestinations = availableDestinations;
  }

  get template() {
    return this._createTemplate(this.props, this.availableDestinations);
  }
}

export default PointFormView;
