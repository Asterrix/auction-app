import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {NavigationTrailComponent} from "../../../shared/components/navigation-trail/navigation-trail.component";
import {ContentCardComponent} from "../components/content-card/content-card.component";

@Component({
  selector: "home-privacy-policy",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent, ContentCardComponent],
  templateUrl: "privacy-policy-page.component.html",
  styleUrls: ["./privacy-policy-page.component.scss"]
})
export class PrivacyPolicyPage {

}
