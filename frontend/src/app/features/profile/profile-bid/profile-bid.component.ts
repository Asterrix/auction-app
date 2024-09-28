import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {TableEmptyComponent} from "../components/table-empty/table-empty.component";
import {TableComponent} from "../components/table/table.component";

@Component({
  selector: "profile-bid",
  standalone: true,
  imports: [CommonModule, TableComponent, TableEmptyComponent],
  templateUrl: "./profile-bid.component.html"
})
export class ProfileBidComponent {

}
