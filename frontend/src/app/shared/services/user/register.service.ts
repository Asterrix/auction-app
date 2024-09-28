import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {catchError} from "rxjs";
import {AlertService, AlertType} from "../alert.service";
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
          this.errorService.setError({message: e.error.error.message, type: AlertType.WarningLevelOne});
          throw e;
        })
      )
      .subscribe(() => {
        this.alertService.setAlert({
          message: "Your account has been successfully registered. You can login now.",
          type: AlertType.Info
        });
        this.navigateToLoginPage();
      });
  }

  private navigateToLoginPage(): void {
    this.router.navigate(["/login"]).then(null);
  }
}
