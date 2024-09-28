import {CommonModule} from "@angular/common";
import {ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output} from "@angular/core";
import {format} from "date-fns";
import {DateTimeForm} from "../form-date-time-selector.component";
import {DatePickerService} from "../services/date-picker.service";

@Component({
  selector: "app-date-picker",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./date-picker.component.html",
  styleUrl: "./date-picker.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnInit, DateTimeForm {
  @Output() closeEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<void>();
  protected datePickerService = inject(DatePickerService);
  protected firstDayOfTheMonthSpacing: number[] = new Array(this.datePickerService.firstDayOfTheCurrentMonth());
  protected month = format(this.datePickerService.date()[0], "MMMM");
  protected year = format(this.datePickerService.date()[0], "yyyy");

  public ngOnInit(): void {
  }

  public goToNextMonth(): void {
    this.datePickerService.goToNextMonth();
    this.firstDayOfTheMonthSpacing = new Array(this.datePickerService.firstDayOfTheCurrentMonth());
    this.month = format(this.datePickerService.date()[0], "MMMM");
    this.year = format(this.datePickerService.date()[0], "yyyy");
  }

  public goToThePreviousMonth(): void {
    this.datePickerService.goToPreviousMonth();
    this.firstDayOfTheMonthSpacing = new Array(this.datePickerService.firstDayOfTheCurrentMonth());
    this.month = format(this.datePickerService.date()[0], "MMMM");
    this.year = format(this.datePickerService.date()[0], "yyyy");
  }

  public closeForm(): void {
    this.closeEvent.emit();
  }

  public submitForm(): void {
    this.submitEvent.emit();
  }
}