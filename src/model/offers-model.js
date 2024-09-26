class OffersModel {
  #offers = [];

  constructor(service) {
    this.#offers = service.offers;
  }

  getOfferById(id) {
    return this.#offers.find((offer) => offer.id === id);
  }
}

export default OffersModel;
