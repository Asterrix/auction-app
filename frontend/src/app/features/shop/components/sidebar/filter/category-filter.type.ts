import {Category} from "../../../../../shared/services/api/category/category.type";

type CategoryInfo = {
  category: Category,
  subcategoryNames: string[],
  subcategorySet: Set<string>
};

type CategoryFilter = Map<string, string[]>;

export type {
  CategoryInfo,
  CategoryFilter
};
