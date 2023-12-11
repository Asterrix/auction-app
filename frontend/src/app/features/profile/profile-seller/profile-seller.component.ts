import {CommonModule} from "@angular/common";
import {Component, inject, OnDestroy, OnInit, signal} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ActivatedRoute, Params, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {filter, Subscription} from "rxjs";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {Api} from "../../../shared/services/api.service";
import {UserItemsService} from "../../../shared/services/user/user-items.service";
import {TabComponent} from "../components/tab/tab.component";
import {TableDataRow} from "../components/table-data-row/table-data-row.component";
import {TableEmptyComponent} from "../components/table-empty/table-empty.component";
import {TableComponent, TableSection} from "../components/table/table.component";
import {ProfileRouteEndpoint} from "../profile-routes";
import {ProfileSharedNavTabComponent} from "../shared-nav/profile-shared-nav-tab.component";
import UserItem = Api.UserApi.UserItem;

enum Section {
  Active = "active",
  Sold = "sold"
}

const sectionName: Record<Section, string> = {
  [Section.Active]: "Active",
  [Section.Sold]: "Sold",
};

@Component({
  selector: "app-profile-seller",
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    TableEmptyComponent,
    RouterLink,
    RouterLinkActive,
    TableDataRow,
    TabComponent,
    ProfileSharedNavTabComponent,
    LoaderComponent
  ],
  templateUrl: "./profile-seller.component.html",
  styleUrls: ["./profile-seller.component.scss"]
})
export class ProfileSellerComponent implements OnInit, OnDestroy {
  protected activeSection = Section.Active;
  protected sectionSet: Set<Section> = new Set<Section>(
    [
      Section.Active,
      Section.Sold
    ]);
  protected readonly TabSectionName = sectionName;
  protected readonly TabSection = Section;
  protected readonly ProfileRouteEndpoint = ProfileRouteEndpoint;
  protected userItemsService: UserItemsService = inject(UserItemsService);
  protected readonly TableSection = TableSection;
  protected activeItems = signal<UserItem[]>([]);
  private querySub: Subscription | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.userItemsService
      .fetchUserItems()
      .pipe(takeUntilDestroyed())
      .subscribe((userItems: UserItem[]) => {
        this.activeItems.set(userItems);
      });
  }

  ngOnInit(): void {
    const queryParam: string = "section";

    this.querySub = this.activatedRoute.queryParams.pipe(
      filter((params: Params) => {
        const section = params[queryParam];

        if (this.sectionSet.has(section)) {
          this.activeSection = section;
          return true;
        }

        this.clearQueryParams();
        return false;
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.querySub?.unsubscribe();
  }

  private clearQueryParams(): void {
    this.router.navigate([ProfileRouteEndpoint.MyAccount]).then(null);
  }
}
