import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavigationTrailComponent} from "../../../shared/components/navigation-trail/navigation-trail.component";

@Component({
  selector: "app-home-privacy-policy",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent],
  templateUrl: "home-privacy-policy.component.html",
  styleUrls: ["./home-privacy-policy.component.scss"]
})
export class HomePrivacyPolicyComponent {

}
