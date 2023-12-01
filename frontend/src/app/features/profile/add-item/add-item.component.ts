import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {AddItemBasicFormComponent} from "./add-item-basic-form/add-item-basic-form.component";
import {AddItemSetPriceFormComponent} from "./add-item-set-price-form/add-item-set-price-form.component";

@Component({
  selector: "profile-add-item",
  standalone: true,
  imports: [CommonModule, AddItemBasicFormComponent, AddItemSetPriceFormComponent],
  templateUrl: "./add-item.component.html",
  styleUrl: "./add-item.component.scss"
})
export class AddItemComponent {

}
