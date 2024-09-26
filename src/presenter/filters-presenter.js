import { render } from '@/framework/render';

import FilterView from '@/view/filter-view';

import { generateFilters } from '@/utils';

class FiltersPresenter {
  #points = [];

  constructor({ points }) {
    this.#points = points;
  }

  init() {
    const filterContainerElement = document.querySelector('.trip-controls__filters');
    const filters = this.#generateFilters();

    render(new FilterView({ items: filters }), filterContainerElement);
  }

  #generateFilters() {
    return generateFilters(this.#points);
  }
}

export default FiltersPresenter;
