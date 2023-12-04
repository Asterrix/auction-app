import {inject, Injectable} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AddItemBasicFormService, Basic} from "../../add-item-basic-form/add-item-basic-form.service";
import {AddItemLocationShippingService, LocationShipping} from "../../add-item-location-shipping/add-item-location-shipping.service";
import {AddItemPriceFormService, PriceDate} from "../../add-item-set-price-form/add-item-price-form.service";

type AddItemGroup = {
  basicInfo: FormGroup<Basic>,
  priceDate: FormGroup<PriceDate>,
  locationShipping: FormGroup<LocationShipping>
}

@Injectable({
  providedIn: "root"
})
export class AddItemFormService {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private basicForm = inject(AddItemBasicFormService);
  private priceDateForm = inject(AddItemPriceFormService);
  private locationShipping = inject(AddItemLocationShippingService);

  protected form: FormGroup<AddItemGroup> = this.formBuilder.group<AddItemGroup>({
    basicInfo: this.basicForm.form,
    priceDate: this.priceDateForm.form,
    locationShipping: this.locationShipping.form
  });

  public resetForm(): void {
    this.form.reset();
  }
}
