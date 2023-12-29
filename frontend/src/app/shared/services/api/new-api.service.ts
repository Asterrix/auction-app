import {inject, Injectable} from "@angular/core";
import {CategoryApi} from "./category/category.api";
import {ItemApi} from "./item/item.api";

@Injectable({
  providedIn: "root"
})
export class NewApiService {
  public readonly itemApi: ItemApi = inject(ItemApi);
  public readonly categoryApi: CategoryApi = inject(CategoryApi);
}
