class OffersModel {
  #offers = [];

  #service = null;

  constructor(service) {
    this.#service = service;
    this.#offers = this.#service.offers;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    this.#offers = await this.#service.offers;
    return this.#offers;
  }

  getOfferById(id) {
    return this.#offers.find((offer) => offer.id === id);
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
