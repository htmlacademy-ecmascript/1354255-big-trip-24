import {
  FilterType,
  isFuturePoint,
  isPastPoint,
  isPresentPoint
} from '@/utils';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentPoint(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point)),
};

const generateFilters = (points) => Object.entries(filter)
  .map(([filterType, filterValidator]) => ({
    type: filterType,
    count: filterValidator(points).length
  }));

export {
  filter,
  generateFilters
};
