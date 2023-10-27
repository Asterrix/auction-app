import {Route} from "@angular/router";
import {Constant} from "../../shared/models/enums/constant";
import {environment} from "../../../environments/environment";
import {ApiRoute, ShopRouteTitles} from "../../../environments/api-route";
import {ShopItemComponent} from "./shop-item/shop-item.component";
import {ShopComponent} from "./shop.component";

export const SHOP_ROUTES: Route[] = [
  {
    path: Constant.EmptyValue,
    title: `${environment.applicationName} - ${ShopRouteTitles[ApiRoute.ShopRoute.Shop]}`,
    data: {
      trail: ShopRouteTitles[ApiRoute.ShopRoute.Shop]
    },
    children: [
      {path: Constant.EmptyValue, component: ShopComponent},
      {
        path: `${ApiRoute.ShopRoute.Item}/:id`,
        title: `${environment.applicationName} - ${ShopRouteTitles[ApiRoute.ShopRoute.Item]}`,
        component: ShopItemComponent,
        data: {
          trail: `${ShopRouteTitles[ApiRoute.ShopRoute.Item]}`
        }
      }
    ]
  }
];
