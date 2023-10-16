import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AnchorImageComponent} from "../../../anchor-image/anchor-image.component";

@Component({
  selector: "app-top-bar",
  standalone: true,
  imports: [CommonModule, AnchorImageComponent],
  templateUrl: "top-bar.component.html",
  styleUrls: ["./top-bar.component.scss"]
})
export class TopBarComponent {
}
