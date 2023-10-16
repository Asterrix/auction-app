import {Component} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: "app-main-navbar",
  standalone: true,
  imports: [CommonModule, SearchBarComponent, NgOptimizedImage, RouterLink],
  templateUrl: "main-navbar.component.html",
  styleUrls: ["./main-navbar.component.scss"]
})
export class MainNavbarComponent {

}
