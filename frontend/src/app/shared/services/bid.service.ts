import {Injectable} from "@angular/core";
import {catchError, Observable} from "rxjs";
import {AlertService, AlertType} from "./alert.service";
import {Api} from "./api.service";
import {ItemService} from "./item.service";
import BidRequest = Api.BidApi.BidRequest;
import UserBiddingInfo = Api.BidApi.UserBiddingInfo;

@Injectable({providedIn: "root"})
export class BidService {

  constructor(private apiService: Api.Service,
              private alertService: AlertService,
              private itemService: ItemService) {

  }

  makeAnOffer(offer: Required<BidRequest>): void {
    this.apiService.bidOnItem(offer)
      .pipe(
        catchError((e) => {
          this.alertService.setAlert({
            message: "There are higher bids than yours. You could give a second try!",
            type: AlertType.WarningLevelTwo
          });
          throw e;
        })
      )
      .subscribe(() => {
        this.alertService.setAlert({message: "Congrats! You are the highest bidder!", type: AlertType.Info});
        this.itemService.initItem(offer.itemId);
      });
  }

  getAllUserBiddingInfo(): Observable<Array<UserBiddingInfo>> {
    return this.apiService.getAllUserBiddingInformation();
  }
}
