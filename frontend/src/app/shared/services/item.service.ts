import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ApiService} from "./api.service";
import {Page} from "../models/interfaces/page";

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

export interface Item {
  id: number;
  name: string;
  description: string;
  initialPrice: number;
  timeLeft: string;
  itemImages: [
    {
      id: number;
      name: string;
      imageUrl: string;
    }
  ];
}

export interface ItemImage {
  id: number;
  name: string;
  imageUrl: string;
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
  private featuredItem$: BehaviorSubject<FeaturedItem> = new BehaviorSubject<FeaturedItem>({} as FeaturedItem);
  private item$: BehaviorSubject<Item> = new BehaviorSubject<Item>({} as Item);
  private items$: BehaviorSubject<ItemSummary[]> = new BehaviorSubject<ItemSummary[]>({} as ItemSummary[]);

  constructor(private apiService: ApiService) {
  }

  public initFeaturedItem(): void {
    this.apiService.getFeaturedItem().subscribe((item: FeaturedItem): void => {
      this.featuredItem$.next(item);
    });
  }

  public getFeaturedItem(): BehaviorSubject<FeaturedItem> {
    return this.featuredItem$;
  }

  public initItemsNewArrivals(): void {
    this.apiService.getListOfNewestItems().subscribe((page: Page<ItemSummary>) => {
      this.items$.next(page.content);
    });
  }

  public initItemsLastChance(): void {
    this.apiService.getListOfLastChanceItems().subscribe((page: Page<ItemSummary>) => {
      this.items$.next(page.content);
    });
  }

  public getItems(): BehaviorSubject<ItemSummary[]> {
    return this.items$;
  }

  public initItem(id: number) {
    return this.apiService.getItem(id).subscribe((value) => {
      this.item$.next(value);
    });
  }

  public getItem() {
    return this.item$;
  }
}
