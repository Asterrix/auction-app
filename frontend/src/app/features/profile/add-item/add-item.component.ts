import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {AddItemBasicFormComponent} from "./add-item-basic-form/add-item-basic-form.component";

@Component({
  selector: "profile-add-item",
  standalone: true,
  imports: [CommonModule, AddItemBasicFormComponent],
  templateUrl: "./add-item.component.html",
  styleUrl: "./add-item.component.scss"
})
export class AddItemComponent {

}
