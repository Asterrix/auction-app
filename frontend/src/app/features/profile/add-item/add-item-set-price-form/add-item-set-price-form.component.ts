import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {FormWrapperComponent} from "../../../../shared/components/forms/form-wrapper/form-wrapper.component";
import {FormDatepicker} from "./form-date-picker/form-datepicker.component";
import {FormStartPriceComponent} from "./form-start-price/form-start-price.component";

@Component({
  selector: "add-item-set-price-form",
  standalone: true,
  imports: [CommonModule, FormWrapperComponent, FormsModule, FormStartPriceComponent, FormDatepicker],
  templateUrl: "./add-item-set-price-form.component.html",
  styleUrl: "./add-item-set-price-form.component.scss"
})
export class AddItemSetPriceFormComponent {
}
