import AbstractView from '@/framework/view/abstract-view';
import { createTemplate } from './create-template';

class SortView extends AbstractView {
  get template() {
    return createTemplate();
  }
}

export default SortView;
