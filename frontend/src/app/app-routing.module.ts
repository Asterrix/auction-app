import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ApiRoute} from "../environments/api-route";
import {Constant} from "./shared/models/enums/constant";

const routes: Routes = [
  {path: Constant.EMPTY_VALUE, redirectTo: `/${ApiRoute.HomeRoute.Home}`, pathMatch: "full"},
  {
    path: ApiRoute.HomeRoute.Home,
    loadChildren: () => import("./features/home/home-routes").then(mod => mod.HOME_ROUTES)
  },
  {path: "**", redirectTo: `/${ApiRoute.HomeRoute.Home}`}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
