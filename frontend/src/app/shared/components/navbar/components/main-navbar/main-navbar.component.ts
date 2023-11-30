import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component} from "@angular/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ProfileRouteEndpoint} from "../../../../../features/profile/profile-routes";
import {AuthenticationService} from "../../../../services/user/authentication.service";
import {AnchorImageComponent} from "../../../anchor-image/anchor-image.component";
import {SearchBarComponent} from "../search-bar/search-bar.component";

@Component({
  selector: "navbar-main",
  standalone: true,
  imports: [CommonModule, SearchBarComponent, NgOptimizedImage, RouterLink, AnchorImageComponent, RouterLinkActive],
  templateUrl: "main-navbar.component.html",
  styleUrls: ["./main-navbar.component.scss"]
})
export class MainNavbarComponent {
  protected readonly ProfileRouteEndpoint = ProfileRouteEndpoint;

  constructor(protected userService: AuthenticationService) {
  }
}
