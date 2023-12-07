import {inject, Injectable} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AddItemPriceValidationConfig} from "../shared/validation/config/add-item-price-validation.config";
import {Validation, ValidationResult} from "../shared/validation/validation";

export type PriceDate = {
  price: FormControl<string>;
  startTime: FormControl<string>;
  endTime: FormControl<string>;
}

@Injectable({
  providedIn: "root"
})
export class AddItemPriceFormService {
  private formBuilder = inject(FormBuilder);
  private _form = this.formBuilder.nonNullable.group<PriceDate>({
    price: new FormControl<string>("", {nonNullable: true}),
    startTime: new FormControl<string>("", {nonNullable: true}),
    endTime: new FormControl<string>("", {nonNullable: true})
  });
  private validation = new Validation<string>(AddItemPriceValidationConfig.initialiseValidationConfig(this._form));

  public get form(): FormGroup {
    return this._form;
  }

  public getValidationStatus(fieldNumber: number): ValidationResult {
    return this.validation.validationStatus(fieldNumber);
  }

  public validateForm(): boolean {
    return this.validation.validateAllFields();
  }
}
