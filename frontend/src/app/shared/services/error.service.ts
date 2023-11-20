import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class ErrorService {
  private errorMessageSubject = new BehaviorSubject<string>("");

  getErrorMessage(): Observable<string> {
    return this.errorMessageSubject.asObservable();
  }

  setErrorMessage(message: string): void {
    return this.errorMessageSubject.next(message);
  }

  clearErrorMessage(): void {
    this.errorMessageSubject.next("");
  }
}
