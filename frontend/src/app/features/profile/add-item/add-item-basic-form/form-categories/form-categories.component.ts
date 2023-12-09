import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, effect, EventEmitter, inject, Input, Output} from "@angular/core";
import {Api} from "../../../../../shared/services/api.service";
import {CategoryService} from "../../../../../shared/services/category.service";
import {CategoriesDropdown} from "../categories-dropdown/categories-dropdown.component";
import Subcategory = Api.CategoryApi.Subcategory;


export enum CategoryType {
  Category,
  Subcategory
}

export type CategorySelection = {
  type: CategoryType,
  value: string
}

@Component({
  selector: "add-item-basic-form-categories",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, CategoriesDropdown],
  templateUrl: "./form-categories.component.html",
  styleUrl: "./form-categories.component.scss"
})
export class FormCategoriesComponent {
  @Output() onSelect = new EventEmitter<CategorySelection>();
  @Input({required: true}) activeCategory!: string;
  @Input({required: true}) activeSubcategory!: string;
  @Input({required: true}) categoryValid!: boolean;
  @Input({required: true}) subcategoryValid!: boolean;
  protected type = CategoryType;
  protected dropdown: boolean[] = [];

  protected categoryService = inject(CategoryService);
  protected categoryMap = new Map<string, Subcategory[]>;

  constructor() {
    effect(() => {
      this.categoryService.categories().forEach(category => {
        this.categoryMap.set(category.name, category.subcategories);
      });
    });
  }

  protected showDropdownMenu(type: CategoryType): void {
    this.dropdown[type] = true;
  }

  protected hideDropdownMenu(type: CategoryType): void {
    this.dropdown[type] = false;
  }

  protected propagateCategorySelection(category: CategoryType, selection: string): void {
    if (category === CategoryType.Category) {
      this.resetSubcategoryValue();
    }

    this.onSelect.emit({
      type: category,
      value: selection
    });
  }

  private resetSubcategoryValue(): void {
    this.onSelect.emit({
      type: CategoryType.Subcategory,
      value: ""
    });
  }
}
