import {inject, Injectable} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, ɵElement} from "@angular/forms";
import {AddItemPriceValidationConfig} from "../shared/validation/config/add-item-price-validation.config";
import {Validation, ValidationResult} from "../shared/validation/validation";

export type PriceDate = {
  price: FormControl<string>
}

@Injectable({
  providedIn: "root"
})
export class AddItemPriceFormService {
  private formBuilder = inject(FormBuilder);
  private _form = this.formBuilder.nonNullable.group<PriceDate>({
    price: new FormControl<string>("", {nonNullable: true})
  });
  private validation = new Validation<string>(AddItemPriceValidationConfig.initialiseValidationConfig(this._form));

  public get form(): FormGroup<{ [K in keyof PriceDate]: ɵElement<PriceDate[K], never> }> {
    return this._form;
  }

  public getValidationStatus(fieldNumber: number): ValidationResult {
    return this.validation.validationStatus(fieldNumber);
  }

  public validateForm(): boolean {
    return this.validation.validateAllFields();
  }
}
