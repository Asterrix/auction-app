import {computed, Injectable, signal} from "@angular/core";
import {addMonths, eachDayOfInterval, endOfMonth, startOfMonth, subMonths} from "date-fns";

@Injectable({
  providedIn: "root"
})
export class DatePickerService {
  private currentDate: Date = new Date();
  private beginningOfMonth: Date = startOfMonth(this.currentDate);
  private endOfMonth: Date = endOfMonth(this.currentDate);
  private dateSignal = signal<Date[]>(eachDayOfInterval({
    start: this.beginningOfMonth,
    end: this.endOfMonth
  }));
  date = computed(() => this.dateSignal());

  public goToNextMonth(): void {
    const nextDate: Date = addMonths(this.date()[0], 1);
    const beginningOfNextMonth: Date = startOfMonth(nextDate);
    const endOfNewMonth: Date = endOfMonth(nextDate);

    this.dateSignal.set(eachDayOfInterval({
      start: beginningOfNextMonth,
      end: endOfNewMonth
    }));
  }

  public goToPreviousMonth(): void {
    const beginningOfPreviousMonth: Date = subMonths(this.dateSignal()[0], 1);

    if (beginningOfPreviousMonth >= startOfMonth(this.currentDate)) {
      const endOfPreviousMonth: Date = endOfMonth(beginningOfPreviousMonth);

      this.dateSignal.set(eachDayOfInterval({
        start: beginningOfPreviousMonth,
        end: endOfPreviousMonth
      }));
    }
  }

  public firstDayOfTheCurrentMonth(): number {
    return this.dateSignal()[0].getDay();
  }
}
