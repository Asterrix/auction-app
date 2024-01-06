import {inject, Injectable} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {PriceFilter} from "../filter/price-filter.type";
import {PriceRangeFormGroup} from "./price-filter-form-group.type";
import {PriceFilterForm} from "./price-filter-form.interface";

@Injectable({
  providedIn: "root"
})
export class PriceFilterFormService implements PriceFilterForm {
  private readonly formBuilder = inject(FormBuilder);
  private priceRangeForm = this.formBuilder.group<PriceFilter>({
    minPrice: null,
    maxPrice: null
  });

  public get form(): PriceRangeFormGroup {
    return this.priceRangeForm;
  }

  public updateFormValues = async (priceRange: PriceFilter): Promise<void> => {
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
