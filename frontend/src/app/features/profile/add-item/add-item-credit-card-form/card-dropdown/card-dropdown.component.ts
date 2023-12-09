import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, Input} from "@angular/core";
import {ClickOutsideDirective} from "../../../../../shared/directives/click-outside.directive";
import {DropdownInterface} from "../../../../../shared/interfaces/dropdown.interface";


@Component({
  selector: "add-item-form-card-dropdown",
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, NgOptimizedImage],
  templateUrl: "./card-dropdown.component.html",
  styleUrl: "./card-dropdown.component.scss"
})
export class CardDropdownComponent implements DropdownInterface<void> {
  @Input({required: true}) buttonText!: string;
  @Input({required: true}) isActive!: boolean;
  @Input({required: false}) isValid!: boolean;
  public hideDropdownEvent = new EventEmitter<void>();
  public selectionEvent = new EventEmitter<void>();
  public showDropdownEvent = new EventEmitter<void>();
  protected listToggled: boolean = false;

  public hideDropdownMenu(): void {
    this.hideDropdownEvent.emit();
  }

  public selectionChange(): void {
    this.listToggled = true;
  }

  public showDropdownMenu(): void {
    this.showDropdownEvent.emit();
  }
}
