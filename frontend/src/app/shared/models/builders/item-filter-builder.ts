import {ItemOrderBy} from "../../services/api/item/item.enum";
import {GetItemsParams} from "../../services/api/item/item.type";

export class ItemFilterBuilder {
  private itemParams: Partial<GetItemsParams> = {};

  filterByName(itemName: string | undefined): void {
    this.itemParams.name = itemName;
  }

  filterByCategory(category: string | undefined): this {
    this.itemParams.category = category;
    return this;
  }

  filterBySubcategory(subcategory: string | undefined): this {
    this.itemParams.subcategory = subcategory;
    return this;
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
