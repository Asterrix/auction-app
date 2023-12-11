import {inject, Injectable} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Api} from "../../../../../shared/services/api.service";
import {ItemService} from "../../../../../shared/services/item/item.service";
import {AddItemBasicFormService, Basic} from "../../add-item-basic-form/services/add-item-basic-form.service";
import {
  AddItemLocationShippingService,
  LocationShipping
} from "../../add-item-location-shipping/services/add-item-location-shipping.service";
import {
  AddItemPriceFormService,
  PriceDateTime
} from "../../add-item-set-price-form/services/add-item-price-form.service";
import {ResetForm} from "../interfaces/reset-form";
import CreateItemRequest = Api.ItemApi.PostMethods.CreateItemRequest;

type AddItemGroup = {
  basicInfo: FormGroup<Basic>,
  priceDate: FormGroup<PriceDateTime>,
  locationShipping: FormGroup<LocationShipping>
}

@Injectable({
  providedIn: "root"
})
export class AddItemFormService implements ResetForm {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private basicForm = inject(AddItemBasicFormService);
  private priceDateForm = inject(AddItemPriceFormService);
  private locationShipping = inject(AddItemLocationShippingService);
  protected form: FormGroup<AddItemGroup> = this.formBuilder.group<AddItemGroup>({
    basicInfo: this.basicForm.form,
    priceDate: this.priceDateForm.form,
    locationShipping: this.locationShipping.form
  });
  private itemService = inject(ItemService);

  public submitForm() {
    const basicFormControls = this.basicForm.form.controls;
    const priceDateForm = this.priceDateForm.form.controls;
    const locationShipping = this.locationShipping.form.controls;

    const item: CreateItemRequest = {
      name: basicFormControls.itemName.value,
      category: basicFormControls.category.value,
      subcategory: basicFormControls.subcategory.value,
      description: basicFormControls.description.value,
      images: basicFormControls.images.value,
      initialPrice: priceDateForm.price.value,
      startTime: priceDateForm.startTime.value,
      endTime: priceDateForm.endTime.value
    };

    return this.itemService.createItem(item);
  }

  public resetForm(): void {
    this.basicForm.resetForm();
    this.priceDateForm.resetForm();
    this.locationShipping.resetForm();
    this.form.reset();
  }
}
