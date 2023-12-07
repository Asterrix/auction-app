import {Injectable} from "@angular/core";
import {
  addHours,
  addMinutes,
  endOfDay,
  endOfHour,
  isBefore,
  isEqual,
  isSameDay,
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

interface TimeMethod {
  addConstrainedHours(date: Date, hours: number): Date;

  subtractConstrainedHours(date: Date, hours: number): Date;

  addConstrainedMinutes(date: Date, minutes: number): Date;

  subtractConstrainedMinutes(date: Date, minutes: number): Date;

  changeTimePeriod(date: Date, timePeriod: TimePeriod): Date;
}

@Injectable({providedIn: "root"})
export class TimeService implements TimeMethod {
  public addConstrainedHours(date: Date, hours: number): Date {
    const newDateHours: Date = addHours(date, hours);

    if (isEqual(date.getDate(), newDateHours.getDate())) {
      return newDateHours;
    }

    // Stop the date change
    const startDate: Date = startOfDay(date);
    return setMinutes(startDate, date.getMinutes());
  }

  public subtractConstrainedHours(date: Date, hours: number): Date {
    const previousHour: Date = subHours(date, hours);

    if (isSameDay(date, previousHour) && isBefore(date, previousHour)) {
      return date;
    }

    if (isEqual(date.getDate(), previousHour.getDate())) {
      return previousHour;
    }

    // Stop the date change
    const endDate: Date = endOfDay(date);
    return setMinutes(endDate, date.getMinutes());
  }

  public addConstrainedMinutes(date: Date, minutes: number): Date {
    const nextMinuteDate: Date = addMinutes(date, minutes);

    if (isEqual(nextMinuteDate.getMinutes(), 0)) {
      const startOfHourDate: Date = startOfHour(date);
      return setHours(startOfHourDate, date.getHours());
    }

    return nextMinuteDate;
  }

  public subtractConstrainedMinutes(date: Date, minutes: number): Date {
    const previousMinuteDate: Date = subMinutes(date, minutes);

    if (isEqual(previousMinuteDate, 59)) {
      const endOfHourDate: Date = endOfHour(date);
      return setHours(endOfHourDate, date.getHours());
    }

    return previousMinuteDate;
  }

  public changeTimePeriod(date: Date, timePeriod: TimePeriod): Date {
    const currentHours: number = date.getHours();

    const timePeriodSeparator: number = 12;

    if (timePeriod === TimePeriod.AM && currentHours >= timePeriodSeparator) {
      return this.subtractConstrainedHours(date, timePeriodSeparator);
    } else if (timePeriod === TimePeriod.PM && currentHours < timePeriodSeparator) {
      return this.addConstrainedHours(date, timePeriodSeparator);
    }

    return date;
  }
}
