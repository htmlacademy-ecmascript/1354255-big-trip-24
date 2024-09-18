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

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export { FilterType, MessageOnLoading, PointType };
