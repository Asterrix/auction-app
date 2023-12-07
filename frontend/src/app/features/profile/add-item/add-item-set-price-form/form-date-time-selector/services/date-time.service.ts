import {computed, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {getHours, getMinutes, isValid, set} from "date-fns";

interface DateTime {
  setDate(date: Date): void;

  setHoursMinutes(time: Date): void;

  getJsonValue(): string;
}

@Injectable()
export class DateTimeService implements DateTime {
  private currentDateSignal: WritableSignal<Date> = signal<Date>(new Date());
  currentDate: Signal<Date> = computed(() => this.currentDateSignal());

  public setDate(date: Date): void {
    if (isValid(date)) {
      this.currentDateSignal.set(date);
    }
  }

  public setHoursMinutes(time: Date): void {
    if (isValid(time)) {
      const hours: number = getHours(time);
      const minutes: number = getMinutes(time);
      const newDate: Date = set(this.currentDateSignal(), {hours: hours, minutes: minutes});
      this.currentDateSignal.set(newDate);
    }
  }

  public getJsonValue(): string {
    return this.currentDateSignal().toJSON();
  }
}
