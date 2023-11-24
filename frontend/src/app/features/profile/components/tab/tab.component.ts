import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ProfileRouteEndpoint} from "../../profile-routes";
import {TabButtonComponent} from "../tab-button/tab-button.component";

@Component({
  selector: "profile-tab",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TabButtonComponent],
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.scss"]
})
export class TabComponent {
  protected readonly RouterLink = RouterLink;
  protected readonly ProfileRouteEndpoint = ProfileRouteEndpoint;
}
