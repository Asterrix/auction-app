import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {BiddingInformation, Item} from "../../../../../shared/services/api/item/item.interface";

@Component({
  selector: "shop-item-summary",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./item-summary.component.html",
  styleUrls: ["./item-summary.component.scss"]
})
export class ItemSummaryComponent {
  @Input({required: true}) item!: Item;
  @Input({required: true}) biddingInfo!: BiddingInformation;
}
