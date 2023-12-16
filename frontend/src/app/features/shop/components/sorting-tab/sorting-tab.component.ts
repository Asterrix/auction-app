import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {SortItemsComponent} from "../sort-items/sort-items.component";

@Component({
  selector: "shop-sorting-tab",
  standalone: true,
  imports: [CommonModule, SortItemsComponent],
  templateUrl: "./sorting-tab.component.html",
  styleUrl: "./sorting-tab.component.scss"
})
export class SortingTabComponent {

}
