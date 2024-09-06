import ComponentView from '@/view/component-view';
import { createTemplate } from './create-template';

class SortView extends ComponentView {
  _createTemplate = createTemplate;
  _name = 'SortView';
}

export default SortView;
