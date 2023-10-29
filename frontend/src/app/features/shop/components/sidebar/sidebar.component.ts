import {animate, AnimationTriggerMetadata, style, transition, trigger} from "@angular/animations";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Params, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Constant} from "../../../../shared/models/enums/constant";
import {Api} from "../../../../shared/services/api.service";
import {CategoryService} from "../../../../shared/services/category.service";
import {ShopPageParameter} from "../../shop-routes";
import Category = Api.CategoryApi.Category;

const accordionAnimation: AnimationTriggerMetadata = trigger("expandCollapse", [
  transition(":enter", [
    style({
      height: "0"
    }),
    animate("300ms ease-in", style({height: "*"}))
  ]),
  transition(":leave", [
    style({
      height: "*"
    }),
    animate("300ms ease-in", style({height: "0"}))
  ])
]);

@Component({
  selector: "shop-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage, FormsModule],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  animations: [accordionAnimation]
})
export class SidebarComponent implements OnInit, OnDestroy {
  categories$: Observable<Array<Category> | undefined> | undefined;
  accordionState: Record<number, boolean> = {};
  activeCategory: string = Constant.EmptyValue;
  activeSubcategory: string = Constant.EmptyValue;
  private categoriesSet: Set<string> = new Set<string>();
  private subscription: Record<string, Subscription> = {};

  constructor(private categoryService: CategoryService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.categoryService.initCategories();
    this.categories$ = this.categoryService.getAllCategories();

    this.subscribeToCategories();
    this.subscribeToQueryParamChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  toggleSection(index: number): void {
    this.accordionState[index] = !this.accordionState[index];
  }

  collapseAccordion(): void {
    this.accordionState = {};
  }

  private subscribeToCategories(): void {
    if (this.categories$) {
      this.subscription["category"] = this.categories$.subscribe(value => {
        this.mapCategoriesToSet(value);
      });
    }
  }

  private mapCategoriesToSet(value: Category[] | undefined) {
    value?.map(category => {
      this.categoriesSet.add(category.name.toLowerCase());
    });
  }

  private subscribeToQueryParamChanges(): void {
    this.subscription["queryParam"] = this.activatedRoute.queryParams.subscribe((params: Params): void => {
      const paramCategory: string = params[ShopPageParameter.Parameter.Category];
      const paramSubcategory: string = params[ShopPageParameter.Parameter.Subcategory];
      this.handleCategoryChange(paramCategory);
      this.handleSubcategoryChange(paramSubcategory);
    });
  }

  private unsubscribe(): void {
    for (const key in this.subscription) {
      if (this.subscription[key]) {
        this.subscription[key].unsubscribe();
      }
    }
  }

  private handleCategoryChange(paramCategory: string): void {
    if(this.activeCategory === paramCategory.toLowerCase()) return;

    if (this.categoryExists(paramCategory)) {
      this.activeCategory = paramCategory.toLowerCase();
    } else {
      this.redirectToDefaultCategory();
    }
  }

  private handleSubcategoryChange(paramCategory: string): void {
    this.activeSubcategory = paramCategory ?? Constant.EmptyValue;
  }

  private redirectToDefaultCategory(): void {
    this.router.navigate([], {
      queryParams: {
        category: null
      },
      relativeTo: this.activatedRoute
    }).then(null);
  }

  private categoryExists(section: string): boolean {
    return this.categoriesSet.has(section);
  }
}
