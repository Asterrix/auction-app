import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ClickOutsideDirective} from "../../../../../shared/directives/click-outside.directive";


@Component({
  selector: "add-item-form-card-dropdown",
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, NgOptimizedImage],
  templateUrl: "./card-dropdown.component.html",
  styleUrl: "./card-dropdown.component.scss"
})
export class CardDropdownComponent {
  @Input({required: true}) buttonText!: string;
  @Input({required: true}) isActive!: boolean;
  @Input({required: false}) isValid!: boolean;
  @Output() hideDropdown = new EventEmitter<void>();
  @Output() showDropdown = new EventEmitter<void>();
  @Output() onSelect = new EventEmitter<void>();
  protected listToggled: boolean = false;

  protected showDropdownMenu(): void {
    this.showDropdown.emit();
  }

  protected hideDropdownMenu(): void {
    this.hideDropdown.emit();
  }

  protected emitSelectionChange(): void {
    this.listToggled = true;
  }
}
