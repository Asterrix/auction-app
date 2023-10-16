import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ContentCardComponent} from "./components/content-card/content-card.component";
import {BreadCrumbComponent} from "../../../shared/components/breadcrumb/bread-crumb.component";

@Component({
  selector: "app-home-terms-conditions",
  standalone: true,
  imports: [CommonModule, ContentCardComponent, BreadCrumbComponent],
  templateUrl: "home-terms-conditions.component.html",
  styleUrls: ["./home-terms-conditions.component.scss"]
})
export class HomeTermsConditionsComponent {

}
