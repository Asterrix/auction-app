import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {FormMemberComponent} from "../shared/form-member/form-member.component";
import {CardDropdownComponent} from "./card-dropdown/card-dropdown.component";

@Component({
  selector: "app-add-item-credit-card-form",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormMemberComponent, CardDropdownComponent],
  templateUrl: "./add-item-credit-card-form.component.html",
  styleUrl: "./add-item-credit-card-form.component.scss"
})
export class AddItemCreditCardFormComponent {
  @Input({required: true}) creditCardGroup!: FormGroup;
  @Input({required: true}) credCardExpirationGroup!: FormGroup;
}
