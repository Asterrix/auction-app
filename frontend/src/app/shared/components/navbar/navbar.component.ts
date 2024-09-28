import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {NavigationTrailComponent} from "../navigation-trail/navigation-trail.component";
import {MainNavbarComponent} from "./components/main-navbar/main-navbar.component";
import {TopBarComponent} from "./components/top-bar/top-bar.component";

@Component({
    selector: "app-navbar",
    standalone: true,
    imports: [CommonModule, TopBarComponent, MainNavbarComponent, NavigationTrailComponent],
    templateUrl: "navbar.component.html",
    styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
}
