import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {Constant} from "./shared/models/enums/constant";
import {ApiRoute} from "../environments/api-route";

const routes: Routes = [
  {path: Constant.EmptyValue, redirectTo: `/${ApiRoute.HomeRoute.Home}`, pathMatch: "full"},
  {
    path: ApiRoute.HomeRoute.Home,
    loadChildren: () => import("./features/home/home-routes").then(mod => mod.HOME_ROUTES)
  },
  {
    path: ApiRoute.ShopRoute.Shop,
    loadChildren: () => import("./features/shop/shop-routes").then(mod => mod.SHOP_ROUTES)
  },
  {path: "**", redirectTo: `/${ApiRoute.HomeRoute.Home}`}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
