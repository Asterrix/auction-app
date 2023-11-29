import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Api} from "../../../../../shared/services/api.service";
import BiddingInformation = Api.ItemApi.Interfaces.BiddingInformation;
import Item = Api.ItemApi.Interfaces.Item;

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
