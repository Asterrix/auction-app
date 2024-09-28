import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";
import {Token} from "../models/token-manager";

export const userAlreadyAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  if (sessionStorage.getItem(Token.Key)) {
    router.navigate(["/home"]).then(null);
    return false;
  }
  return true;
};
