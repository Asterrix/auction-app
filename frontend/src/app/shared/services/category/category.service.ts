import {computed, inject, Injectable, signal} from "@angular/core";
import {firstValueFrom, Observable, take} from "rxjs";
import {Category} from "../api/category/category.type";
import {NewApiService} from "../api/new-api.service";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private readonly apiService = inject(NewApiService);
  private categorySignal = signal<Category[]>([]);
  public readonly categories = computed(() => this.categorySignal());

  public initializeCategories = async (): Promise<void> => {
    const source: Observable<Category[]> = this.apiService.categoryApi.categories().pipe(take(1));
    const categories: Category[] = await firstValueFrom(source);
    this.categorySignal.set(categories);
  };
}
