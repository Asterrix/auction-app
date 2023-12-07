import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {ClickOutsideDirective} from "../../shared/directives/click-outside.directive";
import {ModalComponent} from "../../shared/modal/modal.component";
import {DateSelectorComponent} from "./date-selector/date-selector.component";
import {DateTimeService} from "./services/date-time.service";
import {DateService} from "./services/date.service";
import {TimeService} from "./services/time.service";
import {TimeSelector} from "./time-selector/time-selector.component";

export interface DateTimeSelection {
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
export class FormDateTimeSelectorComponent {
  @Input({required: true}) fieldLabel!: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<Date>();
  protected readonly DatePickerForm = DateTimeSelector;
  protected currentSelection: DateTimeSelector = DateTimeSelector.None;
  protected dateTimeService: DateTimeService = inject(DateTimeService);

  protected goToTimeSelection(): void {
    this.currentSelection = DateTimeSelector.TimeForm;
  }

  protected openDateTimeSelection(): void {
    this.currentSelection = DateTimeSelector.DateForm;
  }

  protected closeDateTimeSelection(): void {
    this.currentSelection =
      this.currentSelection === DateTimeSelector.TimeForm
        ? DateTimeSelector.DateForm
        : DateTimeSelector.None;
  }

  protected submitDateTimeSelection(): void {
    this.currentSelection = DateTimeSelector.None;
    this.dateTimeService.setDate(this.dateTimeService.currentDate().selected);
    this.dateTimeService.setHoursMinutes(this.dateTimeService.currentTime());
    this.submitEvent.emit(this.dateTimeService.currentDateTime());
  }
}
