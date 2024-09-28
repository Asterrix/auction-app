import {computed, inject, Injectable, signal} from "@angular/core";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {FeaturedItem, ItemAggregate} from "../api/item/item.interface";
import {NewApiService} from "../api/new-api.service";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  private featuredItem$ = new BehaviorSubject<FeaturedItem | undefined>(undefined);
  private itemSignal = signal<ItemAggregate | undefined>(undefined);
  item = computed(this.itemSignal);
  private apiService = inject(NewApiService);

  initFeaturedItem(): void {
    this.apiService.itemApi.getFeaturedItem().subscribe((item: FeaturedItem): void => {
      this.featuredItem$.next(item);
    });
  }

  getFeaturedItem(): Observable<FeaturedItem | undefined> {
    return this.featuredItem$.asObservable();
  }

  initItem(itemId: number): void {
    this.itemSignal.set(undefined);

    this.apiService.itemApi.getItemById(itemId).pipe(
      catchError((error: any) => {
        throw error;
      }))
      .subscribe((item): void => this.itemSignal.set(item));
  }
}
