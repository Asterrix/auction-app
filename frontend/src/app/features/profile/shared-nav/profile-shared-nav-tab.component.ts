import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {TabComponent} from "../components/tab/tab.component";

@Component({
  selector: "profile-shared-nav-tab",
  standalone: true,
  imports: [CommonModule, TabComponent],
  templateUrl: "./profile-shared-nav-tab.component.html",
  styleUrls: ["./profile-shared-nav-tab.component.scss"]
})
export class ProfileSharedNavTabComponent {

}
