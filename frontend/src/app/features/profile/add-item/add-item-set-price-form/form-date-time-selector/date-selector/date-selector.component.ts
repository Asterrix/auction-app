import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, inject, Output} from "@angular/core";
import {DateTimeSelection} from "../form-date-time-selector.component";
import {DateTimeService} from "../services/date-time.service";

@Component({
  selector: "app-date-picker",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "./date-selector.component.html",
  styleUrl: "./date-selector.component.scss"
})
export class DateSelectorComponent implements DateTimeSelection {
  @Output() closeEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<void>();
  protected dateTimeService: DateTimeService = inject(DateTimeService);
  protected firstDayOfMonthSpacing: number[] = new Array(this.dateTimeService.firstDayOfMonthNumber());

  public goToNextMonth(): void {
    this.dateTimeService.goToNextMonth();
    this.updateFirstDaySpacing();
  }

  public goToThePreviousMonth(): void {
    this.dateTimeService.goToNextMonth();
    this.updateFirstDaySpacing();
  }

  public closeForm(): void {
    this.closeEvent.emit();
  }

  public submitForm(): void {
    this.submitEvent.emit();
  }

  public changeDate(date: Date): void {
    this.dateTimeService.changeSelectedDate(date);
  }

  private updateFirstDaySpacing(): void {
    this.firstDayOfMonthSpacing = new Array(this.dateTimeService.firstDayOfMonthNumber());
  }
}
