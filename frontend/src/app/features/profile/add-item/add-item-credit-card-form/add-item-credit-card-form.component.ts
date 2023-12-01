import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {DropdownComponent} from "../add-item-basic-form/components/form-categories/dropdown/dropdown.component";
import {FormMemberComponent} from "../shared/form-member/form-member.component";

@Component({
  selector: 'app-add-item-credit-card-form',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormMemberComponent, DropdownComponent],
  templateUrl: './add-item-credit-card-form.component.html',
  styleUrl: './add-item-credit-card-form.component.scss'
})
export class AddItemCreditCardFormComponent {

}
