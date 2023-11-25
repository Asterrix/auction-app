import {computed, Injectable, signal} from "@angular/core";
import {Constant} from "../models/enums/constant";
import {Alert, AlertType} from "./alert.service";

@Injectable({providedIn: "root"})
export class ErrorService {
  private errorSignal = signal<Alert>({message: Constant.EmptyValue, type: AlertType.None});
  error = computed(this.errorSignal);

  isPresent(): boolean {
    return this.error().type !== AlertType.None;
  }

  setError(value: Alert): void {
    this.errorSignal.set(value);
  }

  clearError(): void {
    this.errorSignal.set({message: Constant.EmptyValue, type: AlertType.None});
  }
}
