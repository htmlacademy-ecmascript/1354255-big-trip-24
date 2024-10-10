class DestinationsModel {
  #destinations = [];

  #service = null;

  constructor(service) {
    this.#service = service;
    this.#destinations = this.#service.destinations;
  }

  async init() {
    this.#destinations = await this.#service.destinations;
    return this.#destinations;
  }

  get destinations() {
    return this.#destinations;
  }

  get availableDestinations() {
    return this.#destinations.map((destination) => destination.name);
  }

  isValidName(name) {
    return !!this.availableDestinations.includes(name);
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  getDestinationByName(name) {
    return this.#destinations.find((destination) => destination.name === name);
  }
}

export default DestinationsModel;
