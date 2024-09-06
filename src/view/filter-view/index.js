import ComponentView from '@/view/component-view';
import { createTemplate } from './create-template';

class FilterView extends ComponentView {
  _createTemplate = createTemplate;
  _name = 'FilterView';
}

export default FilterView;
