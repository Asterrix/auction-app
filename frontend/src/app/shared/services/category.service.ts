import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Api} from "./api.service";
import Category = Api.CategoryApi.Category;

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private categories$ = new BehaviorSubject<Array<Category> | undefined>(undefined);

  constructor(private apiService: Api.Service) {
  }

  initCategories(): void {
    this.apiService.getAllCategories().subscribe((categories: Array<Category>): void => {
      this.categories$.next(categories);
    });
  }

  getAllCategories(): Observable<Array<Category> | undefined> {
    return this.categories$.asObservable();
  };
}
