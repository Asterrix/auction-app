import {HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Api} from "../api.service";
import BidRequest = Api.BidApi.BidRequest;
import UserBiddingInfo = Api.BidApi.UserBiddingInfo;

@Injectable({providedIn: "root"})
export class BidService {

  constructor(private apiService: Api.Service) {

  }

  makeAnOffer(offer: Required<BidRequest>): Observable<HttpResponse<void>> {
    return this.apiService.bidOnItem(offer);
  }

  getAllUserBiddingInfo(): Observable<Array<UserBiddingInfo>> {
    return this.apiService.getAllUserBiddingInformation();
  }
}
