import { capitalizeFirstLetter } from '@/utils';

const FILTERS = ['everything', 'future', 'present', 'past'];

const createTemplate = () => {
  const filtersTemplate = FILTERS.map((filter, index) => {
    const isChecked = index === 0 ? 'checked' : '';

    return (
      `<div class="trip-filters__filter">
        <input
          id="filter-${filter}"
          class="trip-filters__filter-input visually-hidden"
          type="radio"
          name="trip-filter"
          value="${filter}"
          ${isChecked}>

        <label class="trip-filters__filter-label" for="filter-${filter}">${capitalizeFirstLetter(filter)}</label>
      </div>`
    );
  }).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export { createTemplate };
