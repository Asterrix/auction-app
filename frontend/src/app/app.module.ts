import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {TopBarComponent} from "./shared/components/navbar/components/top-bar/top-bar.component";
import {MainNavbarComponent} from "./shared/components/navbar/components/main-navbar/main-navbar.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TopBarComponent,
    MainNavbarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
