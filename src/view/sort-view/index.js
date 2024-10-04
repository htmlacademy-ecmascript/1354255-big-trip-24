import ControlsView from '@/view/controls-view';
import { createTemplate } from './create-template';

class SortView extends ControlsView {
  get template() {
    return createTemplate(this._items);
  }
}

export default SortView;
