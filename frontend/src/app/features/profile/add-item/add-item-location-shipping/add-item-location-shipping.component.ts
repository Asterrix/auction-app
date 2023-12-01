import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormWrapperComponent} from "../../../../shared/components/forms/form-wrapper/form-wrapper.component";
import {DropdownComponent} from "../add-item-basic-form/components/form-categories/dropdown/dropdown.component";
import {FormMemberComponent} from "../shared/form-member/form-member.component";
import {FormPhoneNumberComponent} from "./form-phone-number/form-phone-number.component";

@Component({
  selector: 'app-add-item-location-shipping',
  standalone: true,
  imports: [CommonModule, FormWrapperComponent, DropdownComponent, FormMemberComponent, FormPhoneNumberComponent],
  templateUrl: './add-item-location-shipping.component.html',
  styleUrl: './add-item-location-shipping.component.scss'
})
export class AddItemLocationShippingComponent {

}
