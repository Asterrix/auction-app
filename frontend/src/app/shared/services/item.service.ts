import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {Page} from "../models/interfaces/page";
import {Api} from "./api.service";
import {LoaderService} from "./loader.service";
import Pagination = Api.Interfaces.Pagination;
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

  constructor(private apiService: Api.Service, private loader: LoaderService) {
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
    this.loader.showLoader();

    this.apiService.getListOfNewestArrivals().pipe(catchError((error: any) => {
      console.error(error);
      throw error;
    }))
      .subscribe((items): void => this.items$.next(items))
      .add(() => {
        this.loader.hideLoader();
      });
  }

  initItemsLastChance(): void {
    this.loader.showLoader();

    this.apiService.getListOfLastChanceItems().pipe(catchError((error: any) => {
      console.error(error);
      throw error;
    }))
      .subscribe((items): void => this.items$.next(items))
      .add(() => {
        this.loader.hideLoader();
      });
  }

  getItems(): Observable<Page<ItemSummary> | undefined> {
    return this.items$.asObservable();
  }

  initItem(itemId: number): void {
    this.loader.showLoader();

    return this.apiService.getItemById(itemId).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    )
      .subscribe((item): void => {
        this.item$.next(item);
      })
      .add(() => {
        this.loader.hideLoader();
      });
  }

  getItem(): Observable<Item | undefined> {
    return this.item$.asObservable();
  }

  initItems(filter: Partial<ItemParams>, pagination: Required<Pagination>): void {
    this.loader.showLoader();

    return this.apiService.getListOfAllItems(filter, pagination).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    )
      .subscribe((page): void => {
        this.items$.next(page);
      })
      .add(() => {
        this.loader.hideLoader();
      });
  }

  loadMoreData(filter: Partial<ItemParams>, pagination: Required<Pagination>): void {
    this.loader.showLoader();

    this.apiService.getListOfAllItems(filter, pagination).pipe(
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    )
      .subscribe((page): void => {
        this.addNewDataToExistingState(page);
      })
      .add(() => {
        this.loader.hideLoader();
      });
  }

  private addNewDataToExistingState(page: Page<ItemSummary>): void {
    if (this.items$.value) {
      const updatedContent: Array<ItemSummary> = this.items$.value?.content.concat(page.content);
      this.items$.next({...this.items$.value, content: updatedContent, last: page.last});
    }
  }
}
