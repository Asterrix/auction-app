import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Page} from "../../shared/models/interfaces/page";
import {Api} from "../../shared/services/api.service";
import {CategoryService} from "../../shared/services/category.service";
import {ItemService} from "../../shared/services/item.service";
import {HomeHeaderComponent} from "./components/home-header/home-header.component";
import {
  Section,
  SectionQueryParam,
  SectionTabService
} from "./components/home-items/components/section-tab/section-tab.service";
import {HomeItemsComponent} from "./components/home-items/home-items.component";
import Category = Api.CategoryApi.Category;
import FeaturedItem = Api.ItemApi.Interfaces.FeaturedItem;
import ItemSummary = Api.ItemApi.Interfaces.ItemSummary;


@Component({
  selector: "home",
  standalone: true,
  imports: [CommonModule, HomeHeaderComponent, HomeItemsComponent],
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePage implements OnInit, OnDestroy {
  categories$: Observable<Array<Category> | undefined> | undefined;
  featuredItem$: Observable<FeaturedItem | undefined> | undefined;
  items$: Observable<Page<ItemSummary> | undefined> | undefined;

  private queryParamSub: Subscription | undefined;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private itemService: ItemService,
              private categoryService: CategoryService,
              private sectionTabService: SectionTabService) {
  }

  ngOnInit(): void {
    this.clearItemQueryParam();
    this.fetchFeaturedItem();
    this.fetchCategories();
    this.subscribeToQueryParamChanges();
  }

  ngOnDestroy(): void {
    this.queryParamSub?.unsubscribe();
  }

  private fetchCategories(): void {
    this.categoryService.initCategories();
    this.categories$ = this.categoryService.getAllCategories();
  }

  private fetchFeaturedItem(): void {
    this.itemService.initFeaturedItem();
    this.featuredItem$ = this.itemService.getFeaturedItem();
  }

  private clearItemQueryParam(): void {
    this.router.navigate([], {queryParams: {itemName: null}, queryParamsHandling: "merge"}).then(null);
  }

  private subscribeToQueryParamChanges(): void {
    this.queryParamSub = this.activatedRoute.queryParams.subscribe((params: Params): void => {

      // Quickfix
      if (this.ignoreItemName(params)) {
        return;
      }

      const section: string = params[SectionQueryParam.Section];

      this.sectionTabService.handleSectionChange(section, params);
      this.fetchSectionItems();
      this.fetchItems();
    });
  }

  private fetchSectionItems(): void {
    this.sectionTabService.getActiveSectionValue() === Section.LastChance ? this.initLastChance() : this.initNewestArrivals();
  }

  private initNewestArrivals(): void {
    this.itemService.initItemsNewestArrivals();
  }

  private initLastChance(): void {
    this.itemService.initItemsLastChance();
  }

  private fetchItems(): void {
    this.items$ = this.itemService.getItems();
  };

  private ignoreItemName(params: Params): boolean {
    return !!params["itemName"];
  }
}
