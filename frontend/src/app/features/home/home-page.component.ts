import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {HomeHeaderComponent} from "./components/home-header/home-header.component";
import {HomeItemsComponent} from "./components/home-items/home-items.component";

@Component({
  selector: "home",
  standalone: true,
  imports: [CommonModule, HomeHeaderComponent, HomeItemsComponent],
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePage {
}
