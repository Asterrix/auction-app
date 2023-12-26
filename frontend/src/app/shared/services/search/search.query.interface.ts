export interface SearchQuery {
  navigateToShopPage(searchValue: string): Promise<void>;

  appendQueryParameter(searchValue: string): Promise<void>;

  clearSearchParameter(): Promise<void>;

  resetCategoryAndSubcategoryParams(): Promise<void>;
}
