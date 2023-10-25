import {Component} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NavigationTrailComponent} from "../../../shared/components/navigation-trail/navigation-trail.component";
import {ContentCardComponent} from "../components/content-card/content-card.component";
import {AboutUsImage} from "../../../../assets/asset";

@Component({
  selector: "app-home-about-us",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent, ContentCardComponent, NgOptimizedImage],
  templateUrl: "home-about-us.component.html",
  styleUrls: ["./home-about-us.component.scss"]
})
export class HomeAboutUsComponent {

  protected readonly AboutUsImage = AboutUsImage;
}
