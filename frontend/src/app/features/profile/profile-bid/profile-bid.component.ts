import {CommonModule} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {Api} from "../../../shared/services/api.service";
import {BidService} from "../../../shared/services/bid.service";
import {TableDataRow} from "../components/table-data-row/table-data-row.component";
import {TableEmptyComponent} from "../components/table-empty/table-empty.component";
import {TableComponent} from "../components/table/table.component";
import UserBiddingInfo = Api.BidApi.UserBiddingInfo;

@Component({
  selector: "profile-bid",
  standalone: true,
  imports: [CommonModule, TableComponent, TableEmptyComponent, TableDataRow, RouterLink],
  templateUrl: "./profile-bid.component.html"
})
export class ProfileBidComponent implements OnInit {
  bids: Observable<Array<UserBiddingInfo>> | undefined;

  constructor(protected biddingService: BidService) {
  }

  public ngOnInit(): void {
    this.bids = this.biddingService.getAllUserBiddingInfo();
  }
}
