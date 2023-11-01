import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {NavigationTrailComponent} from "../../../shared/components/navigation-trail/navigation-trail.component";
import {ContentCardComponent} from "../components/content-card/content-card.component";

@Component({
  selector: "home-terms-conditions",
  standalone: true,
  imports: [CommonModule, ContentCardComponent, NavigationTrailComponent],
  templateUrl: "terms-conditions-page.component.html",
  styleUrls: ["./terms-conditions-page.component.scss"]
})
export class TermsConditionsPage {

}
