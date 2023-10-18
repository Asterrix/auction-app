import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BreadCrumbComponent} from "../../../shared/components/breadcrumb/bread-crumb.component";

@Component({
  selector: "app-home-privacy-policy",
  standalone: true,
  imports: [CommonModule, BreadCrumbComponent],
  templateUrl: "home-privacy-policy.component.html",
  styleUrls: ["./home-privacy-policy.component.scss"]
})
export class HomePrivacyPolicyComponent {

}
