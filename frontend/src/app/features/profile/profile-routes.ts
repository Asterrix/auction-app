import {Route} from "@angular/router";
import {environment} from "../../../environments/environment";
import {userAuthenticatedGuard} from "../../shared/guards/user-authenticated.guard";
import {Constant} from "../../shared/models/enums/constant";
import {ProfilePage} from "./profile-page.component";

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
  [ProfileRouteEndpoint.AddItem]: "Add Item",
};

export const PROFILE_ROUTES: Route[] = [
  {
    path: Constant.EmptyValue,
    title: `${environment.applicationName} - ${ProfileRouteTitle[ProfileRouteEndpoint.MyAccount]}`,
    component: ProfilePage,
    data: {
      trail: ProfileRouteTitle[ProfileRouteEndpoint.MyAccount]
    },
    canActivate: [userAuthenticatedGuard]
  }
];

