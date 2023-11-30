import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {AuthenticationService} from "../../../../services/user/authentication.service";
import {LogoutService} from "../../../../services/user/logout.service";
import {AnchorImageComponent} from "../../../anchor-image/anchor-image.component";

@Component({
  selector: "app-top-bar",
  standalone: true,
  imports: [CommonModule, AnchorImageComponent, RouterLink],
  templateUrl: "top-bar.component.html",
  styleUrls: ["./top-bar.component.scss"]
})
export class TopBarComponent {
  constructor(protected userService: AuthenticationService, private logoutService: LogoutService) {
  }

  logoutUser(): void {
    this.logoutService.logoutUser();
  }
}
