import { capitalizeFirstLetter, FilterType } from '@/utils';

const createTemplate = (filters) => {
  const filtersTemplate = filters.map((filter) => {
    const isChecked = filter.type === FilterType.EVERYTHING ? 'checked' : '';
    const isDisabled = filter.count === 0 ? 'disabled' : '';

    return (
      `<div class="trip-filters__filter">
        <input
          id="filter-${filter.type}"
          class="trip-filters__filter-input visually-hidden"
          type="radio"
          name="trip-filter"
          value="${filter.type}"
          ${isChecked}
          ${isDisabled}>

        <label class="trip-filters__filter-label" for="filter-${filter.type}">${capitalizeFirstLetter(filter.type)}</label>
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
