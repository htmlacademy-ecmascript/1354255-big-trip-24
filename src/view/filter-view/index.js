import ControlsView from '@/view/controls-view';
import { createTemplate } from './create-template';

class FilterView extends ControlsView {
  get template() {
    return createTemplate(this._items);
  }
}

export default FilterView;
