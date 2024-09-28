import {CommonModule} from "@angular/common";
import {Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {FormWrapperComponent} from "../../../../shared/components/forms/form-wrapper/form-wrapper.component";
import {
  ValidationMessageComponent
} from "../../../../shared/components/forms/validation-message/validation-message.component";
import {AddItemCreditCardFormComponent} from "../add-item-credit-card-form/add-item-credit-card-form.component";
import {DropdownComponent} from "../shared/dropdown/dropdown.component";
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
    DropdownComponent,
    FormMemberComponent,
    FormPhoneNumberComponent,
    AddItemCreditCardFormComponent,
    FormFieldWrapperComponent,
    ValidationMessageComponent,
    ReactiveFormsModule],
  templateUrl: "./add-item-location-shipping.component.html",
  styleUrl: "./add-item-location-shipping.component.scss"
})
export class AddItemLocationShippingComponent extends FormNavigationHandler {
  @Output() override submitForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() override goBack: EventEmitter<void> = new EventEmitter<void>();
  @Output() override cancelForm: EventEmitter<void> = new EventEmitter<void>();
  @Input({required: true}) showCreditCardForm!: boolean;
  protected locationShippingForm = inject(AddItemLocationShippingService);
}
