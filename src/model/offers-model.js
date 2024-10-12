class OffersModel {
  #offers = [];

  #service = null;

  constructor(service) {
    this.#service = service;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    this.#offers = await this.#service.offers;
    return this.#offers;
  }

  getOffersByPointType(type) {
    const existingOffer = this.#offers.find((offer) => offer.type === type);

    if (!existingOffer) {
      return [];
    }

    return existingOffer.offers;
  }
}

export default OffersModel;
