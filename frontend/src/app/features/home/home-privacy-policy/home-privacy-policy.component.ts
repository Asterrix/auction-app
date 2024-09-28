import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavigationTrailComponent} from "../../../shared/components/navigation-trail/navigation-trail.component";
import {ContentCardComponent} from "../components/content-card/content-card.component";

@Component({
  selector: "app-home-privacy-policy",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent, ContentCardComponent],
  templateUrl: "home-privacy-policy.component.html",
  styleUrls: ["./home-privacy-policy.component.scss"]
})
export class HomePrivacyPolicyComponent {

}
