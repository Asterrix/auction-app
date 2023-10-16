import {Component} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {BreadCrumbService} from "./services/bread-crumb.service";

@Component({
  selector: "app-breadcrumb",
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './bread-crumb.component.html',
  styleUrls: ["./bread-crumb.component.scss"]
})
export class BreadCrumbComponent {
  constructor(protected breadCrumbService: BreadCrumbService) {
  }
}
