import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {DropdownComponent} from "../shared/dropdown/dropdown.component";
import {FormMemberComponent} from "../shared/form-member/form-member.component";

@Component({
  selector: "app-add-item-credit-card-form",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormMemberComponent, DropdownComponent],
  templateUrl: "./add-item-credit-card-form.component.html",
  styleUrl: "./add-item-credit-card-form.component.scss"
})
export class AddItemCreditCardFormComponent {
  @Input({required: true}) creditCardGroup!: FormGroup;
  @Input({required: true}) credCardExpirationGroup!: FormGroup;
}
