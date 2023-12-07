import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {ClickOutsideDirective} from "../../shared/directives/click-outside.directive";
import {ModalComponent} from "../../shared/modal/modal.component";
import {DateSelectorComponent} from "./date-selector/date-selector.component";
import {DateTimeService} from "./services/date-time.service";
import {TimeSelector} from "./time-selector/time-selector.component";

export interface DateTimeSelection {
  submitEvent: EventEmitter<Date>;

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
  selector: "add-item-form-date-time-selector",
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
    DateTimeService
  ],
  templateUrl: "./form-date-time-selector.component.html",
  styleUrl: "./form-date-time-selector.component.scss"
})
export class FormDateTimeSelectorComponent {
  @Input({required: true}) fieldLabel!: string;
  @Input({required: true}) validField!: boolean;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<Date>();
  protected readonly DatePickerForm = DateTimeSelector;
  protected currentSelection: DateTimeSelector = DateTimeSelector.None;
  protected dateTimeService: DateTimeService = inject(DateTimeService);

  protected goToTimeSelection(): void {
    this.currentSelection = DateTimeSelector.TimeForm;
    this.dateTimeService.saveState(this.dateTimeService.dateTime());
  }

  protected openDateTimeSelection(): void {
    this.currentSelection = DateTimeSelector.DateForm;
    this.dateTimeService.saveState(this.dateTimeService.dateTime());
  }

  protected closeDateTimeSelection(): void {
    if (this.currentSelection === DateTimeSelector.DateForm) {
      this.dateTimeService.restoreDateTimeToOriginalState();
      this.currentSelection = DateTimeSelector.None;
    } else if (this.currentSelection === DateTimeSelector.TimeForm) {
      this.dateTimeService.restoreDateTimeToPreviousState();
      this.currentSelection = DateTimeSelector.DateForm;
    }
  }

  protected submitDateTimeSelection(): void {
    this.currentSelection = DateTimeSelector.None;
    this.dateTimeService.clearMemorisedState();
    this.submitEvent.emit(this.dateTimeService.dateTime().selected);
  }
}
