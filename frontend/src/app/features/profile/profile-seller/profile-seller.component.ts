import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router, RouterLink, RouterLinkActive, ɵEmptyOutletComponent} from "@angular/router";
import {filter, Subscription} from "rxjs";
import {TabComponent} from "../components/tab/tab.component";
import {TableDataRow} from "../components/table-data-row/table-data-row.component";
import {TableEmptyComponent} from "../components/table-empty/table-empty.component";
import {TableComponent} from "../components/table/table.component";
import {ProfileRouteEndpoint} from "../profile-routes";
import {ProfileSharedNavTabComponent} from "../shared-nav/profile-shared-nav-tab.component";

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
  imports: [CommonModule, TableComponent, TableEmptyComponent, RouterLink, RouterLinkActive, TableDataRow, TabComponent, ProfileSharedNavTabComponent, ɵEmptyOutletComponent],
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
  private querySub: Subscription | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
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
