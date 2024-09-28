import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

class Loader {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoader(): void {
    this.loadingSubject.next(true);
  };
}

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  private loaders: Record<string, Loader> = {};

  getLoader(key: string): Loader {
    if (!this.loaders[key]) {
      this.loaders[key] = new Loader();
    }
    return this.loaders[key];
  }

  removeLoader(key: string): void {
    if (this.loaders[key]) {
      delete this.loaders[key];
    }
  }
}
