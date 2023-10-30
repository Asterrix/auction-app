import {Route} from "@angular/router";
import {Constant} from "../../shared/models/enums/constant";
import {environment} from "../../../environments/environment";
import {ShopItemComponent} from "./shop-item/shop-item.component";
import {ShopComponent} from "./shop.component";

export enum ShopRouteEndpoint {
  Shop = "shop",
  Item = "item"
}

export enum ItemPageParameter {
  Id = "id"
}

export const ShopRouteTitles: Record<ShopRouteEndpoint, string> = {
  [ShopRouteEndpoint.Shop]: "Shop",
  [ShopRouteEndpoint.Item]: "Single product",
};

export const SHOP_ROUTES: Route[] = [
  {
    path: Constant.EmptyValue,
    title: `${environment.applicationName} - ${ShopRouteTitles[ShopRouteEndpoint.Shop]}`,
    data: {
      trail: ShopRouteTitles[ShopRouteEndpoint.Shop]
    },
    children: [
      {path: Constant.EmptyValue, component: ShopComponent},
      {
        path: `${ShopRouteEndpoint.Item}/:${ItemPageParameter.Id}`,
        title: `${environment.applicationName} - ${ShopRouteTitles[ShopRouteEndpoint.Item]}`,
        component: ShopItemComponent,
        data: {
          trail: `${ShopRouteTitles[ShopRouteEndpoint.Item]}`
        }
      }
    ]
  }
];
