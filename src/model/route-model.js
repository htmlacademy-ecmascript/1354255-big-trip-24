class RouteModel {
  #points = [];

  constructor(service) {
    this.#points = service.points;
  }

  get points() {
    return this.#points;
  }
}

export default RouteModel;
