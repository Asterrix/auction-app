import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, EventEmitter, inject, Output} from "@angular/core";
import {Observable} from "rxjs";
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
  @Output() submitEvent = new EventEmitter<void>();
  @Output() closeEvent = new EventEmitter<void>();
  protected readonly TimePeriod = TimePeriod;
  protected readonly FocusedTimeElement = FocusedTimeElement;
  protected focusedElement = FocusedTimeElement.Hour;
  private timeService: TimeService = inject(TimeService);
  protected time: Observable<Date> = this.timeService.time;
  protected currentHour: number = this.timeService.currentHour();

  public addHours(): void {
    this.focusedElement = FocusedTimeElement.Hour;
    this.timeService.addHours();
    this.currentHour = this.timeService.currentHour();
  }

  public addMinutes(): void {
    this.focusedElement = FocusedTimeElement.Minute;
    this.timeService.addMinutes();
  }

  public subtractHours(): void {
    this.focusedElement = FocusedTimeElement.Hour;
    this.timeService.subtractHours();
    this.currentHour = this.timeService.currentHour();
  }

  public subtractMinutes(): void {
    this.focusedElement = FocusedTimeElement.Minute;
    this.timeService.subtractMinutes();
  }

  public changeTimePeriod(period: TimePeriod): void {
    this.timeService.changeTimePeriod(period);
    this.currentHour = this.timeService.currentHour();
  }

  public closeForm(): void {
    this.closeEvent.emit();
  }

  public submitForm(): void {
    this.submitEvent.emit();
  }
}
