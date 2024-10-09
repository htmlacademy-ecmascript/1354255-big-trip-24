import {
  PointType,
  capitalizeFirstLetter,
  formatEditPointDate,
  pointMode
} from '@/utils';

const availablePointTypes = Object.values(PointType);

const createEventTypeTemplate = (type, selectedType) => {
  const pointsList = availablePointTypes.map((point) => {
    const isChecked = point === selectedType ? 'checked' : '';

    return (
      `<div class="event__type-item">
        <input
          id="event-type-${point}-1"
          class="event__type-input
          visually-hidden"
          type="radio"
          name="event-type"
          value="${point}"
          ${isChecked}
          >
        <label class="event__type-label  event__type-label--${point}" for="event-type-${point}-1">${capitalizeFirstLetter(point)}</label>
      </div>`
    );
  }).join('');

  return (
    `<div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${pointsList}
          </fieldset>
        </div>
      </div>`
  );
};

const createEventDestinationTemplate = (type, place, availableDestinations) => {
  const destinationsList = availableDestinations.map((destination) => (
    `<option value="${destination}"></option>`
  )).join('');

  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input
        class="event__input  event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value="${place || ''}"
        list="destination-list-1">
      <datalist id="destination-list-1">
        ${destinationsList}
      </datalist>
    </div>`
  );
};

const createEventTimeTemplate = (dateFrom, dateTo) => (
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input
      class="event__input  event__input--time"
      id="event-start-time-1"
      type="text"
      name="event-start-time"
      value="${formatEditPointDate(dateFrom)}">
    —
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input
      class="event__input  event__input--time"
      id="event-end-time-1"
      type="text" name="event-end-time"
      value="${formatEditPointDate(dateTo)}">
  </div>`
);

const createEventPriceTemplate = (price) => (
  `<div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
    <span class="visually-hidden">Price</span>
      €
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
  </div>`
);

const createHeaderTemplate = ({
  basePrice,
  dateFrom,
  dateTo,
  type,
  place,
  availableDestinations,
  selectedType,
  mode
}) => {
  const isEditing = mode === pointMode.EDIT;
  const resetButtonText = isEditing ? 'Delete' : 'Cancel';


  return (
    `<header class="event__header">
      ${createEventTypeTemplate(type, selectedType)}
      ${createEventDestinationTemplate(type, place, availableDestinations)}
      ${createEventTimeTemplate(dateFrom, dateTo)}
      ${createEventPriceTemplate(basePrice)}

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${resetButtonText}</button>
      ${isEditing
      ? `<button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>`
      : ''
    }
    </header>`
  );
};

const createOffersSectionTemplate = (offers) => {
  if (!offers.length) {
    return '';
  }

  const offersTemplate = offers.map(({ slug, title, price }) => (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${slug}-1" type="checkbox" name="event-offer-${slug}">
      <label class="event__offer-label" for="event-offer-${slug}-1">
        <span class="event__offer-title">${title}</span>
        +€&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  )).join('');

  return (
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersTemplate}
        </div>
      </section>
  `);
};

const createPhotosTemplate = (photos) => {
  if (!photos.length) {
    return '';
  }

  const photosTemplate = photos.map((photo) => (
    `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`
  )).join('');

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photosTemplate}
      </div>
    </div>`
  );
};

const createDestinationSectionTemplate = (description, photos) => (
  `<section class="event__section event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${createPhotosTemplate(photos)}
  </section>`
);

const createTemplate = (state, availableDestinations, mode) => {
  const {
    destination,
    offers,
    price,
    dateFrom,
    dateTo,
    type,
    selectedType
  } = state;

  return (
    `<form class="event event--edit" action="#" method="post">
      ${createHeaderTemplate({
      price,
      dateFrom,
      dateTo,
      type,
      availableDestinations,
      place: destination.name,
      selectedType,
      mode
    })}
      <section class="event__details">
        ${createOffersSectionTemplate(offers)}
        ${destination.description
      ? createDestinationSectionTemplate(destination.description, destination.pictures)
      : ''}
      </section>
    </form>`
  );
};

export { createTemplate };
