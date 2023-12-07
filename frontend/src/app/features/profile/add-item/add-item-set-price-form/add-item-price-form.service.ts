import {inject, Injectable} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AddItemPriceValidationConfig} from "../shared/validation/config/add-item-price-validation.config";
import {Validation, ValidationResult} from "../shared/validation/validation";
import {DateTimeService} from "./form-date-time-selector/services/date-time.service";

export type PriceDate = {
  price: FormControl<string>;
  startTime: FormControl<string>;
  endTime: FormControl<string>;
}

interface FormActions {
  patchStartTime(startTime: Date): void;

  patchEndTime(endTime: Date): void;
}

@Injectable({providedIn: "root"})
export class AddItemPriceFormService implements FormActions {
  private formBuilder = inject(FormBuilder);
  private dateTimeService: DateTimeService = inject(DateTimeService);

  private _form = this.formBuilder.nonNullable.group<PriceDate>({
    price: new FormControl<string>("", {nonNullable: true}),
    startTime: new FormControl<string>("", {nonNullable: true}),
    endTime: new FormControl<string>("", {nonNullable: true})
  });

  private validation = new Validation<string>(AddItemPriceValidationConfig.initialiseValidationConfig(this._form));

  public get form(): FormGroup {
    return this._form;
  }

  public patchEndTime(endTime: Date): void {
    this._form.patchValue({
      endTime: this.dateTimeService.getJsonValue(endTime)
    });
  }

  public patchStartTime(startTime: Date): void {
    this._form.patchValue({
      startTime: this.dateTimeService.getJsonValue(startTime)
    });
  }

  public getValidationStatus(fieldNumber: number): ValidationResult {
    return this.validation.validationStatus(fieldNumber);
  }

  public validateForm(): boolean {
    return this.validation.validateAllFields();
  }
}
