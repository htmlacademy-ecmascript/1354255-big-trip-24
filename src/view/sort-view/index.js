import AbstractView from '@/framework/view/abstract-view';
import { normalizeSortType } from '@/utils';
import { createTemplate } from './create-template';

class SortView extends AbstractView {
  #handleSortTypeChange = () => {};

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(normalizeSortType(evt.target.value));
  };
}

export default SortView;
