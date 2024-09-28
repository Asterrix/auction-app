import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";
import {catchError, of} from "rxjs";
import {map} from "rxjs/operators";
import {ItemService} from "../../../shared/services/item/item.service";
import {ShopRouteEndpoint} from "../shop-routes";
import {ItemIdentifier} from "./item-identifier.enum";


export const purchaseGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const itemService: ItemService = inject(ItemService);
  const itemId: number = route.params[ItemIdentifier.ID];

  const navigateToItemPage = (): void => {
    router.navigate(["/", ShopRouteEndpoint.Shop, ShopRouteEndpoint.Item, itemId]).then(null);
  };

  return itemService.getItemById(itemId).pipe(
    map((item): boolean => {
      if (item.item.timeLeft === "Finished") {
        return true;
      } else {
        navigateToItemPage();
        return false;
      }
    }),
    catchError(() => {
      navigateToItemPage();
      return of(false);
    })
  );
};
