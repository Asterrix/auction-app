import {Injectable} from "@angular/core";
import {CategoryFilter} from "../../../features/shop/components/sidebar/filter/category-filter.type";
import {ItemOrderBy} from "../../services/api/item/item.enum";
import {CategoryRequest, GetItemsParams} from "../../services/api/item/item.type";

@Injectable({
  providedIn: "root"
})
export class ItemFilterBuilder {
  private itemParams: Partial<GetItemsParams> = {};


  filterByName(itemName: string | undefined): void {
    this.itemParams.name = itemName;
  }

  filterByCategories(categories: CategoryFilter): void {
    let cat: CategoryRequest[] = [];

    for (const [first, second] of categories) {
      cat.push({category: first, subcategories: second});
    }

    this.itemParams.categories = cat;
  }

  orderBy(orderBy: string | undefined): this {
    if (orderBy) {
      const ItemOrderByValues = Object.values(ItemOrderBy);

      for (const enumValue of ItemOrderByValues) {
        if (enumValue === orderBy) {
          this.itemParams.orderBy = orderBy;
        }
      }
    } else {
      this.itemParams.orderBy = undefined;
    }

    return this;
  }

  build(): Partial<GetItemsParams> {
    return this.itemParams;
  }
}
