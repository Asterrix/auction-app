import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, inject, Output} from "@angular/core";
import {DateTimeForm} from "../form-date-time-selector.component";
import {TimeChanger, TimePeriod, TimeService} from "../services/time.service";

enum FocusedTimeElement {
  Hour,
  Minute
}

@Component({
  selector: "add-item-form-time-selector",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  providers: [
    TimeService
  ],
  templateUrl: "./time-selector.component.html",
  styleUrl: "./time-selector.component.scss"
})
export class TimeSelector implements TimeChanger, DateTimeForm {
  @Output() submitEvent = new EventEmitter<Date>();
  @Output() closeEvent = new EventEmitter<void>();
  protected readonly TimePeriod = TimePeriod;
  protected readonly FocusedTimeElement = FocusedTimeElement;
  protected focusedElement = FocusedTimeElement.Hour;
  protected timeService: TimeService = inject(TimeService);

  public addHours(): void {
    this.focusedElement = FocusedTimeElement.Hour;
    this.timeService.addHours();
  }

  public addMinutes(): void {
    this.focusedElement = FocusedTimeElement.Minute;
    this.timeService.addMinutes();
  }

  public subtractHours(): void {
    this.focusedElement = FocusedTimeElement.Hour;
    this.timeService.subtractHours();
  }

  public subtractMinutes(): void {
    this.focusedElement = FocusedTimeElement.Minute;
    this.timeService.subtractMinutes();
  }

  public changeTimePeriod(period: TimePeriod): void {
    this.timeService.changeTimePeriod(period);
  }

  public closeForm(): void {
    this.closeEvent.emit();
  }

  public submitForm(): void {
    this.submitEvent.emit(this.timeService.time());
  }
}
