import {EventEmitter, Injectable} from "@angular/core";

export interface FormNavigation {
  submitFormEvent(): void;

  goBackEvent(): void;

  cancelFormEvent(): void;
}

@Injectable()
export class FormNavigationHandler implements FormNavigation {
  declare submitForm: EventEmitter<void>;
  declare goBack: EventEmitter<void>;
  declare cancelForm: EventEmitter<void>;

  public submitFormEvent(): void {
    this.submitForm.emit();
  }

  public goBackEvent(): void {
    this.goBack.emit();
  }

  public cancelFormEvent(): void {
    this.cancelForm.emit();
  }
}
