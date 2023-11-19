import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {MainNavbarService} from "../../shared/components/navbar/components/main-navbar/services/main-navbar.service";
import {LoginFormComponent} from "./components/login-form/login-form.component";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPage implements OnInit, OnDestroy {
  constructor(private navbarService: MainNavbarService) {

  }

  ngOnInit(): void {
    this.navbarService.displayMinimalNavbar(true);
  }

  ngOnDestroy(): void {
    this.navbarService.displayMinimalNavbar(false);
  }
}