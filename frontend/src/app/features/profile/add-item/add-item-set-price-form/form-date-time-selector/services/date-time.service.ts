import {computed, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {getHours, getMinutes, isValid, set} from "date-fns";
import {DateChanger, DateService, DateType} from "./date.service";
import {TimeChanger, TimePeriod, TimeService} from "./time.service";

interface DateTime {
  setDate(date: Date): void;

  setHoursMinutes(time: Date): void;

  getJsonValue(date: Date): string;
}

@Injectable({providedIn: "root"})
export class DateTimeService implements DateTime, DateChanger, TimeChanger {
  public readonly currentDateVal: Date = new Date();

  private currentDateTimeSignal: WritableSignal<Date> = signal<Date>(this.currentDateVal);
  currentDateTime: Signal<Date> = computed(() => this.currentDateTimeSignal());

  private dateService: DateService = inject(DateService);
  public timeService: TimeService = inject(TimeService);

  currentDate: Signal<DateType> = this.dateService.date;
  currentTime: Signal<Date> = this.timeService.time;

  public setDate(date: Date): void {
    if (isValid(date)) {
      this.currentDateTimeSignal.set(date);
    }
  }

  public setHoursMinutes(time: Date): void {
    if (isValid(time)) {
      const hours: number = getHours(time);
      const minutes: number = getMinutes(time);
      const newDate: Date = set(this.currentDateTimeSignal(), {hours: hours, minutes: minutes});
      this.currentDateTimeSignal.set(newDate);
    }
  }

  public getJsonValue(date: Date): string {
    return date.toJSON();
  }

  public addHours(hours: number): void {
    this.timeService.addHours(hours);
  }

  public addMinutes(minutes: number): void {
    this.timeService.addMinutes(minutes);
  }

  public changeSelectedDate(date: Date): void {
    this.dateService.changeSelectedDate(date);
  }

  public changeTimePeriod(period: TimePeriod): void {
    this.timeService.changeTimePeriod(period);
  }

  public firstDayOfMonthNumber(): number {
    return this.dateService.firstDayOfMonthNumber();
  }

  public goToNextMonth(): void {
    this.dateService.goToNextMonth();
  }

  public goToPreviousMonth(): void {
    this.dateService.goToPreviousMonth();
  }

  public isSameDateIgnoreTime(date: Date): boolean {
    return this.dateService.isSameDateIgnoreTime(date);
  }

  public setListOfMonthsToSelectedDate(): void {
    this.dateService.setListOfMonthsToSelectedDate();
  }

  public subtractHours(hours: number): void {
    this.timeService.subtractHours(hours);
  }

  public subtractMinutes(minutes: number): void {
    this.timeService.subtractMinutes(minutes);
  }
}
