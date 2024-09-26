import { render } from '@/framework/render';
import FilterView from '@/view/filter-view';

class FiltersPresenter {
  #filters = [];

  constructor({ filters }) {
    this.#filters = filters;
  }

  init() {
    const filterContainerElement = document.querySelector('.trip-controls__filters');

    render(new FilterView({ items: this.#filters }), filterContainerElement);
  }
}

export default FiltersPresenter;
