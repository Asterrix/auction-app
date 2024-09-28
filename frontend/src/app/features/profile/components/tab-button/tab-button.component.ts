import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, Input} from "@angular/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ProfileRouteEndpoint, ProfileRouteTitle} from "../../profile-routes";

@Component({
  selector: "profile-tab-button",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: "./tab-button.component.html",
  styleUrls: ["./tab-button.component.scss"]
})
export class TabButtonComponent {
  @Input({required: true}) path!: ProfileRouteEndpoint;
  @Input({required: true}) iconSrc!: string;
  @Input({required: true}) iconWidth!: number;
  @Input({required: true}) iconHeight!: number;
  protected readonly ProfileRouteTitle = ProfileRouteTitle;
}
