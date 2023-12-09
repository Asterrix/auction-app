import {computed, Injectable, signal} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Constant} from "../models/enums/constant";
import {Api} from "./api.service";
import Category = Api.CategoryApi.Category;

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private activeCategory = new BehaviorSubject<string>(Constant.EmptyValue);
  private activeSubcategory = new BehaviorSubject<string>(Constant.EmptyValue);
  private categoriesSubject = new BehaviorSubject<Array<Category> | undefined>(undefined);
  private categoriesSet = new Set<string>();
  private subscription: Record<string, Subscription> = {};

  private categorySignal = signal<Category[]>([]);
  public categories = computed(() => this.categorySignal());


  constructor(private router: Router, private apiService: Api.Service) {
    this.apiService
      .getAllCategories()
      .pipe(takeUntilDestroyed())
      .subscribe((categories: Category[]): void => {
        this.categorySignal.set(categories);
      });
  }

  initCategories(): void {
    this.apiService.getAllCategories().subscribe((categories: Array<Category>): void => {
      this.categoriesSubject.next(categories);
    });
  }

  getActiveCategory(): Observable<string> {
    return this.activeCategory.asObservable();
  }

  getActiveSubcategory(): Observable<string> {
    return this.activeSubcategory.asObservable();
  }

  getAllCategories(): Observable<Array<Category> | undefined> {
    return this.categoriesSubject.asObservable();
  };

  handleCategoryChange(paramCategory: string, activatedRoute: ActivatedRoute): void {
    if (this.activeCategory.getValue() === paramCategory.toLowerCase()) return;

    this.categoryExists(paramCategory)
      ? this.activeCategory.next(paramCategory.toLowerCase())
      : this.redirectToDefaultCategory(activatedRoute);
  }

  handleSubcategoryChange(paramCategory: string): void {
    this.activeSubcategory.next(paramCategory ?? Constant.EmptyValue);
  }

  subscribeToCategories(): void {
    if (this.categoriesSubject) {
      this.subscription["category"] = this.categoriesSubject.subscribe(value => {
        this.mapCategoriesToSet(value);
      });
    }
  }

  resetActiveCategories(): void {
    this.activeCategory.next(Constant.EmptyValue);
    this.activeSubcategory.next(Constant.EmptyValue);
  }

  private mapCategoriesToSet(value: Category[] | undefined): void {
    value?.map(category => this.categoriesSet.add(category.name.toLowerCase()));
  }

  private categoryExists(section: string): boolean {
    return this.categoriesSet.has(section);
  }

  private redirectToDefaultCategory(activatedRoute: ActivatedRoute): void {
    this.router.navigate([], {queryParams: {category: null, subcategory: null}, relativeTo: activatedRoute}).then(null);
  }
}
