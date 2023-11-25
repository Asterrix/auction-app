import {computed, Injectable, signal} from "@angular/core";
import {Constant} from "../models/enums/constant";

export enum AlertType {
  None,
  Info,
  WarningLevelOne,
  WarningLevelTwo,
}

export interface Alert {
  message: string;
  type: AlertType;
}

@Injectable({
  providedIn: "root"
})
export class AlertService {
  private alertSignal = signal<Alert>({message: Constant.EmptyValue, type: AlertType.None});
  alert = computed(this.alertSignal);

  setAlert(value: Alert): void {
    this.alertSignal.set(value);
  }

  clearAlert(): void {
    this.alertSignal.set({message: Constant.EmptyValue, type: AlertType.None});
  }
}
