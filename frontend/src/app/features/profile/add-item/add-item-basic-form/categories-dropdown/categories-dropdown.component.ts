import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ClickOutsideDirective} from "../../../../../shared/directives/click-outside.directive";
import {Dropdown} from "../../../../../shared/interfaces/dropdown.interface";
import {Api} from "../../../../../shared/services/api.service";
import Category = Api.CategoryApi.Category;
import Subcategory = Api.CategoryApi.Subcategory;

@Component({
  selector: "categories-dropdown",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ClickOutsideDirective],
  templateUrl: "./categories-dropdown.component.html",
  styleUrl: "./categories-dropdown.component.scss"
})
export class CategoriesDropdown implements Dropdown<string> {
  @Input({required: true}) label!: string;
  @Input({required: true}) isActive!: boolean;
  @Input({required: true}) content!: Category[] | Subcategory[];
  @Input({required: true}) isValid!: boolean;
  @Output() showDropdownEvent = new EventEmitter<void>();
  @Output() hideDropdownEvent = new EventEmitter<void>();
  @Output() selectionEvent = new EventEmitter<string>();
  protected selectionEmptyEffect = true;

  public hideDropdownMenu(): void {
    this.hideDropdownEvent.emit();
  }

  public showDropdownMenu(): void {
    this.showDropdownEvent.emit();
  }

  public selectionChange(selection: string): void {
    this.selectionEmptyEffect = false;
    this.selectionEvent.emit(selection);
  }
}
