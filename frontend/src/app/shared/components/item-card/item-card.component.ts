import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {ItemSummary} from "../../services/api/item/item.interface";

@Component({
  selector: "app-item-card",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./item-card.component.html",
  styleUrls: ["./item-card.component.scss"]
})
export class ItemCardComponent {
  @Input({required: true}) item!: ItemSummary;
  @Input({required: true}) imageOrientation: string = "v";
}
