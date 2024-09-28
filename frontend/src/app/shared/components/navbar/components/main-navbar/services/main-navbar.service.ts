import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MainNavbarService {
  private displayMinimalNavbarSubject = new BehaviorSubject<boolean>(false);

  getDisplayMinimalNavbar(): Observable<boolean> {
    return this.displayMinimalNavbarSubject.asObservable();
  }

  displayMinimalNavbar(value: boolean) {
    this.displayMinimalNavbarSubject.next(value);
  }
}
