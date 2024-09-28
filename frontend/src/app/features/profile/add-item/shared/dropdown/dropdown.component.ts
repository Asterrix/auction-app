import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";

@Component({
  selector: "form-dropdown",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "./dropdown.component.html",
  styleUrl: "./dropdown.component.scss"
})
export class DropdownComponent {
  @Input({required: true}) buttonText!: string;
  @Input({required: true}) isActive!: boolean;
  @Output() hideDropdown = new EventEmitter<void>();
  @Output() showDropdown = new EventEmitter<void>();

  protected showDropdownMenu(): void {
    this.showDropdown.emit();
  }

  protected hideDropdownMenu(): void {
    this.hideDropdown.emit();
  }
}
