import { remove, render } from '@/framework/render';
import { Sort } from '@/utils';
import SortView from '@/view/sort-view';

class SortPresenter {
  #sort = [];

  #container = null;
  #sortComponent = null;

  #sortTypesChangeHandler = null;

  constructor({ container, currentSort, onSortTypeChange }) {
    this.#sort = Object.values(Sort).map((sortType) => ({
      type: sortType,
      isChecked: sortType === currentSort
    }));
    this.#sortTypesChangeHandler = onSortTypeChange;
    this.#container = container;
  }

  init() {
    this.#sortComponent = new SortView({
      items: this.#sort,
      onItemChange: this.#sortTypesChangeHandler,
    });

    render(this.#sortComponent, this.#container);
  }

  destroy() {
    remove(this.#sortComponent);
  }
}

export default SortPresenter;
