import { render } from '@/framework/render';
import { Sort } from '@/utils';
import SortView from '@/view/sort-view';

class SortPresenter {
  #container = null;
  #sortComponent = null;
  #sortTypes = [];
  #sortTypesChangeHandler = null;

  constructor({ container, onSortTypeChange }) {
    this.#sortTypes = Object.values(Sort);
    this.#sortTypesChangeHandler = onSortTypeChange;
    this.#container = container;
  }

  init() {
    this.#sortComponent = new SortView({
      items: this.#sortTypes,
      onItemChange: this.#sortTypesChangeHandler
    });

    render(this.#sortComponent, this.#container);
  }
}

export default SortPresenter;
