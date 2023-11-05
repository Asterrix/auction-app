import {Api} from "../../services/api.service";
import ItemParams = Api.ItemApi.GetMethods.ItemParams;


export class ItemFilterBuilder {
  private itemParams: Partial<ItemParams> = {};

  filterByName(itemName: string | undefined): void {
    this.itemParams.itemName = itemName;
  }

  filterByCategory(category: string | undefined): this {
    this.itemParams.category = category;
    return this;
  }

  filterBySubcategory(subcategory: string | undefined): this {
    this.itemParams.subcategory = subcategory;
    return this;
  }

  build(): Partial<ItemParams> {
    return this.itemParams;
  }
}
