import {Component} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {RouterLink} from "@angular/router";
import {AnchorImageComponent} from "../../../anchor-image/anchor-image.component";
import {Logo} from "../../../../../../assets/asset";

@Component({
  selector: "app-main-navbar",
  standalone: true,
  imports: [CommonModule, SearchBarComponent, NgOptimizedImage, RouterLink, AnchorImageComponent],
  templateUrl: "main-navbar.component.html",
  styleUrls: ["./main-navbar.component.scss"]
})
export class MainNavbarComponent {

  protected readonly Logo = Logo;
}
