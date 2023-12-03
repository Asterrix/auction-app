import {CommonModule} from "@angular/common";
import {Component, inject} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormWrapperComponent} from "../../../../shared/components/forms/form-wrapper/form-wrapper.component";
import {
  ValidationMessageComponent
} from "../../../../shared/components/forms/validation-message/validation-message.component";
import {FormFieldWrapperComponent} from "../shared/form-field-wrapper/form-field-wrapper.component";
import {FormFieldValidator} from "../shared/validation/formFieldValidator";
import {FormDatepicker} from "./form-date-picker/form-datepicker.component";
import {FormStartPriceComponent} from "./form-start-price/form-start-price.component";
import {PriceValidator} from "./validation/price-validator";

@Component({
  selector: "add-item-set-price-form",
  standalone: true,
  imports: [CommonModule, FormWrapperComponent, ReactiveFormsModule, FormsModule, FormStartPriceComponent, FormDatepicker, FormFieldWrapperComponent, ValidationMessageComponent],
  templateUrl: "./add-item-set-price-form.component.html",
  styleUrl: "./add-item-set-price-form.component.scss"
})
export class AddItemSetPriceFormComponent {
  private formBuilder = inject(FormBuilder);
  protected setPriceForm = this.formBuilder.nonNullable.group({
    price: [""]
  });
  protected formControl = this.setPriceForm.controls;
  protected validation = new FormFieldValidator([
    {formControl: this.formControl.price, validator: new PriceValidator()}
  ]);

  public submitForm(): void {
    this.validation.validateAllFormFields();
  }
}
