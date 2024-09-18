import AbstractView from '@/framework/view/abstract-view';
import { createTemplate } from './create-template';

class FilterView extends AbstractView {
  #filters;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createTemplate(this.#filters);
  }
}

export default FilterView;
