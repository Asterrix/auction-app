import {Injectable} from "@angular/core";
import {format} from "date-fns";

interface DateFormatter {
  formatThreeLetterDay(date: Date): string;

  formatThreeLetterMonth(date: Date): string;

  formatAllLetterMonth(date: Date): string;
}

@Injectable({
  providedIn: "root"
})
export class DateFormatterService implements DateFormatter {

  // Mon, Thu, Wen
  public formatThreeLetterDay(date: Date): string {
    return format(date, "eee");
  }

  // Jan, Feb, Mar
  public formatThreeLetterMonth(date: Date): string {
    return format(date, "MMM");
  }

  public formatAllLetterMonth(date: Date): string {
    return format(date, "MMMM");
  }
}
