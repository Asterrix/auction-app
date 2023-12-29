import {Category} from "../../../../../shared/services/api/category/category.type";

export interface CategoryFiltration {
  excludeCategory: (category: string) => Promise<void>;
  excludeSubcategory: (category: string, subcategory: string) => Promise<void>;
  includeCategories: (categories: string[], subcategories: string[]) => Promise<void>;
  includeCategory: (category: string) => Promise<void>;
  includeSubcategory: (category: string, subcategory: string) => Promise<void>;
  initializeCategories: (categories: Category[]) => void;
  isCategoryIncluded: (category: string) => boolean;
  isSubcategoryIncluded: (category: string, subcategory: string) => boolean;
  resetQueryParams: () => Promise<void>;
}
