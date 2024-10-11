const DEFAULT_PRICE = 0;

const createTemplate = ({ route, duration, cost }) => (`
  <section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      ${route
    ? `<h1 class="trip-info__title">${route}</h1>`
    : ''
  }

      ${duration
    ? `<p class="trip-info__dates">${duration}</p>`
    : ''
  }
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost || DEFAULT_PRICE}</span>
    </p>
  </section>
  `
);

export { createTemplate };
