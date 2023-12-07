import {computed, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {eachDayOfInterval, endOfMonth, startOfMonth} from "date-fns";
import {MemoService} from "../../../../../../shared/services/memo.service";
import {DateService} from "./date.service";
import {TimePeriod, TimeService} from "./time.service";

export type DateTime = {
  currentDate: Date;
  selected: Date;
  selectedMonthDateList: Date[];
}

interface MemoState {
  saveState(state: DateTime): void;

  restoreDateTimeToOriginalState(): void;

  restoreDateTimeToPreviousState(): void;

  clearMemorisedState(): void;
}

@Injectable({providedIn: "root"})
export class DateTimeService implements MemoState {
  private readonly currentDate: Date = new Date();
  private readonly dateService: DateService = inject(DateService);
  private readonly timeService: TimeService = inject(TimeService);
  private readonly mementoService: MemoService<DateTime> = inject(MemoService);

  private dateTimeSignal: WritableSignal<DateTime> = signal<DateTime>({
    currentDate: this.currentDate,
    selected: this.currentDate,
    selectedMonthDateList: eachDayOfInterval({
      start: startOfMonth(this.currentDate),
      end: endOfMonth(this.currentDate)
    })
  });

  public dateTime: Signal<DateTime> = computed(() => this.dateTimeSignal());

  public changeSelectedDate(nextDate: Date): void {
    const selectedDate: Date = this.dateService.changeSelectedDate(this.currentDate, nextDate);

    this.dateTimeSignal.set({
      ...this.dateTime(),
      selected: selectedDate,
      selectedMonthDateList: this.dateService.getListOfMonthDays(selectedDate)
    });
  }

  public isSameSelectedDateIgnoreTime(date: Date): boolean {
    return this.dateService.isSameSelectedDateIgnoreTime(this.dateTime().selected, date);
  }

  public nextMonth(): void {
    const nextMonthDates: Date[] = this.dateService.nextMonth(this.dateTime().selectedMonthDateList[0]);

    this.dateTimeSignal.set({
      ...this.dateTime(),
      selectedMonthDateList: nextMonthDates
    });
  }

  public previousMonth(): void {
    const previousMonthDates: Date[] = this.dateService.previousMonth(this.currentDate, this.dateTime().selectedMonthDateList[0]);

    if (previousMonthDates.length > 0) {
      this.dateTimeSignal.set({
        ...this.dateTime(),
        selectedMonthDateList: previousMonthDates
      });
    }
  }

  public addDays(daysCount: number): void {
    const newDate: Date = this.dateService.addDays(this.dateTime().selected, daysCount);

    this.dateTimeSignal.set({
      ...this.dateTime(),
      selected: newDate,
      selectedMonthDateList: this.dateService.getListOfMonthDays(newDate)
    });
  }

  public addConstrainedHours(hours: number): void {
    const newHours: Date = this.timeService.addConstrainedHours(this.dateTime().selected, hours);

    this.dateTimeSignal.set({
      ...this.dateTime(),
      selected: newHours
    });
  }

  public addConstrainedMinutes(minutes: number): void {
    const newMinutes: Date = this.timeService.addConstrainedMinutes(this.dateTime().selected, minutes);

    this.dateTimeSignal.set({
      ...this.dateTime(),
      selected: newMinutes
    });
  }

  public changeTimePeriod(timePeriod: TimePeriod): void {
    const changedTimePeriod: Date = this.timeService.changeTimePeriod(this.dateTime().selected, timePeriod);

    this.dateTimeSignal.set({
      ...this.dateTime(),
      selected: changedTimePeriod
    });
  }

  public subtractConstrainedHours(hours: number): void {
    const subtractedHours: Date = this.timeService.subtractConstrainedHours(this.dateTime().selected, hours);

    this.dateTimeSignal.set({
      ...this.dateTime(),
      selected: subtractedHours
    });
  }

  public subtractConstrainedMinutes(minutes: number): void {
    const subtractMinutes: Date = this.timeService.subtractConstrainedMinutes(this.dateTime().selected, minutes);

    this.dateTimeSignal.set({
      ...this.dateTime(),
      selected: subtractMinutes
    });
  }

  public saveState(state: DateTime): void {
    this.mementoService.saveState(state);
  }

  public clearMemorisedState(): void {
    this.mementoService.clearState();
  }

  public restoreDateTimeToPreviousState(): void {
    const previousState: DateTime | undefined = this.mementoService.latestState();

    if (previousState !== undefined) {
      this.dateTimeSignal.set(previousState);
    }
  }

  public restoreDateTimeToOriginalState(): void {
    const originalState: DateTime | undefined = this.mementoService.originalState();

    if (originalState !== undefined) {
      this.dateTimeSignal.set(originalState);
    }
  }

  public isLess(date: Date): boolean {
    return this.dateService.isLess(this.currentDate, date);
  }
}
