import {Route} from "@angular/router";
import {environment} from "../../../environments/environment";
import {userAuthenticatedGuard} from "../../shared/guards/user-authenticated.guard";
import {Constant} from "../../shared/models/enums/constant";
import {ProfileBidComponent} from "./profile-bid/profile-bid.component";
import {ProfilePage} from "./profile-page.component";
import {ProfileSellerComponent} from "./profile-seller/profile-seller.component";

export enum ProfileRouteEndpoint {
  MyAccount = "my-account",
  Seller = "seller",
  Bid = "bids",
  AddItem = "add-item"
}

export const ProfileRouteTitle: Record<ProfileRouteEndpoint, string> = {
  [ProfileRouteEndpoint.MyAccount]: "My Account",
  [ProfileRouteEndpoint.Seller]: "Seller",
  [ProfileRouteEndpoint.Bid]: "Bids",
  [ProfileRouteEndpoint.AddItem]: "Add Item"
};

export const PROFILE_ROUTES: Route[] = [
  {
    path: Constant.EmptyValue,
    title: `${environment.applicationName} - ${ProfileRouteTitle[ProfileRouteEndpoint.MyAccount]}`,
    component: ProfilePage,
    data: {
      trail: ProfileRouteTitle[ProfileRouteEndpoint.MyAccount]
    },
    canActivate: [userAuthenticatedGuard],
    children: [
      {path: Constant.EmptyValue, redirectTo: ProfileRouteEndpoint.Seller, pathMatch: "full"},
      {
        path: ProfileRouteEndpoint.Seller,
        title: `${environment.applicationName} - ${ProfileRouteTitle[ProfileRouteEndpoint.Seller]}`,
        component: ProfileSellerComponent,
        data: {
          trail: ProfileRouteTitle[ProfileRouteEndpoint.Seller]
        }
      },
      {
        path: ProfileRouteEndpoint.Bid,
        title: `${environment.applicationName} - ${ProfileRouteTitle[ProfileRouteEndpoint.Bid]}`,
        component: ProfileBidComponent,
        data: {
          trail: ProfileRouteTitle[ProfileRouteEndpoint.Bid]
        },
      }
    ]
  }
];

