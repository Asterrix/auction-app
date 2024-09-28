import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Api} from "../../../../../shared/services/api.service";
import {ClickOutsideDirective} from "../../shared/directives/click-outside.directive";
import Category = Api.CategoryApi.Category;
import Subcategory = Api.CategoryApi.Subcategory;

export type DropdownSelection = {
  category: string;
  subcategory: Subcategory[];
}

@Component({
  selector: "add-item-category-dropdown",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ClickOutsideDirective],
  templateUrl: "./category-dropdown.component.html",
  styleUrl: "./category-dropdown.component.scss"
})
export class CategoryDropdownComponent {
  @Input({required: true}) buttonText!: string;
  @Input({required: true}) isActive!: boolean;
  @Input({required: false}) isValid!: boolean;
  @Output() hideDropdown = new EventEmitter<void>();
  @Output() showDropdown = new EventEmitter<void>();
  @Output() onSelect = new EventEmitter<DropdownSelection>();
  @Input() listOfCategories: Category[] | undefined;
  @Input() listOfSubcategories: Subcategory[] | undefined;
  protected listToggled: boolean = false;

  protected showDropdownMenu(): void {
    this.showDropdown.emit();
  }

  protected hideDropdownMenu(): void {
    this.hideDropdown.emit();
  }

  protected emitSelectionChange(content: string, subcategories: Subcategory[]): void {
    this.listToggled = true;

    this.onSelect.emit({
      category: content,
      subcategory: subcategories
    });
  }
}
