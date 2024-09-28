import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {MainNavbarService} from "../../shared/components/navbar/components/main-navbar/services/main-navbar.service";
import {ErrorModel} from "../../shared/models/errorModel";
import {ErrorService} from "../../shared/services/error.service";
import {RegisterFormComponent} from "./components/register-form/register-form.component";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, RegisterFormComponent],
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"]
})
export class RegisterPage implements OnInit, OnDestroy {
  error$: Observable<ErrorModel | null> | undefined;

  constructor(private navbarService: MainNavbarService, private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.error$ = this.errorService.getError();
    this.navbarService.displayMinimalNavbar(true);
  }

  onSubmit(): void {
  }

  ngOnDestroy(): void {
    this.errorService.clearErrorSubject();
    this.navbarService.displayMinimalNavbar(false);
  }
}
