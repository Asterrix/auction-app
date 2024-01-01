import {inject, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {ShopRouteEndpoint} from "../../../features/shop/shop-routes";
import {SearchQuery} from "./search.query.interface";

@Injectable({
  providedIn: "root"
})
export class SearchQueryService implements SearchQuery {
  private readonly router = inject(Router);

  public async navigateToShopPage(searchValue: string) {
    await this.router.navigate(["/", ShopRouteEndpoint.Shop], {
      queryParams: {itemName: searchValue},
    });
  }

  public async appendQueryParameter(searchValue: string) {
    await this.router.navigate([], {
      queryParams: {itemName: searchValue},
      queryParamsHandling: "merge",
    });
  }

  public async clearSearchParameter() {
    await this.router.navigate([], {
      queryParams: {itemName: null},
      queryParamsHandling: "merge",
    });
  }
}
