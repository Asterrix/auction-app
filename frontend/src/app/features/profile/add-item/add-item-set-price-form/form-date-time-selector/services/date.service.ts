import {computed, Injectable, Signal, signal} from "@angular/core";
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

export interface DateChanger {
  changeSelectedDate(date: Date): void;

  goToNextMonth(): void;

  goToPreviousMonth(): void;

  firstDayOfMonthNumber(): number;

  isSameDateIgnoreTime(date: Date): boolean;

  setListOfMonthsToSelectedDate(): void;
}

export type DateType = {
  selected: Date;
  dateList: Date[];
}

@Injectable()
export class DateService implements DateChanger {
  public readonly currentDate: Date = new Date();
  private dateSignal = signal<DateType>({
    selected: addDays(this.currentDate, 1),
    dateList: eachDayOfInterval({
      start: startOfMonth(this.currentDate),
      end: endOfMonth(this.currentDate)
    })
  });
  public date: Signal<DateType> = computed(() => this.dateSignal());

  public changeSelectedDate(date: Date): void {
    if (isAfter(date, this.currentDate)) {
      this.dateSignal.set({
        selected: date,
        dateList: this.dateSignal().dateList
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

    this.dateSignal.set({
      selected: this.dateSignal().selected,
      dateList: eachDayOfInterval({
        start: beginningOfNextMonth,
        end: endOfNextMonth
      })
    });
  }

  public goToPreviousMonth(): void {
    const previousMonth: Date = subMonths(this.getFirstListDate(), 1);

    if (previousMonth >= startOfMonth(this.currentDate)) {
      const beginningOfPreviousMonth: Date = startOfMonth(previousMonth);
      const endOfPreviousMonth: Date = endOfMonth(previousMonth);

      this.dateSignal.set({
        selected: this.dateSignal().selected,
        dateList: eachDayOfInterval({
          start: beginningOfPreviousMonth,
          end: endOfPreviousMonth
        })
      });
    }
  }

  public isSameDateIgnoreTime(date: Date): boolean {
    return (
      isSameYear(this.dateSignal().selected, date) &&
      isSameMonth(this.dateSignal().selected, date) &&
      isSameDay(this.dateSignal().selected, date)
    );
  }

  public setListOfMonthsToSelectedDate(): void {
    this.dateSignal.set({
      selected: this.dateSignal().selected,
      dateList: eachDayOfInterval({
        start: startOfMonth(this.dateSignal().selected),
        end: endOfMonth(this.dateSignal().selected)
      })
    });
  }

  private getFirstListDate(): Date {
    return this.dateSignal().dateList[0];
  }
}
