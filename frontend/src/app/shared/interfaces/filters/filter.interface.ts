export interface Filter {
  isFilterApplied: () => Promise<boolean>;
  excludeFilter: (clearQueryParams: boolean) => Promise<void>;
}
