import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  private loading = new BehaviorSubject<boolean>(true);
  loading$ = this.loading.asObservable();

  showLoader() {
    this.loading.next(true);
  }

  hideLoader() {
    this.loading.next(false);
  }
}
