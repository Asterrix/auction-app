import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, inject, OnInit} from "@angular/core";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ClickOutsideDirective} from "../../../../shared/directives/click-outside.directive";
import {ItemOrderBy} from "../../../../shared/services/api/item/item.enum";
import {ShopRouteEndpoint} from "../../shop-routes";

@Component({
  selector: "shop-sorting-dropdown",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ClickOutsideDirective, RouterLink],
  templateUrl: "./sort-items.component.html",
  styleUrl: "./sort-items.component.scss"
})
export class SortItemsComponent implements OnInit {
  public isActive: boolean = false;
  protected readonly ShopRouteEndpoint = ShopRouteEndpoint;
  protected sortingOptions: { label: string; value: ItemOrderBy }[] = [
    {label: "Default sorting", value: ItemOrderBy.NameAsc},
    {label: "Newest", value: ItemOrderBy.Newest},
    {label: "Time left", value: ItemOrderBy.TimeLeft},
    {label: "Price (Low-High)", value: ItemOrderBy.PriceAsc},
    {label: "Price (High-Low)", value: ItemOrderBy.PriceDesc}
  ];
  protected activeOrder = this.sortingOptions[0];
  private activeRoute = inject(ActivatedRoute);

  public ngOnInit(): void {
    if (this.activeRoute.snapshot.queryParams["orderBy"]) {
      const activeOrder = this.sortingOptions.find((option) => {
        return option.value === this.activeRoute.snapshot.queryParams["orderBy"];
      });

      activeOrder && (this.activeOrder = activeOrder);
    }
  }

  protected hideDropdownMenu(): void {
    this.isActive = false;
  }

  protected changeActiveOrder(order: ItemOrderBy): void {
    this.hideDropdownMenu();

    if (order === this.activeOrder.value) {
      return;
    } else {
      const selectedOrder = this.sortingOptions.find((option) => {
        return option.value === order;
      });
      selectedOrder && (this.activeOrder = selectedOrder);
    }
  }

  protected toggleDropdownMenu(): void {
    this.isActive = !this.isActive;
  }
}
