import { capitalizeFirstLetter, Sort } from '@/utils';

const SORT_DISABLED = [Sort.EVENT, Sort.OFFER];

const createTemplate = (items) => {
  const template = items.map(({ type, isChecked }) => {
    const isDisabled = SORT_DISABLED.includes(type) ? 'disabled' : '';

    return (
      `<div class="trip-sort__item trip-sort__item--${type}">
        <input
          id="sort-${type}"
          class="trip-sort__input  visually-hidden"
          type="radio" name="trip-sort"
          value="sort-${type}"
          data-type="${type}"
          ${isChecked ? 'checked' : ''}
          ${isDisabled}>
        <label class="trip-sort__btn" for="sort-${type}">${capitalizeFirstLetter(type)}</label>
      </div>`
    );
  }).join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${template}
    </form>`
  );
};

export { createTemplate };
