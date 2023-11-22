import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Constant} from "../models/enums/constant";

@Injectable({providedIn: "root"})
export class AlertService {
  private alert = new BehaviorSubject<string>(Constant.EmptyValue);

  getAlert(): Observable<string> {
    return this.alert.asObservable();
  }

  setAlert(message: string): void {
    this.alert.next(message);
  }

  clearAlert(): void {
    this.alert.next(Constant.EmptyValue);
  }
}
