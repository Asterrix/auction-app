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
    const isOrderByValid: boolean = Object.values(ItemOrderBy).includes(orderBy as ItemOrderBy);
    const findOrderBy = Object.values(ItemOrderBy).find((value) => value === orderBy);

    this.itemParams.orderBy = isOrderByValid ? findOrderBy : undefined;

    return this;
  }

  build(): Partial<GetItemsParams> {
    return this.itemParams;
  }
}
