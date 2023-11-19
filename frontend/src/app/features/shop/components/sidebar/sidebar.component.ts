import {animate, AnimationTriggerMetadata, style, transition, trigger} from "@angular/animations";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Params, RouterLink, RouterLinkActive} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {CheckboxComponent, CheckboxShape} from "../../../../shared/components/checkboxes/checkbox/checkbox.component";
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
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage, FormsModule, CheckboxComponent],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  animations: [accordionAnimation]
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input({required: true}) categories$: Observable<Array<Category> | undefined> | undefined;
  accordionState: Record<number, boolean> = {};
  activeCategory: Observable<string> | undefined;
  activeSubcategory: Observable<string> | undefined;
  private querySub: Subscription | undefined;

  constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getActiveCategories();
    this.categoryService.subscribeToCategories();
    this.subscribeToQueryParamChanges();
  }

  ngOnDestroy(): void {
    this.querySub?.unsubscribe();
  }

  toggleAccordion(index: number): void {
    this.accordionState[index] = !this.accordionState[index];
  }

  collapseAccordion(): void {
    this.accordionState = {};
  }

  private subscribeToQueryParamChanges(): void {
    this.querySub = this.activatedRoute.queryParams.subscribe((params: Params): void => {
      const paramCategory: string = this.handleCategoryChange(params);

      if (!paramCategory) {
        this.resetActiveCategories();
      }

      this.handleSubcategoryChange(params, paramCategory);
    });
  }

  private resetActiveCategories(): void {
    this.categoryService.resetActiveCategories();
  }

  private getActiveCategories(): void {
    this.activeCategory = this.categoryService.getActiveCategory();
    this.activeSubcategory = this.categoryService.getActiveSubcategory();
  }

  private handleCategoryChange(params: Params): string {
    const paramCategory: string = params[ShopPageParameter.Parameter.Category];
    if (paramCategory) this.categoryService.handleCategoryChange(paramCategory, this.activatedRoute);
    return paramCategory;
  }

  private handleSubcategoryChange(params: Params, paramCategory: string): string {
    const paramSubcategory: string = params[ShopPageParameter.Parameter.Subcategory];
    if (paramCategory) this.categoryService.handleSubcategoryChange(paramSubcategory);
    return paramSubcategory;
  }

  protected readonly CheckboxShape = CheckboxShape;
}
