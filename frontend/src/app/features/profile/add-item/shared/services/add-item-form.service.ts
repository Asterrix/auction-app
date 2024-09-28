import {inject, Injectable} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Api} from "../../../../../shared/services/api.service";
import {ItemService} from "../../../../../shared/services/item.service";
import {AddItemBasicFormService, Basic} from "../../add-item-basic-form/add-item-basic-form.service";
import {
  AddItemLocationShippingService,
  LocationShipping
} from "../../add-item-location-shipping/add-item-location-shipping.service";
import {AddItemPriceFormService, PriceDate} from "../../add-item-set-price-form/add-item-price-form.service";
import CreateItemRequest = Api.ItemApi.PostMethods.CreateItemRequest;

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
      images: basicFormControls.photos.value,
      initialPrice: priceDateForm.price.value,
      startTime: priceDateForm.startTime.value,
      endTime: priceDateForm.endTime.value
    };

    this.itemService.createItem(item);
  }

  public resetForm(): void {
    this.form.reset();
  }
}
