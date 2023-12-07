import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {ClickOutsideDirective} from "../../shared/directives/click-outside.directive";
import {ModalComponent} from "../../shared/modal/modal.component";
import {DateSelectorComponent} from "./date-selector/date-selector.component";
import {DateTimeService} from "./services/date-time.service";
import {DateService} from "./services/date.service";
import {TimeService} from "./services/time.service";
import {TimeSelector} from "./time-selector/time-selector.component";

export interface DateTimeForm {
  submitEvent: EventEmitter<Date>;

  closeEvent: EventEmitter<void>;

  closeForm(): void;

  submitForm(date: Date): void;
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
    DateSelectorComponent,
    ClickOutsideDirective,
    ModalComponent,
    TimeSelector,
    NgOptimizedImage,
  ],
  providers: [
    DateService,
    TimeService,
    DateTimeService
  ],
  templateUrl: "./form-date-time-selector.component.html",
  styleUrl: "./form-date-time-selector.component.scss"
})
export class FormDateTimeSelectorComponent implements DateTimeForm {
  @Input({required: true}) fieldLabel!: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<Date>();
  protected currentForm: DateTimeSelector = DateTimeSelector.None;
  protected readonly DatePickerForm = DateTimeSelector;
  protected dateService: DateService = inject(DateService);
  protected dateTimeService: DateTimeService = inject(DateTimeService);

  public closeForm(): void {
    if (this.currentForm === DateTimeSelector.TimeForm) {
      this.currentForm = DateTimeSelector.DateForm;
    } else {
      this.currentForm = DateTimeSelector.None;
    }
    this.dateService.setListOfMonthsToSelectedDate();
  }

  public submitForm(date: Date): void {
    if (this.currentForm === DateTimeSelector.DateForm) {
      this.dateTimeService.setDate(date);
      this.currentForm = DateTimeSelector.TimeForm;
    } else if (this.currentForm === DateTimeSelector.TimeForm) {
      this.dateTimeService.setHoursMinutes(date);
      this.currentForm = DateTimeSelector.None;
    }
  }

  protected openForm(): void {
    this.dateService.setListOfMonthsToSelectedDate();
    this.currentForm = DateTimeSelector.DateForm;
  }
}
