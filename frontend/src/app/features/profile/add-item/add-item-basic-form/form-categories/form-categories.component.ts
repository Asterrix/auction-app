import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {DropdownComponent} from "../../shared/dropdown/dropdown.component";

enum CategoryType {
  Category,
  Subcategory
}

@Component({
  selector: "add-item-basic-form-categories",
  standalone: true,
  imports: [CommonModule, DropdownComponent],
  templateUrl: "./form-categories.component.html",
  styleUrl: "./form-categories.component.scss"
})
export class FormCategoriesComponent {
  protected type = CategoryType;
  protected dropdown: boolean[] = [];

  protected showDropdownMenu(type: CategoryType): void {
    this.dropdown[type] = true;
  }

  protected hideDropdownMenu(type: CategoryType): void {
    this.dropdown[type] = false;
  }
}
