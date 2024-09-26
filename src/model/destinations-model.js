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

  getDestinationByName(name) {
    return this.#destinations.find((destination) => destination.name === name);
  }
}

export default DestinationsModel;
