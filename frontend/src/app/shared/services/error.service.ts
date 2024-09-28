import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {ErrorModel, Severity} from "../models/errorModel";

@Injectable({providedIn: "root"})
export class ErrorService {
  private errorSubject = new BehaviorSubject<ErrorModel | null>(null);

  getError(): Observable<ErrorModel | null> {
    return this.errorSubject.asObservable();
  }

  initialiseError(severity: Severity, message: string): void {
    this.errorSubject.next(ErrorModel.initialiseError(severity, message));
  }

  clearErrorSubject(): void {
    this.errorSubject.next(null);
  }
}