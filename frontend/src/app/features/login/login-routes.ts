import {Route} from "@angular/router";
import {environment} from "../../../environments/environment";
import {userAlreadyAuthenticatedGuard} from "../../shared/guards/user-already-authenticated.guard";
import {Constant} from "../../shared/models/enums/constant";
import {LoginPage} from "./login-page.component";

export enum LoginRouteEndpoint {
  Login = "login",
}

export const LoginRouteTitle: Record<LoginRouteEndpoint, string> = {
  [LoginRouteEndpoint.Login]: "Login",
};

export const LOGIN_ROUTES: Route[] = [
  {
    path: Constant.EmptyValue,
    title: `${environment.applicationName} - ${LoginRouteTitle[LoginRouteEndpoint.Login]}`,
    children: [
      {path: Constant.EmptyValue, component: LoginPage, canActivate: [userAlreadyAuthenticatedGuard]}
    ]
  }
];
