import {computed, Injectable, signal, WritableSignal} from "@angular/core";
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
import {BehaviorSubject, Observable} from "rxjs";

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
  private timeAmount: number = 1;
  private timeSubject: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.currentTime);
  public time: Observable<Date> = this.timeSubject.asObservable();
  private currentHourSignal: WritableSignal<number> = signal(this.timeSubject.getValue().getHours());
  public currentHour = computed(() => this.currentHourSignal());

  public addHours(hours: number = this.timeAmount): void {
    const nextHour: Date = addHours(this.timeSubject.getValue(), hours);

    if (isEqual(nextHour.getDate(), this.currentTime.getDate())) {
      this.timeSubject.next(nextHour);
    } else {
      const startDate: Date = startOfDay(this.currentTime);
      this.timeSubject.next(
        setMinutes(
          startDate,
          this.timeSubject.getValue().getMinutes()
        )
      );
    }
    this.updateCurrentHourSignal();
  }

  public subtractHours(hours: number = this.timeAmount): void {
    const previousHour: Date = subHours(this.timeSubject.getValue(), hours);

    if (isEqual(previousHour.getDate(), this.currentTime.getDate())) {
      this.timeSubject.next(previousHour);
    } else {
      const endOfDayDate: Date = endOfDay(this.currentTime);
      this.timeSubject.next(
        setMinutes(
          endOfDayDate,
          this.timeSubject.getValue().getMinutes()
        )
      );
    }

    this.updateCurrentHourSignal();
  }

  public addMinutes(minutes: number = this.timeAmount): void {
    const nextMinute: Date = addMinutes(this.timeSubject.getValue(), minutes);

    if (isEqual(nextMinute.getMinutes(), 0)) {
      const startOfHourDate: Date = startOfHour(this.timeSubject.getValue());

      this.timeSubject.next(
        setHours(
          startOfHourDate,
          this.timeSubject.getValue().getHours()
        )
      );
    } else {
      this.timeSubject.next(nextMinute);
    }
  }

  public subtractMinutes(minutes: number = this.timeAmount): void {
    const previousMinute: Date = subMinutes(this.timeSubject.getValue(), minutes);

    if (isEqual(previousMinute.getMinutes(), 59)) {
      const endOfHourDate: Date = endOfHour(this.timeSubject.getValue());

      this.timeSubject.next(
        setHours(
          endOfHourDate,
          this.timeSubject.getValue().getHours()
        )
      );
    } else {
      this.timeSubject.next(previousMinute);
    }
  }

  public changeTimePeriod(period: TimePeriod): void {
    const currentHours: number = this.timeSubject.getValue().getHours();

    if (period === TimePeriod.AM && currentHours >= 12) {
      this.subtractHours(12);
    } else if (period === TimePeriod.PM && currentHours < 12) {
      this.addHours(12);
    }

    this.updateCurrentHourSignal();
  }

  private updateCurrentHourSignal(): void {
    this.currentHourSignal.set(this.timeSubject.getValue().getHours());
  }
}
