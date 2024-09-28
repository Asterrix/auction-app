import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";
import {catchError, of} from "rxjs";
import {map} from "rxjs/operators";
import {NewItemService} from "../../../shared/services/item/new-item.service";
import {ShopRouteEndpoint} from "../shop-routes";
import {ItemIdentifier} from "./item-identifier.enum";

export const itemGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const itemService = inject(NewItemService);
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
