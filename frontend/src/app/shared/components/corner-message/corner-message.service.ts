import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Constant} from "../../models/enums/constant";

export type CornerMessage = {
  title: string;
  message: string;
  display: boolean;
}

@Injectable({
  providedIn: "root"
})
export class CornerMessageService {
  private defaultState: CornerMessage = {
    display: false,
    title: Constant.EmptyValue,
    message: Constant.EmptyValue,
  };
  private defaultTimeout = 10000;
  private displayMessageSubject$ = new BehaviorSubject<CornerMessage>(this.defaultState);
  public displayMessage$ = this.displayMessageSubject$.asObservable();

  setDisplayMessage(message: CornerMessage): void {
    this.displayMessageSubject$.next(message);

    setTimeout(() => {
      this.displayMessageSubject$.next(this.defaultState);
    }, this.defaultTimeout);
  }
}
