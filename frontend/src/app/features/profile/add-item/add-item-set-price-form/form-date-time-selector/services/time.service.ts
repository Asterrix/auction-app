import {computed, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {
  addHours,
  addMinutes,
  endOfDay,
  endOfHour,
  isEqual,
  setHours,
  setMinutes,
  startOfDay,
  startOfHour,
  subHours,
  subMinutes
} from "date-fns";

export enum TimePeriod {
  AM,
  PM
}

export interface TimeChanger {
  addHours(hours: number): void;

  subtractHours(hours: number): void;

  addMinutes(minutes: number): void;

  subtractMinutes(minutes: number): void;

  changeTimePeriod(period: TimePeriod): void;
}

@Injectable()
export class TimeService implements TimeChanger {
  private currentTime: Date = new Date();
  private timeSignal: WritableSignal<Date> = signal<Date>(this.currentTime);
  public time: Signal<Date> = computed(() => this.timeSignal());
  private timeAmount: number = 1;


  public addHours(hours: number = this.timeAmount): void {
    const nextHour: Date = addHours(this.timeSignal(), hours);

    if (isEqual(nextHour.getDate(), this.currentTime.getDate())) {
      this.timeSignal.set(nextHour);
    } else {
      const startDate: Date = startOfDay(this.currentTime);
      this.timeSignal.set(
        setMinutes(
          startDate,
          this.timeSignal().getMinutes()
        )
      );
    }
  }

  public subtractHours(hours: number = this.timeAmount): void {
    const previousHour: Date = subHours(this.timeSignal(), hours);

    if (isEqual(previousHour.getDate(), this.currentTime.getDate())) {
      this.timeSignal.set(previousHour);
    } else {
      const endOfDayDate: Date = endOfDay(this.currentTime);

      this.timeSignal.set(
        setMinutes(
          endOfDayDate,
          this.timeSignal().getMinutes()
        )
      );
    }
  }

  public addMinutes(minutes: number = this.timeAmount): void {
    const nextMinute: Date = addMinutes(this.timeSignal(), minutes);

    if (isEqual(nextMinute.getMinutes(), 0)) {
      const startOfHourDate: Date = startOfHour(this.timeSignal());

      this.timeSignal.set(
        setHours(
          startOfHourDate,
          this.timeSignal().getHours()
        )
      );
    } else {
      this.timeSignal.set(nextMinute);
    }
  }

  public subtractMinutes(minutes: number = this.timeAmount): void {
    const previousMinute: Date = subMinutes(this.timeSignal(), minutes);

    if (isEqual(previousMinute.getMinutes(), 59)) {
      const endOfHourDate: Date = endOfHour(this.timeSignal());

      this.timeSignal.set(
        setHours(
          endOfHourDate,
          this.timeSignal().getHours()
        )
      );
    } else {
      this.timeSignal.set(previousMinute);
    }
  }

  public changeTimePeriod(period: TimePeriod): void {
    const currentHours: number = this.timeSignal().getHours();

    if (period === TimePeriod.AM && currentHours >= 12) {
      this.subtractHours(12);
    } else if (period === TimePeriod.PM && currentHours < 12) {
      this.addHours(12);
    }
  }
}
