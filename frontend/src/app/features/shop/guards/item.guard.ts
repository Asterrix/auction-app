import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";
import {catchError, of} from "rxjs";
import {map} from "rxjs/operators";
import {ItemService} from "../../../shared/services/item/item.service";
import {ShopRouteEndpoint} from "../shop-routes";
import {ItemIdentifier} from "./item-identifier.enum";

export const itemGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const itemService = inject(ItemService);
  const itemId: number = route.params[ItemIdentifier.ID];

  const navigateToShopRoute = (): void => {
    router.navigate(["/", ShopRouteEndpoint.Shop]).then(null);
  };

  return itemService.getItem(itemId).pipe(
    map((exists): boolean => {
      if (exists) {
        return true;
      } else {
        navigateToShopRoute();
        return false;
      }
    }),
    catchError(() => {
      navigateToShopRoute();
      return of(false);
    })
  );
};
