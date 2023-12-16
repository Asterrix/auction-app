import {Route} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Constant} from "../../shared/models/enums/constant";
import {PurchaseItemComponent} from "./purchase-item/purchase-item.component";
import {ShopItemPage} from "./shop-item/shop-item-page.component";
import {ShopPage} from "./shop-page.component";

export namespace ShopPageParameter {
  export enum Parameter {
    Category = "category",
    Subcategory = "subcategory",
    ItemName = "itemName"
  }
}

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
      {path: Constant.EmptyValue, component: ShopPage},
      {
        path: `${ShopRouteEndpoint.Item}/:${ItemPageParameter.Id}`,
        title: `${environment.applicationName} - ${ShopRouteTitles[ShopRouteEndpoint.Item]}`,
        component: ShopItemPage,
        data: {
          trail: `${ShopRouteTitles[ShopRouteEndpoint.Item]}`
        }
      },
      {
        path: `${ShopRouteEndpoint.Item}/:${ItemPageParameter.Id}/purchase`,
        title: `${environment.applicationName} - ${ShopRouteTitles[ShopRouteEndpoint.Item]}`,
        component: PurchaseItemComponent,
        data: {
          trail: `${ShopRouteTitles[ShopRouteEndpoint.Item]}`
        }
      }
    ]
  }
];
