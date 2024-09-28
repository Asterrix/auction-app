import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {FeaturedItem} from "../api/item/item.interface";
import {NewApiService} from "../api/new-api.service";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  private featuredItem$ = new BehaviorSubject<FeaturedItem | undefined>(undefined);
  private apiService = inject(NewApiService);

  initFeaturedItem(): void {
    this.apiService.itemApi.getFeaturedItem().subscribe((item: FeaturedItem): void => {
      this.featuredItem$.next(item);
    });
  }

  getFeaturedItem(): Observable<FeaturedItem | undefined> {
    return this.featuredItem$.asObservable();
  }
}
