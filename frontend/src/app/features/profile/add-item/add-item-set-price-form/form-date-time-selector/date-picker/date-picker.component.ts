import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ChangeDetectionStrategy, Component, EventEmitter, inject, Output} from "@angular/core";
import {DateTimeForm} from "../form-date-time-selector.component";
import {DateSelectorService} from "../services/date-selector.service";

@Component({
  selector: "app-date-picker",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "./date-picker.component.html",
  styleUrl: "./date-picker.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements DateTimeForm {
  @Output() closeEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<void>();
  protected dateSelectorService = inject(DateSelectorService);
  protected firstDayOfMonthSpacing: number[] = new Array(this.dateSelectorService.firstDayOfMonthNumber());

  public goToNextMonth(): void {
    this.dateSelectorService.goToNextMonth();
    this.firstDayOfMonthSpacing = new Array(this.dateSelectorService.firstDayOfMonthNumber());
  }

  public goToThePreviousMonth(): void {
    this.dateSelectorService.goToPreviousMonth();
    this.firstDayOfMonthSpacing = new Array(this.dateSelectorService.firstDayOfMonthNumber());
  }

  public closeForm(): void {
    this.closeEvent.emit();
  }

  public submitForm(): void {
    this.submitEvent.emit();
  }

  public changeDate(date: Date): void {
    this.dateSelectorService.changeSelectedDate(date);
  }
}
