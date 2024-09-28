import {CommonModule} from "@angular/common";
import {Component, EventEmitter, inject, Input, OnInit, Output} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {FormWrapperComponent} from "../../../../shared/components/forms/form-wrapper/form-wrapper.component";
import {
  ValidationMessageComponent
} from "../../../../shared/components/forms/validation-message/validation-message.component";
import {AuthenticationService} from "../../../../shared/services/user/authentication.service";
import {AddItemCreditCardFormComponent} from "../add-item-credit-card-form/add-item-credit-card-form.component";
import {CardDropdownComponent} from "../add-item-credit-card-form/card-dropdown/card-dropdown.component";
import {FormFieldWrapperComponent} from "../shared/form-field-wrapper/form-field-wrapper.component";
import {FormMemberComponent} from "../shared/form-member/form-member.component";
import {FormNavigationHandler} from "../shared/form-navigation-handler";
import {AddItemLocationShippingService} from "./add-item-location-shipping.service";
import {FormPhoneNumberComponent} from "./form-phone-number/form-phone-number.component";

@Component({
  selector: "app-add-item-location-shipping",
  standalone: true,
  imports: [
    CommonModule,
    FormWrapperComponent,
    FormMemberComponent,
    FormPhoneNumberComponent,
    AddItemCreditCardFormComponent,
    FormFieldWrapperComponent,
    ValidationMessageComponent,
    ReactiveFormsModule,
    CardDropdownComponent
  ],
  templateUrl: "./add-item-location-shipping.component.html",
  styleUrl: "./add-item-location-shipping.component.scss"
})
export class AddItemLocationShippingComponent extends FormNavigationHandler implements OnInit {
  @Output() override submitForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() override goBack: EventEmitter<void> = new EventEmitter<void>();
  @Output() override cancelForm: EventEmitter<void> = new EventEmitter<void>();
  @Input({required: true}) showCreditCardForm!: boolean;
  protected locationShippingForm = inject(AddItemLocationShippingService);
  protected userService = inject(AuthenticationService);

  public ngOnInit(): void {
    this.locationShippingForm.form.patchValue({
      email: this.userService.user()?.sub
    });
  }
}
