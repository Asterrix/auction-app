import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ClickOutsideDirective} from "../../shared/directives/click-outside.directive";
import {ModalComponent} from "../../shared/modal/modal.component";
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {TimeSelector} from "./time-selector/time-selector.component";

export interface DateTimeForm {
  submitEvent: EventEmitter<void>;

  closeEvent: EventEmitter<void>;

  closeForm(): void;

  submitForm(): void;
}

enum DateTimeSelector {
  None,
  DateForm,
  TimeForm
}

@Component({
  selector: "app-form-date-picker",
  standalone: true,
  imports: [
    CommonModule,
    DatePickerComponent,
    ClickOutsideDirective,
    ModalComponent,
    TimeSelector
  ],
  templateUrl: "./form-date-time-selector.component.html",
  styleUrl: "./form-date-time-selector.component.scss"
})
export class FormDateTimeSelectorComponent implements DateTimeForm {
  @Input({required: true}) fieldLabel!: string;
  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();
  protected currentForm: DateTimeSelector = DateTimeSelector.None;
  protected readonly DatePickerForm = DateTimeSelector;

  public closeForm(): void {
    if (this.currentForm === DateTimeSelector.TimeForm) {
      this.currentForm = DateTimeSelector.DateForm;
    } else {
      this.currentForm = DateTimeSelector.None;
    }
  }

  public submitForm(): void {
    if (this.currentForm === DateTimeSelector.DateForm) {
      this.currentForm++;
    } else {
      this.currentForm = DateTimeSelector.None;
    }
  }
}
