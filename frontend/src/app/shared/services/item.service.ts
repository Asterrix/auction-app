import {Injectable} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";
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
  private featuredItem$: BehaviorSubject<FeaturedItem | undefined> = new BehaviorSubject<FeaturedItem | undefined>(undefined);
  private item$: BehaviorSubject<Item | undefined> = new BehaviorSubject<Item | undefined>(undefined);
  private items$: BehaviorSubject<ItemSummary[] | undefined> = new BehaviorSubject<ItemSummary[] | undefined>(undefined);

  constructor(private apiService: ApiService) {
  }

  public initFeaturedItem(): void {
    this.apiService.getFeaturedItem().subscribe((item: FeaturedItem): void => {
      this.featuredItem$.next(item);
    });
  }

  public getFeaturedItem(): BehaviorSubject<FeaturedItem | undefined> {
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

  public getItems(): BehaviorSubject<ItemSummary[] | undefined> {
    return this.items$;
  }

  public initItem(id: number): Subscription {
    return this.apiService.getItem(id).subscribe((value) => {
      this.item$.next(value);
    });
  }

  public getItem(): BehaviorSubject<Item | undefined> {
    return this.item$;
  }
}
