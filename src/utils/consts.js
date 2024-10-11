const AUTHORIZATION = 'Basic dXNlcjpwb2xsb2w=';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

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

const UpdateType = Object.freeze({
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
  INIT: 'init',
  ERROR: 'error'
});

const Method = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
});

const ApiEndpoint = Object.freeze({
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
});

const PointErrorMessage = Object.freeze({
  DELETE_UNEXISTING: 'Can\'t delete unexisting point',
  UPDATE_UNEXISTING: 'Can\'t update unexisting point',
  UPDATE: 'Can\'t update point',
  ADD: 'Can\'t add point',
  DELETE: 'Can\'t delete point'
});

export {
  AUTHORIZATION,
  ApiEndpoint,
  END_POINT,
  EmptyFilterMessage,
  FilterType,
  MessageOnLoading,
  Method,
  PointErrorMessage,
  PointType,
  Sort,
  UpdateType,
  UserAction
};
