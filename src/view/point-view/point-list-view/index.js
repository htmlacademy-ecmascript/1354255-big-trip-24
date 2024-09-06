import ComponentView from '@/view/component-view';
import { createTemplate } from './create-template';

class PointListView extends ComponentView {
  _createTemplate = createTemplate;
  _name = 'PointListView';
}

export default PointListView;
