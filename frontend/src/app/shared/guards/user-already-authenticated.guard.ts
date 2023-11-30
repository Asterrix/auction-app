import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";
import {AuthenticationService} from "../services/user/authentication.service";

export const userAlreadyAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const userService: AuthenticationService = inject(AuthenticationService);

  if (userService.user()) {
    router.navigate(["/home"]).then(null);
    return false;
  }
  return true;
};
