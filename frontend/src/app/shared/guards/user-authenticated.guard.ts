import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";
import {HomeRouteEndpoint} from "../../features/home/home-routes";
import {AuthenticationService} from "../services/user/authentication.service";

export const userAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  if (!AuthenticationService.isAuthenticated()) {
    router.navigate([HomeRouteEndpoint.Home]).then(null);
    return false;
  }

  return true;
};
