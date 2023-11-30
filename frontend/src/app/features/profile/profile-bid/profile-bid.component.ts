import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {TabComponent} from "../components/tab/tab.component";
import {TableDataRow} from "../components/table-data-row/table-data-row.component";
import {TableEmptyComponent} from "../components/table-empty/table-empty.component";
import {TableComponent} from "../components/table/table.component";
import {ProfileSharedNavTabComponent} from "../shared-nav/profile-shared-nav-tab.component";

@Component({
  selector: "profile-bid",
  standalone: true,
  imports: [CommonModule, TableComponent, TableEmptyComponent, TableDataRow, RouterLink, TabComponent, ProfileSharedNavTabComponent],
  templateUrl: "./profile-bid.component.html"
})
export class ProfileBidComponent {

}
