import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeRouteEndpoint} from "./features/home/home-routes";
import {LoginRouteEndpoint} from "./features/login/login-routes";
import {ShopRouteEndpoint} from "./features/shop/shop-routes";
import {Constant} from "./shared/models/enums/constant";

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
  {
    path: LoginRouteEndpoint.Login,
    loadChildren: () => import("./features/login/login-routes").then(mod => mod.LOGIN_ROUTES)
  },
  {path: "**", redirectTo: `/${HomeRouteEndpoint.Home}`}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
