import {CommonModule} from "@angular/common";
import {Component, inject} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {FormWrapperComponent} from "../../../../shared/components/forms/form-wrapper/form-wrapper.component";
import {
  ValidationMessageComponent
} from "../../../../shared/components/forms/validation-message/validation-message.component";
import {AddItemCreditCardFormComponent} from "../add-item-credit-card-form/add-item-credit-card-form.component";
import {DropdownComponent} from "../shared/dropdown/dropdown.component";
import {FormFieldWrapperComponent} from "../shared/form-field-wrapper/form-field-wrapper.component";
import {FormMemberComponent} from "../shared/form-member/form-member.component";
import {FormPairs} from "../shared/validation/formFieldValidator";
import {FormPhoneNumberComponent} from "./form-phone-number/form-phone-number.component";

@Component({
  selector: "app-add-item-location-shipping",
  standalone: true,
  imports: [CommonModule, FormWrapperComponent, DropdownComponent, FormMemberComponent, FormPhoneNumberComponent, AddItemCreditCardFormComponent, FormFieldWrapperComponent, ValidationMessageComponent, ReactiveFormsModule],
  templateUrl: "./add-item-location-shipping.component.html",
  styleUrl: "./add-item-location-shipping.component.scss"
})
export class AddItemLocationShippingComponent {
  private formBuilder = inject(FormBuilder);
  protected locationShippingForm = this.formBuilder.nonNullable.group({
    address: [""],
    email: [""],
    location: this.formBuilder.nonNullable.group({
      city: [""],
      zip: [""],
      country: [""]
    }),
    contact: [""],
    creditCard: this.formBuilder.nonNullable.group({
      nameOnCard: [""],
      cardNumber: [""],
      expiration: this.formBuilder.nonNullable.group({
        month: [""],
        year: [""],
        cvc: [""]
      })
    })
  });
  protected formControl = this.locationShippingForm.controls;

  protected changeCountry(country: string) {
    this.formControl.location.patchValue({
      country: country
    });
  }
}
