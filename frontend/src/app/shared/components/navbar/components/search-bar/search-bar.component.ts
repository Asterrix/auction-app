import {Component} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent {

}
