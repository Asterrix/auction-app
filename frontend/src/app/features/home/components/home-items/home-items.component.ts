import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {ItemCardComponent} from "../../../../shared/components/item-card/item-card.component";
import {Page} from "../../../../shared/models/interfaces/page";
import {Api} from "../../../../shared/services/api.service";
import {ItemService} from "../../../../shared/services/item.service";
import {Section, SectionQueryParam, SectionTabComponent} from "./components/section-tab/section-tab.component";
import ItemSummary = Api.ItemApi.Interfaces.ItemSummary;

@Component({
  selector: "home-items",
  standalone: true,
  imports: [CommonModule, SectionTabComponent, ItemCardComponent],
  templateUrl: "./home-items.component.html",
  styleUrls: ["./home-items.component.scss"]
})
export class HomeItemsComponent implements OnInit, OnDestroy {
  items$: Observable<Page<ItemSummary> | undefined> | undefined;
  private sectionParamSub: Subscription | undefined;
  private sectionParam: Section = Section.Default;

  constructor(private itemService: ItemService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.clearQueryParameters();
    this.initialiseQueryParamSubscription();
  }

  ngOnDestroy(): void {
    if (this.sectionParamSub) {
      this.sectionParamSub.unsubscribe();
    }
  }

  navigateToItem(itemId: number): void {
    this.router.navigate(["/shop/item", itemId]).then(null);
  }

  private clearQueryParameters(): void {
    this.router.navigate([], {
      queryParams: {
        itemName: null
      }, queryParamsHandling: "merge"
    }).then(null);
  }

  private initialiseQueryParamSubscription(): void {
    this.sectionParamSub = this.activatedRoute.queryParams.subscribe((params: Params) => {
      // Quickfix
      if (params["itemName"]) {
        return;
      }

      this.sectionParam = params[SectionQueryParam.Section] ?? Section.Default;

      this.determineActiveSection();
      this.fetchItems();
    });
  }

  private fetchItems(): void {
    this.items$ = this.itemService.getItems();
  }

  private determineActiveSection(): void {
    if (this.sectionParam === Section.LastChance) {
      this.itemService.initItemsLastChance();
    } else {
      this.itemService.initItemsNewestArrivals();
    }
  }
}
