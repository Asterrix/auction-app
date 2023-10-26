import {Injectable} from "@angular/core";
import {Page} from "../../../shared/models/interfaces/page";
import {ObservableDataManager} from "../../../shared/models/observable-data-manager";

export interface FeaturedItem {
  id: number;
  name: string;
  description: string;
  initialPrice: number;
  itemImage:
    {
      id: number;
      name: string;
      imageUrl: string;
    };
}

export interface ItemSummary {
  id: number;
  name: string;
  initialPrice: number;
  itemImages: [
    {
      id: number;
      name: string;
      imageUrl: string;
    }
  ];
}

export enum SortItemAttribute {
  StartDate = "startDate",
  EndDate = "endDate"
}

export enum SortItemDirection {
  ASC = "ASC",
  DESC = "DESC"
}

@Injectable({
  providedIn: "root"
})
export class ItemService {
  item$: ObservableDataManager<FeaturedItem> = new ObservableDataManager<FeaturedItem>();
  items$: ObservableDataManager<Page<ItemSummary>> = new ObservableDataManager<Page<ItemSummary>>();
}
