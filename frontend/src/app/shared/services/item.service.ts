import {Injectable} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";
import {ApiService} from "./api.service";
import {Page} from "../models/interfaces/page";

interface ItemBaseProperties {
  id: number;
  name: string;
  initialPrice: number;
}

export interface FeaturedItem extends ItemBaseProperties {
  description: string;
  itemImage: ItemImage;
}

export interface ItemSummary extends ItemBaseProperties {
  itemImages: [ItemImage];
}

export interface Item extends ItemBaseProperties {
  description: string;
  timeLeft: string;
  itemImages: [ItemImage];
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
    this.apiService.getListOfNewestItems().subscribe((page: Page<ItemSummary>): void => {
      this.items$.next(page.content);
    });
  }

  public initItemsLastChance(): void {
    this.apiService.getListOfLastChanceItems().subscribe((page: Page<ItemSummary>): void => {
      this.items$.next(page.content);
    });
  }

  public getItems(): BehaviorSubject<ItemSummary[] | undefined> {
    return this.items$;
  }

  public initItem(id: number): Subscription {
    return this.apiService.getItem(id).subscribe((value: Item): void => {
      this.item$.next(value);
    });
  }

  public getItem(): BehaviorSubject<Item | undefined> {
    return this.item$;
  }
}
