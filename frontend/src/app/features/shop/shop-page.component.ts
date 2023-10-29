import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {ContentSectionComponent} from "./components/content-section/content-section.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";

@Component({
  selector: "app-shop",
  standalone: true,
  imports: [CommonModule, SidebarComponent, ContentSectionComponent],
  templateUrl: "./shop-page.component.html",
  styleUrls: ["./shop-page.component.scss"]
})
export class ShopPage {

}
