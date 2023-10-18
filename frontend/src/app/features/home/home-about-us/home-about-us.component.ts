import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavigationTrailComponent} from "../../../shared/components/navigation-trail/navigation-trail.component";

@Component({
  selector: "app-home-about-us",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent],
  templateUrl: "home-about-us.component.html",
  styleUrls: ["./home-about-us.component.scss"]
})
export class HomeAboutUsComponent {

}
