import AbstractView from '@/framework/view/abstract-view';
import { createTemplate } from './create-template';

class PointListView extends AbstractView {
  get template() {
    return createTemplate();
  }
}

export default PointListView;
