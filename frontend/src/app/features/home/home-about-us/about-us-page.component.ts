import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {NavigationTrailComponent} from "../../../shared/components/navigation-trail/navigation-trail.component";
import {ContentCardComponent} from "../components/content-card/content-card.component";

@Component({
  selector: "home-about-us",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent, ContentCardComponent],
  templateUrl: "about-us-page.component.html",
  styleUrls: ["./about-us-page.component.scss"]
})
export class AboutUsPage {

}
