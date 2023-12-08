import {inject, Injectable} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AddItemPriceValidationConfig} from "../shared/validation/config/add-item-price-validation.config";
import {ValidationResult} from "../shared/validation/validation";

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

  private _form = this.formBuilder.nonNullable.group<PriceDate>({
    price: new FormControl<string>("", {nonNullable: true}),
    startTime: new FormControl<string>("", {nonNullable: true}),
    endTime: new FormControl<string>("", {nonNullable: true})
  });

  private validation = AddItemPriceValidationConfig.initialise(this._form);

  public get form() {
    return this._form;
  }

  public patchEndTime(endTime: Date): void {
    this._form.patchValue({
      endTime: endTime.toJSON()
    });
  }

  public patchStartTime(startTime: Date): void {
    this._form.patchValue({
      startTime: startTime.toJSON()
    });
  }

  public getValidationStatus(fieldNumber: number): ValidationResult {
    return this.validation.validationStatus(fieldNumber);
  }

  public validateForm(): boolean {
    return this.validation.validateAllFields();
  }
}
