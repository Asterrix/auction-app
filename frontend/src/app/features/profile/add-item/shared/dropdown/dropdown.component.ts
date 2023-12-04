import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ClickOutsideDirective} from "../directives/click-outside.directive";

@Component({
  selector: "form-dropdown",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ClickOutsideDirective],
  templateUrl: "./dropdown.component.html",
  styleUrl: "./dropdown.component.scss"
})
export class DropdownComponent {
  @Input({required: true}) buttonText!: string;
  @Input({required: true}) isActive!: boolean;
  @Input({required: false}) isValid!: boolean;
  @Output() hideDropdown = new EventEmitter<void>();
  @Output() showDropdown = new EventEmitter<void>();
  @Output() onSelect = new EventEmitter<string>();

  protected showDropdownMenu(): void {
    this.showDropdown.emit();
  }

  protected hideDropdownMenu(): void {
    this.hideDropdown.emit();
  }

  protected emitSelectionChange(): void {
    this.onSelect.emit("Test");
  }
}
