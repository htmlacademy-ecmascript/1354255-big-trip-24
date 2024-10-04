import { capitalizeFirstLetter } from '@/utils';

const createTemplate = (filters) => {
  const filtersTemplate = filters.map(({ type, isChecked, isDisabled }) => (
    `<div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          data-type="${type}"
          ${isChecked ? 'checked' : ''}
          ${isDisabled ? 'disabled' : ''}>

        <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFirstLetter(type)}</label>
      </div>`
  )).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export { createTemplate };
