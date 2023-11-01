import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Api} from "./api.service";
import Category = Api.CategoryApi.Category;

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private categories$: BehaviorSubject<Array<Category> | undefined> = new BehaviorSubject<Array<Category> | undefined>(undefined);

  constructor(private apiService: Api.Service) {
  }

  initCategories(): void {
    this.apiService.getAllCategories().subscribe((categories: Array<Category>): void => {
      this.categories$.next(categories);
    });
  }

  getAllCategories(): BehaviorSubject<Array<Category> | undefined> {
    return this.categories$;
  };
}
