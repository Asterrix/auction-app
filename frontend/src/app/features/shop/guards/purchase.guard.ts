import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";
import {catchError, of} from "rxjs";
import {map} from "rxjs/operators";
import {NewItemService} from "../../../shared/services/item/new-item.service";
import {AuthenticationService} from "../../../shared/services/user/authentication.service";
import {ShopRouteEndpoint} from "../shop-routes";
import {ItemIdentifier} from "./item-identifier.enum";


export const purchaseGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const itemService = inject(NewItemService);
  const authService = inject(AuthenticationService);
  const itemId: number = route.params[ItemIdentifier.ID];

  const navigateToItemPage = (): void => {
    router.navigate(["/", ShopRouteEndpoint.Shop, ShopRouteEndpoint.Item, itemId]).then(null);
  };

  return itemService.getItem(itemId).pipe(
    map((item): boolean => {
      if (item.item.timeLeft === "Finished"
        && !item.item.finished && authService.isAuthenticated()
        && (item.biddingInformation.highestBidderId === authService.user()?.id)) {
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
