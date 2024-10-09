const PointType = Object.freeze({
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEENIG: 'sightseeing',
  RESTAURANT: 'restaurant'
});

const MessageOnLoading = Object.freeze({
  EMPTY_ROUTE: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILED: 'Failed to load latest route information'
});

const FilterType = Object.freeze({
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
});

const EmptyFilterMessage = Object.freeze({
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now'
});

const Sort = Object.freeze({
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
});

const UserAction = Object.freeze({
  UPDATE_POINT: 'update',
  ADD_POINT: 'add',
  DELETE_POINT: 'delete',
});

const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
  INIT: 'init',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT'
};

const ApiEndpoint = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export {
  ApiEndpoint,
  EmptyFilterMessage,
  FilterType,
  MessageOnLoading,
  Method,
  PointType,
  Sort,
  UpdateType,
  UserAction
};
