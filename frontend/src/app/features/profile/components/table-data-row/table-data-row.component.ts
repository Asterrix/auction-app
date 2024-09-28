import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {Api} from "../../../../shared/services/api.service";
import {ShopRouteEndpoint} from "../../../shop/shop-routes";
import UserBiddingInfo = Api.BidApi.UserBiddingInfo;
import UserItem = Api.UserApi.UserItem;

@Component({
  selector: "profile-table-data-row",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./table-data-row.component.html",
  styleUrls: ["./table-data-row.component.scss"]
})
export class TableDataRow {
  @Input({required: false}) sellerItem!: UserItem;
  @Input({required: false}) biddingInfo!: UserBiddingInfo;
  protected readonly ShopRouteEndpoint = ShopRouteEndpoint;
}
