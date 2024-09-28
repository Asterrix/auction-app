import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {TableDataRow} from "../components/table-data-row/table-data-row.component";
import {TableEmptyComponent} from "../components/table-empty/table-empty.component";
import {TableComponent} from "../components/table/table.component";

@Component({
  selector: "profile-bid",
  standalone: true,
  imports: [CommonModule, TableComponent, TableEmptyComponent, TableDataRow, RouterLink],
  templateUrl: "./profile-bid.component.html"
})
export class ProfileBidComponent {

}
