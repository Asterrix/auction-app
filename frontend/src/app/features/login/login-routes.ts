import {Route} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Constant} from "../../shared/models/enums/constant";
import {LoginPage} from "./login-page.component";

export const LOGIN_ROUTES: Route[] = [
  {
    path: Constant.EmptyValue,
    title: `${environment.applicationName} - Login`,
    children: [
      {path: Constant.EmptyValue, component: LoginPage}
    ]
  }
];
