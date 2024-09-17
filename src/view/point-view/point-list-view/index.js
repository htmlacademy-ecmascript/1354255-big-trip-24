import AbstractView from '@/framework/view/abstract-view';
import { createTemplate } from './create-template';

class PointListView extends AbstractView {
  #props;

  constructor({ props }) {
    super();
    this.#props = props;
  }

  get template() {
    return createTemplate(this.#props);
  }
}

export default PointListView;
