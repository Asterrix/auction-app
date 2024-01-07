import {computed, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {Router} from "@angular/router";
import {Category, Subcategory} from "../../../../../shared/services/api/category/category.type";
import {Filter} from "../../../../../shared/interfaces/filters/filter.interface";
import {CategoryFilter, CategoryInfo} from "./category-filter.type";
import {CategoryFiltration} from "./category-filtration.interface";

@Injectable({
  providedIn: "root"
})
export class CategoryFilterService implements CategoryFiltration, Filter {
  private categoryFilterSignal: WritableSignal<CategoryFilter> = signal<CategoryFilter>(new Map());
  public readonly categoryFilter: Signal<CategoryFilter> = computed(() => this.categoryFilterSignal());
  private categoryMap: Map<string, CategoryInfo> = new Map();

  private readonly router: Router = inject(Router);


  public excludeCategory = async (category: string): Promise<void> => {
    const categoryFilter: CategoryFilter = this.categoryFilterSignal();
    const excluded: boolean = categoryFilter.delete(category);

    if (excluded) {
      await this.updateCategoryFilter(categoryFilter);
    }
  };

  public excludeSubcategory = async (category: string, subcategory: string): Promise<void> => {
    const categoryFilter: CategoryFilter = this.categoryFilterSignal();
    const subcategorySet: Set<string> = new Set(categoryFilter.get(category));

    if (subcategorySet.delete(subcategory)) {
      if (subcategorySet.size > 0) {
        categoryFilter.set(category, Array.from(subcategorySet));
      } else {
        categoryFilter.delete(category);
      }
      await this.updateCategoryFilter(categoryFilter);
    }
  };

  public includeCategories = async (categories: string[], subcategories: string[]): Promise<void> => {
    const categoryFilter: CategoryFilter = this.categoryFilterSignal();

    categories.forEach((category: string): void => {
      const categoryInfo: CategoryInfo | undefined = this.categoryMap.get(category);

      if (categoryInfo) {
        const existingSubcategories: Set<string> = new Set(categoryFilter.get(category));

        subcategories.forEach((subcategory: string): void => {
          if (categoryInfo.subcategorySet.has(subcategory)) {
            existingSubcategories.add(subcategory);
          }
        });

        if (existingSubcategories.size > 0) {
          categoryFilter.set(category, Array.from(existingSubcategories));
        }
      }
    });

    await this.updateCategoryFilter(categoryFilter);
  };

  public includeCategory = async (category: string): Promise<void> => {
    const categoryFilter: CategoryFilter = this.categoryFilterSignal();
    const findCategory: CategoryInfo | undefined = this.categoryMap.get(category);

    if (findCategory && !categoryFilter.has(category)) {
      categoryFilter.set(category, findCategory.subcategoryNames);

      await this.updateCategoryFilter(categoryFilter);
    }
  };

  public includeSubcategory = async (category: string, subcategory: string): Promise<void> => {
    const categoryFilter: CategoryFilter = this.categoryFilterSignal();
    const categoryInfo: CategoryInfo | undefined = this.categoryMap.get(category);

    if (categoryInfo && categoryInfo.subcategorySet.has(subcategory)) {
      const subcategorySet: Set<string> = new Set(categoryFilter.get(category));
      subcategorySet.add(subcategory);

      categoryFilter.set(category, Array.from(subcategorySet));
      await this.updateCategoryFilter(categoryFilter);
    }
  };

  public initializeCategories(categories: Category[]): void {
    this.categoryMap = new Map(categories.map(
      (category: Category) => {
        const subcategoryNames: string[] = category.subcategories.map(
          (subcategory: Subcategory) => subcategory.name);

        return [category.name, {category, subcategoryNames, subcategorySet: new Set(subcategoryNames)}];
      }));
  }

  public isCategoryIncluded = (category: string): boolean => {
    return this.categoryFilterSignal().has(category);
  };

  public isSubcategoryIncluded = (category: string, subcategory: string): boolean => {
    const categoryFilter: CategoryFilter = this.categoryFilterSignal();
    const subcategories: string[] | undefined = categoryFilter.get(category);

    return subcategories ? subcategories.includes(subcategory) : false;
  };

  public isFilterApplied(): boolean {
    return this.categoryFilterSignal().size > 0;
  }

  public resetFilter = async (): Promise<void> => {
    this.categoryFilterSignal.set(new Map());
  };

  public resetFilterWithQueryParams = async (): Promise<void> => {
    await this.resetFilter();

    await this.router.navigate([], {
      queryParams: {
        category: null,
        subcategory: null
      }, queryParamsHandling: "merge"
    });
  };

  private updateQueryParams = async (categoryFilter: CategoryFilter): Promise<void> => {
    await this.router.navigate([], {
      queryParams: {
        category: Array.from(categoryFilter.keys()),
        subcategory: Array.from(categoryFilter.values()).flat()
      },
      queryParamsHandling: "merge"
    });
  };

  private async updateCategoryFilter(categoryFilter: CategoryFilter): Promise<void> {
    this.categoryFilterSignal.set(categoryFilter);
    await this.updateQueryParams(categoryFilter);
  }
}
