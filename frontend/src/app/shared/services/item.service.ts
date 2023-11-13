import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {Page} from "../models/interfaces/page";
import {IPagination} from "../models/pagination";
import {Api} from "./api.service";
import {LoaderService} from "./loader.service";
import ItemParams = Api.ItemApi.GetMethods.ItemParams;
import FeaturedItem = Api.ItemApi.Interfaces.FeaturedItem;
import ItemAggregate = Api.ItemApi.Interfaces.ItemAggregate;
import ItemSummary = Api.ItemApi.Interfaces.ItemSummary;

@Injectable({
  providedIn: "root"
})
export class ItemService {
  private featuredItem$ = new BehaviorSubject<FeaturedItem | undefined>(undefined);
  private item$ = new BehaviorSubject<ItemAggregate | undefined>(undefined);
  private items$ = new BehaviorSubject<Page<ItemSummary> | undefined>(undefined);

  constructor(private apiService: Api.Service, private loader: LoaderService) {
  }

  initFeaturedItem(): void {
    this.apiService.getFeaturedItem().subscribe((item: FeaturedItem): void => {
      this.featuredItem$.next(item);
    });
  }

  getItemsCount(): number {
    return this.items$.getValue()?.totalElements ?? 0;
  }

  getFeaturedItem(): Observable<FeaturedItem | undefined> {
    return this.featuredItem$.asObservable();
  }

  initItemsNewestArrivals(pagination: IPagination): void {
    this.loader.getLoader("home-item").showLoader();

    this.apiService.getListOfNewestArrivals(pagination).pipe(catchError((error: any) => {
      console.error(error);
      throw error;
    })).subscribe((items): void => this.items$.next(items))
      .add(() => this.loader.removeLoader("home-item"));
  }

  initItemsLastChance(pagination: IPagination): void {
    this.loader.getLoader("home-item").showLoader();

    this.apiService.getListOfLastChanceItems(pagination).pipe(catchError((error: any) => {
      console.error(error);
      throw error;
    })).subscribe((items): void => this.items$.next(items))
      .add(() => this.loader.removeLoader("home-item"));
  }

  getItems(): Observable<Page<ItemSummary> | undefined> {
    return this.items$.asObservable();
  }

  initItem(itemId: number): void {
    this.loader.getLoader("item").showLoader();

    this.apiService.getItemById(itemId).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      })).subscribe((item): void => this.item$.next(item))
      .add(() => this.loader.removeLoader("item"));
  }

  getItem(): Observable<ItemAggregate | undefined> {
    return this.item$.asObservable();
  }

  initItems(filter: Partial<ItemParams>, pagination: Required<IPagination>): void {
    this.loader.getLoader("items").showLoader();

    this.apiService.getListOfAllItems(filter, pagination).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      })).subscribe((page): void => this.items$.next(page))
      .add(() => this.loader.removeLoader("items"));
  }

  loadMoreData(filter: Partial<ItemParams>, pagination: Required<IPagination>): void {
    this.loader.getLoader("load-more").showLoader();

    this.apiService.getListOfAllItems(filter, pagination).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      }))
      .subscribe((page): void => this.addNewDataToExistingState(page))
      .add(() => this.loader.removeLoader("load-more"));
  }

  private addNewDataToExistingState(page: Page<ItemSummary>): void {
    if (this.items$.value) {
      const updatedContent: Array<ItemSummary> = this.items$.value?.content.concat(page.content);
      this.items$.next({...this.items$.value, content: updatedContent, last: page.last});
    }
  }
}
