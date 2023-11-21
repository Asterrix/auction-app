import {Route} from "@angular/router";
import {environment} from "../../../environments/environment";
import {userAlreadyAuthenticatedGuard} from "../../shared/guards/user-already-authenticated.guard";
import {Constant} from "../../shared/models/enums/constant";
import {RegisterPage} from "./register-page.component";

export enum RegisterRouteEndpoint {
  Register = "register"
}

export const RegisterRouteTitle: Record<RegisterRouteEndpoint, string> = {
  [RegisterRouteEndpoint.Register]: "Register",
};

export const REGISTER_ROUTES: Route[] = [
  {
    path: Constant.EmptyValue,
    title: `${environment.applicationName} - ${RegisterRouteTitle[RegisterRouteEndpoint.Register]}`,
    children: [
      {path: Constant.EmptyValue, component: RegisterPage, canActivate: [userAlreadyAuthenticatedGuard]}
    ]
  }
];
