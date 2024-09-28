import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {DropdownComponent} from "../../shared/dropdown/dropdown.component";

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
  imports: [CommonModule, DropdownComponent],
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
  protected categoryType = CategoryType;

  protected showDropdownMenu(type: CategoryType): void {
    this.dropdown[type] = true;
  }

  protected hideDropdownMenu(type: CategoryType): void {
    this.dropdown[type] = false;
  }

  protected propagateCategorySelectionEvent(categoryType: CategoryType, selectedCategory: string): void {
    this.onSelect.emit({
      type: categoryType,
      value: selectedCategory
    });
  }
}
