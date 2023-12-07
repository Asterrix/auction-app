import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, inject, Output} from "@angular/core";
import {DateTimeForm} from "../form-date-time-selector.component";
import {DateService} from "../services/date.service";

@Component({
  selector: "app-date-picker",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "./date-selector.component.html",
  styleUrl: "./date-selector.component.scss"
})
export class DateSelectorComponent implements DateTimeForm {
  @Output() closeEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<Date>();
  protected dateService = inject(DateService);
  protected firstDayOfMonthSpacing: number[] = new Array(this.dateService.firstDayOfMonthNumber());

  public goToNextMonth(): void {
    this.dateService.goToNextMonth();
    this.firstDayOfMonthSpacing = new Array(this.dateService.firstDayOfMonthNumber());
  }

  public goToThePreviousMonth(): void {
    this.dateService.goToPreviousMonth();
    this.firstDayOfMonthSpacing = new Array(this.dateService.firstDayOfMonthNumber());
  }

  public closeForm(): void {
    this.closeEvent.emit();
  }

  public submitForm(): void {
    this.submitEvent.emit(this.dateService.date().selected);
  }

  public changeDate(date: Date): void {
    this.dateService.changeSelectedDate(date);
  }
}
