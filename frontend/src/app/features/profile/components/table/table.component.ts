import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: "profile-table",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent {

}
