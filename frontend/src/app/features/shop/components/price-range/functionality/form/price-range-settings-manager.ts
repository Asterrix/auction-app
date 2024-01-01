import {inject, Injectable} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {PriceRangeForm} from "../../type/price-range.type";
import {PriceRangeFormGroup} from "./price-range-form-group.type";
import {PriceRangeFormManager} from "./price-range-form-manager.interface";

@Injectable({
  providedIn: "root"
})
export class PriceRangeSettingsManager implements PriceRangeFormManager {
  private readonly formBuilder = inject(FormBuilder);
  private priceRangeForm = this.formBuilder.nonNullable.group<PriceRangeForm>({
    minPrice: null,
    maxPrice: null
  });

  public get form(): PriceRangeFormGroup {
    return this.priceRangeForm;
  }

  public updateFormValues = async (priceRange: PriceRangeForm): Promise<void> => {
    this.priceRangeForm.patchValue({
      minPrice: priceRange.minPrice,
      maxPrice: priceRange.maxPrice
    });
  };

  public resetFormValues = async (): Promise<void> => {
    this.priceRangeForm.patchValue({
      minPrice: null,
      maxPrice: null
    });
  };
}
