import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, inject, Input, OnInit, Output} from "@angular/core";
import {Constant} from "../../../../../shared/models/enums/constant";
import {Api} from "../../../../../shared/services/api.service";
import {CategoryService} from "../../../../../shared/services/category.service";
import {CategoryDropdownComponent, DropdownSelection} from "../category-dropdown/category-dropdown.component";
import Category = Api.CategoryApi.Category;
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
  imports: [CommonModule, CategoryDropdownComponent, NgOptimizedImage],
  templateUrl: "./form-categories.component.html",
  styleUrl: "./form-categories.component.scss"
})
export class FormCategoriesComponent implements OnInit {
  @Output() onSelect = new EventEmitter<CategorySelection>();
  @Input({required: true}) activeCategory!: string;
  @Input({required: true}) activeSubcategory!: string;
  @Input({required: true}) categoryValid!: boolean;
  @Input({required: true}) subcategoryValid!: boolean;
  protected type = CategoryType;
  protected dropdown: boolean[] = [];
  protected categoryType = CategoryType;
  protected categories: Category[] = [];
  protected subcategories: Subcategory[] = [];
  protected categoryService = inject(CategoryService);

  public ngOnInit(): void {
    this.categoryService.initCategories();
    this.categoryService.getAllCategories().subscribe(value => {
      if (value) {
        this.categories = value;
      }
    });
  }

  protected showDropdownMenu(type: CategoryType): void {
    this.dropdown[type] = true;
  }

  protected hideDropdownMenu(type: CategoryType): void {
    this.dropdown[type] = false;
  }

  protected propagateCategorySelectionEvent(categoryType: CategoryType, content: DropdownSelection): void {
    if (categoryType === CategoryType.Category) {
      this.resetSubcategoryValue(content);
    }

    this.onSelect.emit({
      type: categoryType,
      value: content.category
    });
  }

  private resetSubcategoryValue(content: DropdownSelection): void {
    this.subcategories = content.subcategory;

    this.onSelect.emit({
      type: CategoryType.Subcategory,
      value: Constant.EmptyValue
    });
  }
}
