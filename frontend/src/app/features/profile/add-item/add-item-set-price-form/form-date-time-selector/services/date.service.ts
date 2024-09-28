import {Injectable} from "@angular/core";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  isSameDay,
  isSameMonth,
  isSameYear,
  setHours, startOfDay,
  startOfMonth,
  subMonths
} from "date-fns";

interface DateMethod {
  addDays(currentDate: Date, daysCount: number): Date;

  changeSelectedDate(currentDate: Date, nextDate: Date): Date;

  nextMonth(currentMonth: Date): Date[];

  previousMonth(currentDate: Date, currentMonth: Date): Date[];

  isSameSelectedDateIgnoreTime(firstDate: Date, secondDate: Date): boolean;

  getListOfMonthDays(date: Date): Date[];

  isLess(firstDate: Date, secondDate: Date): boolean;
}

@Injectable({providedIn: "root"})
export class DateService implements DateMethod {
  public changeSelectedDate(currentDate: Date, nextDate: Date): Date {
    return setHours(nextDate, currentDate.getHours());
  }

  public addDays(currentDate: Date, daysCount: number): Date {
    return addDays(currentDate, daysCount);
  }

  public nextMonth(currentMonth: Date): Date[] {
    const nextMonth: Date = addMonths(currentMonth, 1);
    const beginningOfNextMonth: Date = startOfMonth(nextMonth);
    const endOfNextMonth: Date = endOfMonth(nextMonth);

    return eachDayOfInterval({
      start: beginningOfNextMonth,
      end: endOfNextMonth
    });
  }

  public previousMonth(currentDate: Date, currentMonth: Date): Date[] {
    const previousMonth: Date = subMonths(currentMonth, 1);

    if (previousMonth >= startOfMonth(currentDate)) {
      const beginningOfPreviousMonth: Date = startOfMonth(previousMonth);
      const endOfPreviousMonth: Date = endOfMonth(previousMonth);

      return eachDayOfInterval({
        start: beginningOfPreviousMonth,
        end: endOfPreviousMonth
      });
    }

    return new Array<Date>();
  }

  public isSameSelectedDateIgnoreTime(firstDate: Date, secondDate: Date): boolean {
    return (
      isSameYear(firstDate, secondDate) &&
      isSameMonth(firstDate, secondDate) &&
      isSameDay(firstDate, secondDate)
    );
  }

  public getListOfMonthDays(date: Date): Date[] {
    return eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date)
    });
  }

  public isLess(firstDate: Date, secondDate: Date): boolean {
    const day: Date = startOfDay(firstDate);
    return secondDate < day;
  }
}
