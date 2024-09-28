import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {Constant} from "./shared/models/enums/constant";
import {HomeRouteEndpoint} from "./features/home/home-routes";
import {ShopRouteEndpoint} from "./features/shop/shop-routes";

const routes: Routes = [
  {path: Constant.EmptyValue, redirectTo: `/${HomeRouteEndpoint.Home}`, pathMatch: "full"},
  {
    path: HomeRouteEndpoint.Home,
    loadChildren: () => import("./features/home/home-routes").then(mod => mod.HOME_ROUTES)
  },
  {
    path: ShopRouteEndpoint.Shop,
    loadChildren: () => import("./features/shop/shop-routes").then(mod => mod.SHOP_ROUTES)
  },
  {path: "**", redirectTo: `/${HomeRouteEndpoint.Home}`}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
