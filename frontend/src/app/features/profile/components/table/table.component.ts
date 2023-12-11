import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";

export enum TableSection {
  Seller,
  Bids
}

@Component({
  selector: "profile-table",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent {
  @Input({required: true}) tableSection!: TableSection;
  protected readonly TableSection = TableSection;
}
