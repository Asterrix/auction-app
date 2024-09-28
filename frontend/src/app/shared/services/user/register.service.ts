import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {catchError} from "rxjs";
import {Severity} from "../../models/errorModel";
import {Api} from "../api.service";
import {ErrorService} from "../error.service";
import Register = Api.UserApi.Register;

@Injectable({
  providedIn: "root"
})
export class RegisterService {
  constructor(private apiService: Api.Service, private router: Router, private errorService: ErrorService) {
  }

  registerUser(form: Required<Register>) {
    this.apiService.registerUser(form)
      .pipe(
        catchError((e) => {
          this.errorService.initialiseError(Severity.NORMAL, e.error.error.message);
          throw e;
        })
      )
      .subscribe(() => {
        this.navigateToLoginPage();
      });
  }

  private navigateToLoginPage(): void {
    this.router.navigate(["/login"]).then(null);
  }
}
