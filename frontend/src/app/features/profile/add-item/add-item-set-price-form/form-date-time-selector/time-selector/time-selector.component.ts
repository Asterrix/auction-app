import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, inject, Output} from "@angular/core";
import {DateTimeSelection} from "../form-date-time-selector.component";
import {DateTimeService} from "../services/date-time.service";
import {TimePeriod} from "../services/time.service";

enum FocusedTimeElement {
  Hour,
  Minute
}

@Component({
  selector: "add-item-form-time-selector",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "./time-selector.component.html",
  styleUrl: "./time-selector.component.scss"
})
export class TimeSelector {
  @Output() closeEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<void>();
  protected readonly TimePeriod = TimePeriod;
  protected readonly FocusedTimeElement = FocusedTimeElement;
  protected focusedElement: FocusedTimeElement = FocusedTimeElement.Hour;
  protected dateTimeService: DateTimeService = inject(DateTimeService);

  public addHours(): void {
    this.focusedElement = FocusedTimeElement.Hour;
    this.dateTimeService.addConstrainedHours(1);
  }

  public addMinutes(): void {
    this.focusedElement = FocusedTimeElement.Minute;
    this.dateTimeService.addConstrainedMinutes(1);
  }

  public subtractHours(): void {
    this.focusedElement = FocusedTimeElement.Hour;
    this.dateTimeService.subtractConstrainedHours(1);
  }

  public subtractMinutes(): void {
    this.focusedElement = FocusedTimeElement.Minute;
    this.dateTimeService.subtractConstrainedMinutes(1);
  }

  public changeTimePeriod(period: TimePeriod): void {
    this.dateTimeService.changeTimePeriod(period);
  }

  public closeForm(): void {
    this.closeEvent.emit();
  }

  public submitForm(): void {
    this.submitEvent.emit();
  }
}
