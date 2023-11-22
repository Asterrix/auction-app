import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {catchError} from "rxjs";
import {Severity} from "../../models/errorModel";
import {AlertService} from "../alert.service";
import {Api} from "../api.service";
import {ErrorService} from "../error.service";
import RegisterRequest = Api.UserApi.RegisterRequest;

@Injectable({
  providedIn: "root"
})
export class RegisterService {
  constructor(private apiService: Api.Service,
              private router: Router,
              private errorService: ErrorService,
              private alertService: AlertService) {
  }

  registerUser(form: Required<RegisterRequest>) {
    this.apiService.registerUser(form)
      .pipe(
        catchError((e) => {
          this.errorService.initialiseError(Severity.NORMAL, e.error.error.message);
          throw e;
        })
      )
      .subscribe(() => {
        this.alertService.setAlert("Your account has been successfully registered. You can login now.");
        this.navigateToLoginPage();
      });
  }

  private navigateToLoginPage(): void {
    this.router.navigate(["/login"]).then(null);
  }
}
