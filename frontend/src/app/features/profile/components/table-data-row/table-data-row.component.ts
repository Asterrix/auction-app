import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: "profile-table-data-row",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./table-data-row.component.html",
  styleUrls: ["./table-data-row.component.scss"]
})
export class TableDataRow {
  @Input({required: true})
  imagePath!: string;

  @Input({required: true})
  itemName!: string;

  @Input({required: true})
  timeLeft!: string;

  @Input({required: true})
  userPrice!: string;

  @Input({required: true})
  numberOfBids!: string;

  @Input({required: true})
  highestBid!: string;
}
