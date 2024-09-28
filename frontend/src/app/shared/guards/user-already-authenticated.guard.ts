import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";

export const userAlreadyAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  if (sessionStorage.getItem("Token")) {
    router.navigate(["/home"]).then(null);
    return false;
  }
  return true;
};
