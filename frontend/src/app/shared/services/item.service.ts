import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Page} from "../models/interfaces/page";
import {Api} from "./api.service";
import FeaturedItem = Api.ItemApi.Interfaces.FeaturedItem;
import Item = Api.ItemApi.Interfaces.Item;
import ItemSummary = Api.ItemApi.Interfaces.ItemSummary;

@Injectable({
  providedIn: "root"
})
export class ItemService {
  featuredItem$: BehaviorSubject<FeaturedItem | undefined> = new BehaviorSubject<FeaturedItem | undefined>(undefined);
  item$: BehaviorSubject<Item | undefined> = new BehaviorSubject<Item | undefined>(undefined);
  items$: BehaviorSubject<Array<ItemSummary> | undefined> = new BehaviorSubject<Array<ItemSummary> | undefined>(undefined);

  constructor(private apiService: Api.Service) {
  }

  initFeaturedItem(): void {
    this.apiService.getFeaturedItem().subscribe((item: FeaturedItem): void => {
      this.featuredItem$.next(item);
    });
  }

  getFeaturedItem(): Observable<FeaturedItem | undefined> {
    return this.featuredItem$.asObservable();
  }

  initItemsNewestArrivals(): void {
    this.apiService.getListOfNewestArrivals().subscribe((page: Page<ItemSummary>): void => {
      this.items$.next(page.content);
    });
  }

  initItemsLastChance(): void {
    this.apiService.getListOfLastChanceItems().subscribe((page: Page<ItemSummary>): void => {
      this.items$.next(page.content);
    });
  }

  getItems(): Observable<Array<ItemSummary> | undefined> {
    return this.items$.asObservable();
  }

  initItem(itemId: number): Subscription {
    return this.apiService.getItemById(itemId).subscribe((item: Item): void => {
      this.item$.next(item);
    });
  }

  getItem(): Observable<Item | undefined> {
    return this.item$.asObservable();
  }
}
