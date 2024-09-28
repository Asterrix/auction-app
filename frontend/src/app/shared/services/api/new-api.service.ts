import {inject, Injectable} from "@angular/core";
import {ItemApi} from "./item/item.api";

@Injectable({
  providedIn: "root"
})
export class NewApiService {
  public itemApi = inject(ItemApi);
}
