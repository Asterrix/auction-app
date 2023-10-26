import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AnchorImageComponent} from "../anchor-image/anchor-image.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, AnchorImageComponent, RouterLink],
  templateUrl: "footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {

}
