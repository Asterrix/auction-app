import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {AnchorImageComponent} from "../anchor-image/anchor-image.component";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, AnchorImageComponent, RouterLink],
  templateUrl: "footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {

}
