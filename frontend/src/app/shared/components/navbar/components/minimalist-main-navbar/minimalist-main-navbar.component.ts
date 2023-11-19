import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {AnchorImageComponent} from "../../../anchor-image/anchor-image.component";

@Component({
  selector: "navbar-main-minimal",
  standalone: true,
  imports: [CommonModule, AnchorImageComponent],
  templateUrl: "./minimalist-main-navbar.component.html",
  styleUrls: ["./minimalist-main-navbar.component.scss"]
})
export class MinimalistMainNavbarComponent {

}
