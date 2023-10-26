import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavigationTrailComponent} from "../../../shared/components/navigation-trail/navigation-trail.component";
import {ContentCardComponent} from "../components/content-card/content-card.component";

@Component({
  selector: "app-home-about-us",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent, ContentCardComponent],
  templateUrl: "home-about-us.component.html",
  styleUrls: ["./home-about-us.component.scss"]
})
export class HomeAboutUsComponent {

}
