import { capitalizeFirstLetter, normalizePointDate } from '@/utils';

const createDateTemplate = (dateFrom) => {
  const normalizedStartDate = normalizePointDate(dateFrom);

  return `<time class="event__date" datetime="${dateFrom}">${normalizedStartDate}</time>`;
};

const createPlaceTemplate = (type, city) => (
  `<div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${capitalizeFirstLetter(type)} ${city}</h3>
  `
);

const createScheduleTemplate = (dateFrom, dateTo) => (
  `<div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${dateFrom}T10:30">10:30</time>
        —
      <time class="event__end-time" datetime="${dateTo}T11:00">11:00</time>
    </p>
    <p class="event__duration">30M</p>
  </div>`
);

const createPriceTemplate = (price) => (
  `<p class="event__price">
    €&nbsp;<span class="event__price-value">${price}</span>
  </p>`
);

const createOffersTemplate = (offers) => {
  if (!offers.length) {
    return '';
  }

  const offersTemplate = offers.map((offer) => (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      +€&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`
  )).join('');

  return (
    `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offersTemplate}
    </ul>`
  );
};

const createFavoriteButtonTemplate = (isFavorite) => {
  const isFavoriteClass = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<button class="event__favorite-btn ${isFavoriteClass}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
      </svg>
    </button>`
  );
};

const createTemplate = (point) => {
  const {
    price,
    dateFrom,
    dateTo,
    destination,
    type,
    offers,
    isFavorite
  } = point;

  return (
    `<li class="trip-events__item">
      <div class="event">
        ${createDateTemplate(dateFrom)}
        ${createPlaceTemplate(type, destination.name)}
        ${createScheduleTemplate(dateFrom, dateTo)}
        ${createPriceTemplate(price)}
        ${createOffersTemplate(offers)}
        ${createFavoriteButtonTemplate(isFavorite)}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export { createTemplate };
