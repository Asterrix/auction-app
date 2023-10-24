import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {Constant} from "./shared/models/enums/constant";
import {ApiRoute} from "../environments/api-route";
import {ShopItemComponent} from "./features/shop/shop-item/shop-item.component";

const applicationName: string = "Auction App";

const routes: Routes = [
  {path: Constant.EmptyValue, redirectTo: `/${ApiRoute.HomeRoute.Home}`, pathMatch: "full"},
  {
    path: ApiRoute.HomeRoute.Home,
    loadChildren: () => import("./features/home/home-routes").then(mod => mod.HOME_ROUTES)
  },
  {
    path: "shop",
    title: `${applicationName} - Shop`,
    data: {
      trail: "Shop"
    },
    children: [
      {
        path: "item/:id",
        title: `${applicationName} - Item`,
        component: ShopItemComponent,
        data: {
          trail: "Single product"
        }
      }
    ]
  },
  {path: "**", redirectTo: `/${ApiRoute.HomeRoute.Home}`}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
