import {Injectable, signal} from "@angular/core";

@Injectable({providedIn: "root"})
export class MainNavbarHandler {
  private displayMainNavbar = signal<boolean>(true);

  mainNavbar(): boolean {
    return this.displayMainNavbar();
  }

  showMainNavbar(): void {
    this.displayMainNavbar.set(true);
  }

  hideMainNavbar(): void {
    this.displayMainNavbar.set(false);
  }
}
