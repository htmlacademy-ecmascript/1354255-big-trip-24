import { remove, render, replace } from '@/framework/render';

import FilterView from '@/view/filter-view';

import { FilterType, UpdateType, filter } from '@/utils';

class FiltersPresenter {
  #routeModel = null;
  #filtersModel = null;

  #filterComponent = null;

  constructor({ routeModel, filtersModel }) {
    this.#routeModel = routeModel;
    this.#filtersModel = filtersModel;

    this.#filtersModel.addObserver(this.#handleModelEvent);
    this.#routeModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return Object.values(FilterType).map((type) => ({
      type,
      isChecked: type === this.#filtersModel.filter,
      isDisabled: !filter[type](this.#routeModel.points).length
    }));
  }

  init() {
    const filterContainerElement = document.querySelector('.trip-controls__filters');

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      items: this.filters,
      onItemChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, filterContainerElement);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #handleModelEvent = () => {
    this.init();
  };
}

export default FiltersPresenter;
