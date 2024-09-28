import {inject, Injectable} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ResetForm} from "../../shared/interfaces/reset-form";

type Location = {
  city: FormControl<string>;
  zip: FormControl<string>;
  country: FormControl<string>;
}

type CreditCard = {
  name: FormControl<string>;
  number: FormControl<string>;
  expiration: FormGroup<CardExpiration>;
}

type CardExpiration = {
  month: FormControl<string>;
  year: FormControl<string>;
  cvc: FormControl<string>;
}

export type LocationShipping = {
  address: FormControl<string>;
  email: FormControl<string>;
  location: FormGroup<Location>;
  contact: FormControl<string>;
  creditCard: FormGroup<CreditCard>
}

@Injectable({
  providedIn: "root"
})
export class AddItemLocationShippingService implements ResetForm {
  private formBuilder = inject(FormBuilder);

  private _form = this.formBuilder.nonNullable.group<LocationShipping>({
    address: new FormControl<string>("", {nonNullable: true}),
    contact: new FormControl<string>("", {nonNullable: true}),
    email: new FormControl<string>("", {nonNullable: true}),

    creditCard: this.formBuilder.nonNullable.group<CreditCard>({
      name: new FormControl<string>("", {nonNullable: true}),
      number: new FormControl<string>("", {nonNullable: true}),
      expiration: this.formBuilder.nonNullable.group<CardExpiration>({
        month: new FormControl<string>("", {nonNullable: true}),
        year: new FormControl<string>("", {nonNullable: true}),
        cvc: new FormControl<string>("", {nonNullable: true}),
      }),
    }),

    location: this.formBuilder.nonNullable.group<Location>({
      country: new FormControl<string>("", {nonNullable: true}),
      city: new FormControl<string>("", {nonNullable: true}),
      zip: new FormControl<string>("", {nonNullable: true}),
    })
  });

  public get form() {
    return this._form;
  }

  public resetForm(): void {
    this._form.reset();
  }
}
