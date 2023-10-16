import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TopBarComponent} from "./components/top-bar/top-bar.component";
import {MainNavbarComponent} from "./components/main-navbar/main-navbar.component";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, TopBarComponent, MainNavbarComponent],
  templateUrl: "navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {

}
