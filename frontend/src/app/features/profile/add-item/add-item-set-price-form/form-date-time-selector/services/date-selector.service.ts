import {inject, Injectable, Signal, signal} from "@angular/core";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  isAfter,
  isSameDay,
  isSameMonth,
  isSameYear,
  startOfMonth,
  subMonths
} from "date-fns";
import {BehaviorSubject, Observable} from "rxjs";
import {DateFormatterService} from "./date-formatter.service";

export interface DateSelector {
  changeSelectedDate(date: Date): void;

  goToNextMonth(): void;

  goToPreviousMonth(): void;

  firstDayOfMonthNumber(): number;

  isSameDateIgnoreTime(date: Date): boolean;

  setListOfMonthToSelectedDate(): void;
}

export type SelectedInfo = {
  day: string;
  month: string;
  date: Date;
}

export type ListInfo = {
  day: string;
  month: string;
  list: Date[];
}

export type DateType = {
  selected: SelectedInfo;
  listOfDates: ListInfo;
}

@Injectable({
  providedIn: "root"
})
export class DateSelectorService implements DateSelector {
  private readonly currentDate: Date = new Date();
  public readonly currentDateSignal: Signal<Date> = signal(this.currentDate).asReadonly();
  private readonly dateFormatter: DateFormatterService = inject(DateFormatterService);
  private selectedDate: SelectedInfo = {
    day: this.dateFormatter.formatThreeLetterDay(this.currentDate),
    month: this.dateFormatter.formatThreeLetterMonth(this.currentDate),
    date: addDays(this.currentDate, 1)
  };
  private listOfDates: ListInfo = {
    day: this.dateFormatter.formatThreeLetterDay(this.currentDate),
    month: this.dateFormatter.formatAllLetterMonth(this.currentDate),
    list: eachDayOfInterval({
      start: startOfMonth(this.currentDate),
      end: endOfMonth(this.currentDate)
    })
  };
  private dateSubject = new BehaviorSubject<DateType>({
    selected: this.selectedDate,
    listOfDates: this.listOfDates
  });
  public readonly dateObservable: Observable<DateType> = this.dateSubject.asObservable();

  public changeSelectedDate(date: Date): void {
    if (isAfter(date, this.currentDate)) {
      this.selectedDate = {
        day: this.dateFormatter.formatThreeLetterDay(date),
        month: this.dateFormatter.formatThreeLetterMonth(date),
        date: date
      };

      this.listOfDates = {
        day: this.dateFormatter.formatThreeLetterDay(date),
        month: this.dateFormatter.formatAllLetterMonth(date),
        list: this.listOfDates.list
      };

      this.dateSubject.next({
        selected: this.selectedDate,
        listOfDates: this.listOfDates
      });
    }
  }

  public firstDayOfMonthNumber(): number {
    return this.getFirstListDate().getDay();
  }

  public goToNextMonth(): void {
    const nextMonth: Date = addMonths(this.getFirstListDate(), 1);
    const beginningOfNextMonth: Date = startOfMonth(nextMonth);
    const endOfNextMonth: Date = endOfMonth(nextMonth);

    this.listOfDates = {
      day: this.dateFormatter.formatThreeLetterDay(nextMonth),
      month: this.dateFormatter.formatAllLetterMonth(nextMonth),
      list: eachDayOfInterval({
        start: beginningOfNextMonth,
        end: endOfNextMonth
      })
    };

    this.dateSubject.next({
      selected: this.selectedDate,
      listOfDates: this.listOfDates
    });
  }

  public goToPreviousMonth(): void {
    const previousMonth: Date = subMonths(this.getFirstListDate(), 1);

    if (previousMonth >= startOfMonth(this.currentDate)) {
      const beginningOfPreviousMonth: Date = startOfMonth(previousMonth);
      const endOfPreviousMonth: Date = endOfMonth(previousMonth);

      this.listOfDates = {
        day: this.dateFormatter.formatThreeLetterDay(previousMonth),
        month: this.dateFormatter.formatAllLetterMonth(previousMonth),
        list: eachDayOfInterval({
          start: beginningOfPreviousMonth,
          end: endOfPreviousMonth
        })
      };

      this.dateSubject.next({
        selected: this.selectedDate,
        listOfDates: this.listOfDates
      });
    }
  }

  public isSameDateIgnoreTime(date: Date): boolean {
    return (
      isSameYear(this.dateSubject.getValue().selected.date, date) &&
      isSameMonth(this.dateSubject.getValue().selected.date, date) &&
      isSameDay(this.dateSubject.getValue().selected.date, date)
    );
  }

  public setListOfMonthToSelectedDate(): void {
    this.listOfDates = {
      day: this.dateFormatter.formatThreeLetterDay(this.selectedDate.date),
      month: this.dateFormatter.formatThreeLetterMonth(this.selectedDate.date),
      list: eachDayOfInterval({
        start: startOfMonth(this.selectedDate.date),
        end: endOfMonth(this.selectedDate.date)
      })
    };

    this.dateSubject.next({
      selected: this.selectedDate,
      listOfDates: this.listOfDates
    });
  }

  private getFirstListDate(): Date {
    return this.dateSubject.getValue().listOfDates.list[0];
  }
}
