import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {AddItemBasicFormComponent} from "./add-item-basic-form/add-item-basic-form.component";
import {AddItemLocationShippingComponent} from "./add-item-location-shipping/add-item-location-shipping.component";
import {AddItemSetPriceFormComponent} from "./add-item-set-price-form/add-item-set-price-form.component";

@Component({
  selector: "profile-add-item",
  standalone: true,
  imports: [CommonModule, AddItemBasicFormComponent, AddItemSetPriceFormComponent, AddItemLocationShippingComponent],
  templateUrl: "./add-item.component.html",
  styleUrl: "./add-item.component.scss"
})
export class AddItemComponent {

}
