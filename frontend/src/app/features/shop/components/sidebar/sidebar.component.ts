import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, inject, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {CheckboxComponent, CheckboxShape} from "../../../../shared/components/checkboxes/checkbox/checkbox.component";
import {Category} from "../../../../shared/services/api/category/category.type";
import {CategoryService} from "../../../../shared/services/category/category.service";
import {Option} from "../../../../shared/types/Option.type";
import {paramExtractor} from "../../../../shared/utils/param-extractor/param-extractor";
import {accordionAnimation} from "./animation/accordionAnimation";
import {CategoryFilterService} from "./filter/category-filter.service";
import {CategoryFiltration} from "./filter/category-filtration.interface";
import {MenuSelection, OpenMenu} from "./menu/menu";


@Component({
  selector: "shop-sidebar",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, CheckboxComponent],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
  animations: [accordionAnimation]
})
export class SidebarComponent implements OnInit, CategoryFiltration {
  protected openMenu: OpenMenu = -1;
  protected readonly CheckboxShape = CheckboxShape;
  protected readonly categoryFilterService = inject(CategoryFilterService);
  private readonly categoryService = inject(CategoryService);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected categories = this.categoryService.categories;

  public async ngOnInit() {
    const params: Params = this.activatedRoute.snapshot.queryParams;

    const categoryParam: Option<string[]> = paramExtractor(params, "category");
    const subcategoryParam: Option<string[]> = paramExtractor(params, "subcategory");

    await this.categoryService.initializeCategories();
    await this.initializeCategories(this.categoryService.categories());

    if (categoryParam.present && subcategoryParam.present) {
      await this.includeCategories(categoryParam.value, subcategoryParam.value);
    } else {
      await this.resetQueryParams();
    }
  };

  public excludeCategory = async (category: string): Promise<void> => {
    await this.categoryFilterService.excludeCategory(category);
  };

  public excludeSubcategory = async (category: string, subcategory: string): Promise<void> => {
    await this.categoryFilterService.excludeSubcategory(category, subcategory);
  };

  public includeCategories = async (categories: string[], subcategories: string[]): Promise<void> => {
    await this.categoryFilterService.includeCategories(categories, subcategories);
  };

  public includeCategory = async (category: string): Promise<void> => {
    await this.categoryFilterService.includeCategory(category);
  };

  public includeSubcategory = async (category: string, subcategory: string): Promise<void> => {
    await this.categoryFilterService.includeSubcategory(category, subcategory);
  };

  public initializeCategories = async (categories: Category[]): Promise<void> => {
    this.categoryFilterService.initializeCategories(categories);
  };

  public isCategoryIncluded = (category: string): boolean => {
    return this.categoryFilterService.isCategoryIncluded(category);
  };

  public isSubcategoryIncluded = (category: string, subcategory: string) => {
    return this.categoryFilterService.isSubcategoryIncluded(category, subcategory);
  };

  public resetQueryParams = async (): Promise<void> => {
    await this.categoryFilterService.resetQueryParams();
  };

  protected toggleCategory = async (categoryName: string): Promise<void> => {
    if (this.isCategoryIncluded(categoryName)) {
      await this.excludeCategory(categoryName);
    } else {
      await this.includeCategory(categoryName);
    }
  };

  protected toggleSubcategory = async (categoryName: string, subcategoryName: string): Promise<void> => {
    if (this.isSubcategoryIncluded(categoryName, subcategoryName)) {
      await this.excludeSubcategory(categoryName, subcategoryName);
    } else {
      await this.includeSubcategory(categoryName, subcategoryName);
    }
  };

  protected menuSelection: MenuSelection = (categoryIndex: number): void => {
    this.openMenu = categoryIndex === this.openMenu ? -1 : categoryIndex;
  };
}
