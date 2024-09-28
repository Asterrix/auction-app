import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ItemSummary} from "../../services/item.service";

@Component({
  selector: "app-item-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./item-card.component.html",
  styleUrls: ["./item-card.component.scss"]
})
export class ItemCardComponent {
  @Input({required: true}) item!: ItemSummary;
}
