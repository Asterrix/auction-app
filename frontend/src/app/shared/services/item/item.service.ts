import {inject, Injectable} from "@angular/core";
import {CreateItemRequest, GetItemsParams} from "../api/item/item.type";
import {NewApiService} from "../api/new-api.service";

@Injectable({providedIn: "root"})
export class ItemService {
  private apiService = inject(NewApiService);

  getItem = (itemId: number) => {
    return this.apiService.itemApi.getItemById(itemId);
  };
  getFeaturedItem = () => {
    return this.apiService.itemApi.getFeaturedItem();
  };
  getItems = (params: GetItemsParams) => {
    return this.apiService.itemApi.getListOfItems(params);
  };
  createItem = (request: CreateItemRequest) => {
    return this.apiService.itemApi.createItem(request);
  };
}
