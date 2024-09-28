import {CommonModule} from "@angular/common";
import {Component, inject, OnDestroy, OnInit, signal} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, Subscription, take} from "rxjs";
import {Page} from "../../shared/models/interfaces/page";
import {PaginationService} from "../../shared/models/pagination.service";
import {Api} from "../../shared/services/api.service";
import {ItemOrderBy} from "../../shared/services/api/item/item.enum";
import {FeaturedItem, ItemSummary} from "../../shared/services/api/item/item.interface";
import {NewApiService} from "../../shared/services/api/new-api.service";
import {CategoryService} from "../../shared/services/category.service";
import {ItemService} from "../../shared/services/item/item.service";
import {SearchService} from "../../shared/services/search/search.service";
import {SearchSuggestionService} from "../../shared/services/suggestion/search-suggestion.service";
import {FeaturedComponent} from "./components/featured/featured.component";
import {HomeHeaderComponent} from "./components/home-header/home-header.component";
import {
  Section,
  SectionQueryParam,
  SectionTabService
} from "./components/home-items/components/section-tab/section-tab.service";
import {HomeItemsComponent} from "./components/home-items/home-items.component";
import Category = Api.CategoryApi.Category;


@Component({
  selector: "home",
  standalone: true,
  imports: [CommonModule, HomeHeaderComponent, HomeItemsComponent, FeaturedComponent],
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
  providers: [
    {
      provide: PaginationService,
      useFactory: (): PaginationService => new PaginationService({page: 0, size: 8})
    }
  ]
})
export class HomePage implements OnInit, OnDestroy {
  categories$: Observable<Array<Category> | undefined> | undefined;
  featuredItem$: Observable<FeaturedItem | undefined> | undefined;
  items$: Observable<Page<ItemSummary> | undefined> | undefined;
  protected featuredItems = signal<ItemSummary[]>([]);
  private paginationService = inject(PaginationService);
  protected pagination = this.paginationService.pagination;
  private queryParamSub: Subscription | undefined;
  private apiService = inject(NewApiService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);
  private sectionTabService = inject(SectionTabService);
  private itemService = inject(ItemService);
  private searchService = inject(SearchService);

  constructor(private readonly searchSuggestionsService: SearchSuggestionService) {
  }

  ngOnInit(): void {
    this.clearItemQueryParam();
    this.fetchFeaturedItem();
    this.fetchCategories();

    this.queryParamSub = this.activatedRoute.queryParams
      .subscribe((params: Params): void => {

        // Quickfix
        if (this.ignoreItemName(params)) {
          return;
        }

        const section: string = params[SectionQueryParam.Section];

        this.sectionTabService.handleSectionChange(section, params);
        this.fetchSectionItems();
      });


    this.searchSuggestionsService.suggestions(this.searchService.searchTerm())
      .pipe(take(1))
      .subscribe((items: ItemSummary[]): void => {
        this.featuredItems.set(items);
      });
  }

  ngOnDestroy(): void {
    this.queryParamSub?.unsubscribe();
  }

  private fetchCategories(): void {
    this.categoryService.initCategories();
    this.categories$ = this.categoryService.getAllCategories();
  }

  private fetchFeaturedItem(): void {
    this.featuredItem$ = this.itemService.getFeaturedItem();
  }

  private clearItemQueryParam(): void {
    this.router.navigate([], {queryParams: {itemName: null}, queryParamsHandling: "merge"}).then(null);
  }

  private fetchSectionItems(): void {
    this.sectionTabService.getActiveSectionValue() === Section.LastChance ? this.initLastChance() : this.initNewestArrivals();
  }

  private initNewestArrivals(): void {
    this.items$ = this.itemService.getItems({
      pageable: {
        page: this.pagination().page,
        size: this.pagination().size
      },
      orderBy: ItemOrderBy.Newest
    });
  }

  private initLastChance(): void {
    this.items$ = this.itemService.getItems({
      pageable: {
        page: this.pagination().page,
        size: this.pagination().size
      },
      orderBy: ItemOrderBy.TimeLeft
    });
  }

  private ignoreItemName(params: Params): boolean {
    return !!params["itemName"];
  }
}
