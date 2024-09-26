class OffersModel {
  #service = null;

  constructor(service) {
    this.#service = service;
  }

  getOfferById(id) {
    return this.#service.getOfferById(id);
  }

  getOffersByPointType(type) {
    const existedOffer = this.#service.offers.find((offer) => offer.type === type);

    if (!existedOffer) {
      return [];
    }

    return existedOffer.offers.map((offerId) => this.getOfferById(offerId));
  }
}

export default OffersModel;
