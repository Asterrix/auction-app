import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter} from "@angular/core";
import {ClickOutsideDirective} from "../../../../shared/directives/click-outside.directive";
import {Dropdown} from "../../../../shared/interfaces/dropdown.interface";

@Component({
  selector: "shop-sorting-dropdown",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ClickOutsideDirective],
  templateUrl: "./sort-items.component.html",
  styleUrl: "./sort-items.component.scss"
})
export class SortItemsComponent implements Dropdown<string> {
  public hideDropdownEvent: EventEmitter<void> = new EventEmitter<void>();
  public selectionEvent: EventEmitter<string> = new EventEmitter<string>();
  public showDropdownEvent: EventEmitter<void> = new EventEmitter<void>();
  public isActive: boolean = false;

  public hideDropdownMenu(): void {
    this.isActive = false;
  }

  public selectionChange(selection: string): void {
  }

  public showDropdownMenu(): void {
    this.isActive = true;
  }

  protected toggleDropdownMenu(): void {
    this.isActive = !this.isActive;
  }
}
