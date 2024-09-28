import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {Page} from "../models/interfaces/page";
import {IPagination} from "../models/pagination";
import {Api} from "./api.service";
import ItemParams = Api.ItemApi.GetMethods.ItemParams;
import FeaturedItem = Api.ItemApi.Interfaces.FeaturedItem;
import Item = Api.ItemApi.Interfaces.Item;
import ItemSummary = Api.ItemApi.Interfaces.ItemSummary;

@Injectable({
  providedIn: "root"
})
export class ItemService {
  private featuredItem$ = new BehaviorSubject<FeaturedItem | undefined>(undefined);
  private item$ = new BehaviorSubject<Item | undefined>(undefined);
  private items$ = new BehaviorSubject<Page<ItemSummary> | undefined>(undefined);

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
    this.apiService.getListOfNewestArrivals().pipe(catchError((error: any) => {
      console.error(error);
      throw error;
    })).subscribe((items): void => this.items$.next(items));
  }

  initItemsLastChance(): void {
    this.apiService.getListOfLastChanceItems().pipe(catchError((error: any) => {
      console.error(error);
      throw error;
    })).subscribe((items): void => this.items$.next(items));
  }

  getItems(): Observable<Page<ItemSummary> | undefined> {
    return this.items$.asObservable();
  }

  initItem(itemId: number): void {
    this.apiService.getItemById(itemId).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      })).subscribe((item): void => this.item$.next(item));
  }

  getItem(): Observable<Item | undefined> {
    return this.item$.asObservable();
  }

  initItems(filter: Partial<ItemParams>, pagination: Required<IPagination>): void {
    this.apiService.getListOfAllItems(filter, pagination).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      })).subscribe((page): void => this.items$.next(page));
  }

  loadMoreData(filter: Partial<ItemParams>, pagination: Required<IPagination>): void {
    this.apiService.getListOfAllItems(filter, pagination).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      }))
      .subscribe((page): void => this.addNewDataToExistingState(page));
  }

  private addNewDataToExistingState(page: Page<ItemSummary>): void {
    if (this.items$.value) {
      const updatedContent: Array<ItemSummary> = this.items$.value?.content.concat(page.content);
      this.items$.next({...this.items$.value, content: updatedContent, last: page.last});
    }
  }
}
