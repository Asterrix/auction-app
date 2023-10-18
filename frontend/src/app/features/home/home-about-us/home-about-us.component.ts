import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BreadCrumbComponent} from "../../../shared/components/breadcrumb/bread-crumb.component";

@Component({
  selector: "app-home-about-us",
  standalone: true,
  imports: [CommonModule, BreadCrumbComponent],
  templateUrl: "home-about-us.component.html",
  styleUrls: ["./home-about-us.component.scss"]
})
export class HomeAboutUsComponent {

}
