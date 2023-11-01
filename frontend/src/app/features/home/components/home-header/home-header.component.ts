import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {HighlightComponent} from "./components/highlight/highlight.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";

@Component({
  selector: "home-header",
  standalone: true,
  imports: [CommonModule, SidebarComponent, HighlightComponent],
  templateUrl: "./home-header.component.html",
  styleUrls: ["./home-header.component.scss"]
})
export class HomeHeaderComponent {

}
