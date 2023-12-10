import {inject, Injectable} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {ResetForm} from "../../shared/interfaces/reset-form";
import {AddItemPriceValidationConfig} from "../../shared/validation/config/add-item-price-validation.config";
import {ValidationResult} from "../../shared/validation/validation";

export type PriceDateTime = {
  price: FormControl<string>;
  startTime: FormControl<string>;
  endTime: FormControl<string>;
}

@Injectable({providedIn: "root"})
export class AddItemPriceFormService implements ResetForm {
  private formBuilder = inject(FormBuilder);

  private _form = this.formBuilder.nonNullable.group<PriceDateTime>({
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

  public resetForm(): void {
    this._form.reset();
  }
}
