import { filter } from '@/utils';

const generateFilters = (points) => Object.entries(filter)
  .map(([filterType, filterValidator]) => ({
    type: filterType,
    count: filterValidator(points).length
  }));

export { generateFilters };
