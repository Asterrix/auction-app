import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ContentCardComponent} from "./components/content-card/content-card.component";
import {NavigationTrailComponent} from "../../../shared/components/navigation-trail/navigation-trail.component";

@Component({
  selector: "app-home-terms-conditions",
  standalone: true,
  imports: [CommonModule, ContentCardComponent, NavigationTrailComponent],
  templateUrl: "home-terms-conditions.component.html",
  styleUrls: ["./home-terms-conditions.component.scss"]
})
export class HomeTermsConditionsComponent {

}
