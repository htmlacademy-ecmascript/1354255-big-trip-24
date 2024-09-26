class DestinationsModel {
  #destinations = [];

  constructor(service) {
    this.#destinations = service.destinations;
  }

  get availableDestinations() {
    return this.#destinations.map((destination) => destination.name);
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}

export default DestinationsModel;
