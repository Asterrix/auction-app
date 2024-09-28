import {EventEmitter} from "@angular/core";

export interface Dropdown<T> {
  showDropdownEvent: EventEmitter<void>;
  hideDropdownEvent: EventEmitter<void>;
  selectionEvent: EventEmitter<T>;

  showDropdownMenu(): void;

  hideDropdownMenu(): void;

  selectionChange(selection: T): void;
}
