import ComponentView from '@/view/component-view';
import { createTemplate } from './create-template';

class PointItemView extends ComponentView {
  _createTemplate = createTemplate;
  _name = 'PointItemView';
}

export default PointItemView;
