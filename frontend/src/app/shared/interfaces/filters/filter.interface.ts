export interface Filter {
  isFilterApplied: () => boolean;
  resetFilter: () => Promise<void>;
  resetFilterWithQueryParams: () => Promise<void>;
}
